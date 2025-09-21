import { metricValueAverage } from "../data/BenchmarkAggregates"
import { BenchmarkTickResult, transformResultToMetricValues } from "../data/BenchmarkTickResult"
import { AggregationStrategy } from "../data/AggregationStrategy"
import { MetricName } from "../data/Metric"
import { MetricEnum } from "../data/MetricEnum"
import { MetricRegistryInstance } from "../data/MetricRegistry"
import { max, min, nanoToMicro, percentDecrease, percentDifference } from "../utils"
import { colors } from "./constants"
import type { ChartConfiguration } from "chart.js";
import { BenchmarkAggregateRunResult } from "../data/BenchmarkAggregateResult"

const supportedMetrics: Partial<Record<MetricName, MetricEnum>> = Object.fromEntries(
  [
    MetricEnum.ENTITY_UPDATE,
    MetricEnum.CONTROL_BEHAVIOR_UPDATE,
    MetricEnum.TRANSPORT_LINES_UPDATE,
    MetricEnum.ELECTRIC_HEAT_FLUID_CIRCUIT_UPDATE,
    MetricEnum.SPACE_PLATFORMS,
    MetricEnum.TRAINS,
    MetricEnum.OTHER
  ].map(it => [it.name, it])
)

const metricNameToPattern: Partial<Record<MetricName | string, string>> = {
  [MetricEnum.ENTITY_UPDATE.name]: colors.blue,
  [MetricEnum.CONTROL_BEHAVIOR_UPDATE.name]: colors.reddish_purple,
  [MetricEnum.TRANSPORT_LINES_UPDATE.name]: colors.green,
  [MetricEnum.ELECTRIC_HEAT_FLUID_CIRCUIT_UPDATE.name]: colors.orange,
  [MetricEnum.SPACE_PLATFORMS.name]: colors.vermillion,
  [MetricEnum.TRAINS.name]: colors.yellow,
  ["other"]: colors.dark_grey,
}

interface SummaryChartData {
  mapName: string;
  wholeUpdateAverage: number;
  metrics: Array<MetricEnum>;
  metricValues: { metricName: string; metricDescription: string; average: number, min?: number, max?: number }[];
}

const mapSummaryChartData = (result: BenchmarkAggregateRunResult, configuredMetrics: Partial<Record<MetricName, MetricEnum>>, aggregationStrategy: AggregationStrategy): SummaryChartData => {
  const fileName = result.fileName;
  const metrics = result.metrics;

  const wholeUpdateAgg = result.all.get(MetricEnum.WHOLE_UPDATE.name);
  if (!wholeUpdateAgg) {
    throw new Error(`No ${MetricEnum.WHOLE_UPDATE.name} metric values found in ${fileName}`);
  }
  const wholeUpdateAverage = nanoToMicro(wholeUpdateAgg.average);

  const otherMetricAverages = metrics
    .filter(it => it.name !== "wholeUpdate")
    .filter(it => configuredMetrics[it.name] != undefined)
    .map(metric => {
      return {
        metricName: metric.name,
        metricDescription: metric.description,
        average: nanoToMicro(result.all.get(metric.name).average),
        min: nanoToMicro(result.all.get(metric.name).minimum),
        max: nanoToMicro(result.all.get(metric.name).maximum)
      }
    })
    .sort((a, b) => b.average - a.average); // Descending order

  const sumOfParts = otherMetricAverages.reduce((sum, metricAverage) => sum + metricAverage.average, 0);
  const otherAvg = wholeUpdateAverage - sumOfParts;

  const metricValues = [
    ...otherMetricAverages,
    {
      metricName: MetricEnum.OTHER.name,
      metricDescription: MetricEnum.OTHER.description,
      average: otherAvg,
    },
    {
      metricName: MetricEnum.WHOLE_UPDATE.name,
      metricDescription: MetricEnum.WHOLE_UPDATE.description,
      average: wholeUpdateAverage,
      min: nanoToMicro(wholeUpdateAgg.minimum),
      max: nanoToMicro(wholeUpdateAgg.maximum)
    },
  ]

  return {
    mapName: result.fileName,
    metrics: metricValues.map(it => MetricRegistryInstance.getOrThrow(it.metricName)),
    metricValues: metricValues,
    wholeUpdateAverage,
  }
}

interface SummaryChartOptions {
  aggregationStrategy: AggregationStrategy;
  /**
   * metrics to plot
   */
  metrics?: MetricEnum[];
  includeTable?: boolean;
}

