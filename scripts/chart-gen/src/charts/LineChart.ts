import { metricValueAverage } from "../data/BenchmarkAggregates"
import { BenchmarkTickResult, MetricValue, transformResultToMetricValues } from "../data/BenchmarkTickResult"
import { AggregationStrategy } from "../data/AggregationStrategy"
import { MetricName } from "../data/Metric"
import { MetricEnum } from "../data/MetricEnum"
import { average, max, nanoToMicro, timeWeightedAverageByChunks } from "../utils"
import { colors } from "./constants"
import type { ChartConfiguration } from "chart.js";


const supportedMetrics: Partial<Record<MetricName, MetricEnum>> = Object.fromEntries(
    [
        MetricEnum.ENTITY_UPDATE,
        MetricEnum.CONTROL_BEHAVIOR_UPDATE,
        MetricEnum.TRANSPORT_LINES_UPDATE,
        MetricEnum.ELECTRIC_HEAT_FLUID_CIRCUIT_UPDATE,
        MetricEnum.SPACE_PLATFORMS,
        MetricEnum.TRAINS,
        // MetricEnum.CONSISTENCY_SCRAPER,
    ].map(it => [it.name, it])
)

const metricNameToColor: Partial<Record<MetricName | string, string>> = {
    [MetricEnum.ENTITY_UPDATE.name]: colors.blue,
    [MetricEnum.CONTROL_BEHAVIOR_UPDATE.name]: colors.reddish_purple,
    [MetricEnum.TRANSPORT_LINES_UPDATE.name]: colors.green,
    [MetricEnum.ELECTRIC_HEAT_FLUID_CIRCUIT_UPDATE.name]: colors.orange,
    [MetricEnum.SPACE_PLATFORMS.name]: colors.vermillion,
    [MetricEnum.TRAINS.name]: colors.yellow,
    ["other"]: colors.dark_grey,
}

const backgroundPlugin = {
    id: "customBackground",
    beforeDraw: (chart: any) => {
        const { ctx, width, height } = chart;
        ctx.save();
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    },
};

export interface LineChartOptions {
    maxTicks: number,
    maxUpdateValue: number,
    type: "bar" | "line",
    aggregationStrategy: AggregationStrategy,
    tickWindow?: number
}

const autoTickWindow = (maxTick: number): number => {

    // const maxTick = max(metricValues.map(it => it.tick))

    const second = 60;
    const minute = second * 60

    if (maxTick >= minute) {
        return second
    }

    if (maxTick >= 5 * minute) {
        return 15 * second
    }

    if (maxTick >= 10 * minute) {
        return 30 * second
    }

    return 0
}

export const createLineChartForMetrics = (result: BenchmarkTickResult, options: LineChartOptions): ChartConfiguration<"bar" | "line"> => {

    const datasets = []

    const resultMetricValues = transformResultToMetricValues(result, options.aggregationStrategy)

    const filteredMetricValueMap: Map<MetricName, MetricValue[]> = new Map();

    result.metrics.filter(it => supportedMetrics[it.name] !== undefined).forEach(metric => {
        const metricValues = resultMetricValues.get(metric.name)
            .filter(it => it.tick <= options.maxTicks)
        filteredMetricValueMap.set(metric.name, metricValues)
    })

    const tickWindow = options.tickWindow || autoTickWindow(options.maxTicks)

    if (tickWindow > 0) {
        filteredMetricValueMap.forEach((metricValues, metricName) => {
            const timeWeightedAverages: MetricValue[] = timeWeightedAverageByChunks(metricValues, tickWindow)
            filteredMetricValueMap.set(metricName, timeWeightedAverages)
        })
    }


    result.metrics.filter(it => supportedMetrics[it.name] !== undefined).forEach(metric => {

        const data = filteredMetricValueMap.get(metric.name).filter(it => it.tick <= options.maxTicks).map(it => ({ x: it.tick, y: nanoToMicro(it.value) }));
        // sort by tick ascending
        data.sort((a, b) => a.x - b.x);
        datasets.push({
            label: metric.name,
            data: data,
            backgroundColor: metricNameToColor[metric.name],
            borderColor: metricNameToColor[metric.name],
            fill: true,
            cubicInterpolationMode: "monotone",
        })
    })

    const wholeUpdateAverage = nanoToMicro(metricValueAverage(resultMetricValues.get(MetricEnum.WHOLE_UPDATE.name)))

    datasets.push({
        type: "line",
        label: "Whole Update Average",
        data: datasets[0].data.map(it => ({
            x: it.x,
            y: wholeUpdateAverage
        })),
        borderColor: colors.white,
        borderWidth: 4,
        borderDash: [6, 1]
    })

    const ticks = datasets[0].data.map(it => it.x)
    // sort by tick ascending
    ticks.sort((a, b) => a - b);

    return {
        type: options.type,
        data: {
            labels: ticks,
            datasets: datasets
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Tick'
                    },
                    ticks: {
                        color: 'white'
                    },
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Time [microseconds] (lower is better)'
                    },
                    ticks: {
                        color: 'white'
                    },
                    min: 0,
                    max: options.maxUpdateValue,
                    grid: {
                        color: colors.white
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: result.fileName + " Timeseries Metrics",
                    color: colors.white,
                },
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            },
            elements: {
                line: {
                    borderColor: colors.blue,
                    borderWidth: 2,
                    fill: false,
                },
                point: {
                    radius: 0 // Hide points
                }
            }
        },
        plugins: [backgroundPlugin],
    };
}   