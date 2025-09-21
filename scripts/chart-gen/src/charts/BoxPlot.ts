import { ChartConfiguration } from "chart.js";
import { BenchmarkTickResult } from "../data/BenchmarkTickResult";
import { colors } from "./constants";
import { MetricEnum } from "../data/MetricEnum";
import { average, max, median, min, nanoToMicro, standardDeviation } from "../utils";
import { AggregationStrategy } from "../data/AggregationStrategy";
import { IBaseStats, BoxPlotDataPoint } from "@sgratzl/chartjs-chart-boxplot";
import { BenchmarkAggregateRunResult } from "../data/BenchmarkAggregateResult";

// Plugin: black background
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

export const createBoxPlotChartConfiguration = (results: BenchmarkAggregateRunResult[], aggregationStrategy: AggregationStrategy = AggregationStrategy.AVERAGE): ChartConfiguration<"boxplot"> => {

    const dataSets: { fileName: string, stats: IBaseStats }[] = []

    results.forEach(result => {
        const fileName = result.fileName

        const valuesPerRun: number[][] = []

        const wholeUpdateRunAggregates = result.runs.get(MetricEnum.WHOLE_UPDATE.name)

        wholeUpdateRunAggregates.forEach(aggregate => {
            const run = aggregate.run
            if (!valuesPerRun[run]) {
                valuesPerRun[run] = []
            }

            valuesPerRun[run].push(nanoToMicro(aggregate.average))
        })

        const aggregatePerRun = valuesPerRun.map(values => {
            switch (aggregationStrategy) {
                case AggregationStrategy.AVERAGE:
                    return average(values)
                case AggregationStrategy.MINIMUM:
                    return min(values)
                case AggregationStrategy.MAXIMUM:
                    return max(values)
                case AggregationStrategy.MEDIAN:
                    return median(values)
                case AggregationStrategy.STANDARD_DEVIATION:
                    console.warn("you probably don't want to use standard deviation for this type of graph... :)")
                    return standardDeviation(values)
            }
        })

        aggregatePerRun.sort((a, b) => a - b)

        const medianValue = median(aggregatePerRun)
        const mid = Math.floor(aggregatePerRun.length / 2)

        const stats = {
            min: min(aggregatePerRun),
            q1: median(aggregatePerRun.slice(0, mid)),
            median: medianValue,
            q3: median(aggregatePerRun.slice(aggregatePerRun.length % 2 === 0 ? mid : mid + 1)),
            max: max(aggregatePerRun),
            mean: average(aggregatePerRun),
            items: aggregatePerRun,
            outliers: []
        }

        dataSets.push({
            fileName: fileName,
            stats: {
                min: min(aggregatePerRun),
                q1: median(aggregatePerRun.slice(0, mid)),
                median: medianValue,
                q3: median(aggregatePerRun.slice(aggregatePerRun.length % 2 === 0 ? mid : mid + 1)),
                max: max(aggregatePerRun),
                mean: average(aggregatePerRun),
                items: aggregatePerRun,
                outliers: []
            }
        })
    })

    let aggregationStrategyLabel = ""
    switch (aggregationStrategy) {
        case AggregationStrategy.AVERAGE:
            aggregationStrategyLabel = "Average"
            break;
        case AggregationStrategy.MINIMUM:
            aggregationStrategyLabel = "Minimum"
            break;
        case AggregationStrategy.MAXIMUM:
            aggregationStrategyLabel = "Maximum"
            break;
        case AggregationStrategy.MEDIAN:
            aggregationStrategyLabel = "Median"
            break;
        case AggregationStrategy.STANDARD_DEVIATION:
            aggregationStrategyLabel = "σ"
    }

    const axisLabel = `Whole Update Time [microseconds] (lower is better)`

    const title = `${aggregationStrategyLabel} Whole Update Time Distribution`

    dataSets.sort((a, b) => b.stats.mean - a.stats.mean)

    const minimum = min(dataSets.map(it => it.stats.min))
    const maximum = max(dataSets.map(it => it.stats.max))

    return {
        type: "boxplot",
        options: {
            backgroundColor: colors.black,
            plugins: {
                title: {
                    display: true,
                    text: title,
                    color: colors.white,
                    font: {
                        size: 18
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: { color: colors.white, maxRotation: 80, minRotation: 45 },
                    grid: {
                        color: colors.dark_grey
                    },
                },
                y: {
                    stacked: true,
                    ticks: { color: colors.white, },
                    title: {
                        display: true,
                        color: colors.white,
                        text: axisLabel,
                        font: {
                            size: 14
                        }
                    },
                    min: Math.floor(minimum * 0.9),
                    max: Math.floor(maximum * 1.1),
                    grid: {
                        color: colors.dark_grey,
                        tickBorderDash: [8, 4]
                    }
                },
            },
        },
        data: {
            labels: dataSets.map(it => it.fileName),
            datasets: [
                {
                    label: 'Dataset 1',
                    borderWidth: 1,
                    itemRadius: 2,
                    itemBackgroundColor: colors.white,
                    backgroundColor: colors.white,
                    borderColor: colors.sky_blue,
                    data: dataSets.map(it => it.stats)
                },
            ],
        },
        plugins: [backgroundPlugin]
    };
}