export const createSummaryChartConfiguration = (results: BenchmarkAggregateRunResult[], options: SummaryChartOptions): ChartConfiguration<"bar"> => {


  let configuredDisplayMetrics: Partial<Record<MetricName, MetricEnum>> = {}
  if (options.metrics) {
    options.metrics
      .filter(it => supportedMetrics[it.name] != undefined)
      .forEach(metric => configuredDisplayMetrics[metric.name] = metric)
  } else {
    configuredDisplayMetrics = { ...supportedMetrics }
  }

  const chartData = results.map(result => mapSummaryChartData(result, configuredDisplayMetrics, options.aggregationStrategy));
  // Sort data by "Whole Update" total time ascending
  chartData.sort((a, b) => a.wholeUpdateAverage - b.wholeUpdateAverage);

  const metrics = Array.from(new Set(chartData.flatMap(it => it.metrics.map(metric => metric.name)))).map(metricName => MetricRegistryInstance.getOrThrow(metricName))

  const datasets = metrics
    .filter(metric => metric.name != MetricEnum.WHOLE_UPDATE.name) // Exclude wholeUpdate from stacked bars
    .map(metric => {
      return {
        label: metric.description,
        data: chartData.map(data => data.metricValues.find(it => it.metricName === metric.name)?.average || 0),
        backgroundColor: metricNameToPattern[metric.name],
      }
    })

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

  // Plugin: white text table at bottom
  const tablePlugin = {
    id: "valueTable",
    afterDraw: (chart: any) => {
      const { ctx, chartArea: { left, right }, height } = chart;
      ctx.save();

      // Start table lower down so it never overlaps
      const tableTop = height - (metrics.length + 3) * 20;
      const rowHeight = 20;
      const colWidth = (right - left) / (chartData.length + 1);

      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = "white";

      // Header
      const header = [
        "Category",
        ...chartData.flatMap(it => it.mapName),
      ]

      header.forEach((category, i) => {
        ctx.fillText(category, left + colWidth * i + colWidth / 2, tableTop);
      })

      // Data rows
      ctx.font = "12px Arial";
      metrics.forEach((metric, rowIdx) => {
        const y = tableTop + (rowIdx + 1) * rowHeight;
        ctx.fillText(metric.description, left + colWidth / 2, y);
        chartData.forEach((res, colIdx) => {
          const metricValue = res.metricValues.find(it => it.metricName == metric.name)
          const average = Math.round(metricValue?.average ?? NaN)
          const text = `${average}`
          ctx.fillText(text, left + colWidth * (colIdx + 1) + colWidth / 2, y);
        });
      });



      let lastRowPos = tableTop + metrics.length * rowHeight
      lastRowPos = lastRowPos + rowHeight


      ctx.fillText("% Decrease from Previous", left + colWidth / 2, lastRowPos);

      let previousMapWholeUpdate = null

      chartData.forEach((data, colIdx) => {
        let currentMapWholeUpdate = data.metricValues.find(it => it.metricName == MetricEnum.WHOLE_UPDATE.name).average

        if (previousMapWholeUpdate) {
          const difference = Math.round(percentDecrease(previousMapWholeUpdate, currentMapWholeUpdate) * 100) / 100
          ctx.fillText(`${difference}%`, left + colWidth * (colIdx + 1) + colWidth / 2, lastRowPos);
        }
        previousMapWholeUpdate = currentMapWholeUpdate
      })

      lastRowPos = lastRowPos + rowHeight

      ctx.fillText("% Decrease from Best", left + colWidth / 2, lastRowPos);

      let worstWholeUpdate = chartData[0].wholeUpdateAverage

      chartData.forEach((data, colIdx) => {
        const currentMapWholeUpdate = data.wholeUpdateAverage

        const difference = Math.round(percentDecrease(worstWholeUpdate, currentMapWholeUpdate) * 100) / 100
        ctx.fillText(`${difference}%`, left + colWidth * (colIdx + 1) + colWidth / 2, lastRowPos);
      })




      ctx.restore();
    },
  };

  const padding = options.includeTable && { bottom: (metrics.length + 3) * 20 + 10 }

  datasets.sort((a, b) => {
    return Object.values(supportedMetrics).findIndex(it => it.description == a.label) - Object.values(supportedMetrics).findIndex(it => it.description == b.label)
  })

  let aggregationStrategyLabel = ""
  switch (options.aggregationStrategy) {
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
      aggregationStrategyLabel = "Standard Deviation"
  }

  const xAxisLabel = `Average Time using ${aggregationStrategyLabel.toLowerCase()} per tick [microseconds] (lower is better)`

  const title = `${aggregationStrategyLabel} Per Tick Metrics`



  const configuration: ChartConfiguration<"bar"> = {
    type: "bar",
    data: {
      labels: chartData.map((r) => r.mapName),
      datasets: datasets
    },
    options: {
      indexAxis: "y", // horizontal bars
      layout: {
        // autoPadding: true,
        padding: padding
      },
      plugins: {
        title: {
          display: true,
          text: title,
          color: colors.white,
          font: {
            size: 18
          },
        },
        legend: {
          labels: {
            color: colors.white,
            // order by supported metric order
            sort: (a, b) => {
              return Object.values(supportedMetrics).findIndex(it => it.description == a.text) - Object.values(supportedMetrics).findIndex(it => it.description == b.text)
            }
          },
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: { color: colors.white, },
          title: { display: true, text: xAxisLabel, color: "white" },
        },
        y: {
          stacked: true,
          ticks: { color: colors.white, },
          grid: {
                        color: colors.dark_grey
                    },
        },
      },
    },
    plugins: [backgroundPlugin, options.includeTable && tablePlugin],
  };

  return configuration;

}