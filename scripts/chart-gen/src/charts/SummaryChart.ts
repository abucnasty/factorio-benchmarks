import { metricValueAverage } from "../data/BenchmarkAggregates"
import { BenchmarkResult } from "../data/BenchmarkResult"
import { MetricName } from "../data/Metric"
import { MetricEnum } from "../data/MetricEnum"
import { max, min, nanoToMicro, percentDecrease, percentDifference } from "../utils"
import { colors } from "./constants"
import type { ChartConfiguration } from "chart.js";

const supportedMetrics: Partial<Record<MetricName, MetricEnum>> = Object.fromEntries(
  [
    MetricEnum.ENTITY_UPDATE,
    MetricEnum.CONTROL_BEHAVIOR_UPDATE,
    MetricEnum.TRANSPORT_LINES_UPDATE,
    MetricEnum.ELECTRIC_HEAT_FLUID_CIRCUIT_UPDATE,
    MetricEnum.SPACE_PLATFORMS,
  ].map(it => [it.name, it])
)

const metricNameToColor: Partial<Record<MetricName | string, string>> = {
  [MetricEnum.ENTITY_UPDATE.name]: colors.blue,
  [MetricEnum.CONTROL_BEHAVIOR_UPDATE.name]: colors.reddish_purple,
  [MetricEnum.TRANSPORT_LINES_UPDATE.name]: colors.green,
  [MetricEnum.ELECTRIC_HEAT_FLUID_CIRCUIT_UPDATE.name]: colors.orange,
  [MetricEnum.SPACE_PLATFORMS.name]: colors.vermillion,
  ["other"]: colors.dark_grey,
}

interface SummaryChartData {
  mapName: string;
  wholeUpdateAverage: number;
  metrics: Array<{ metricName: string; metricDescription: string }>;
  metricValues: { metricName: string; metricDescription: string; average: number, min?: number, max?: number }[];
}

const mapSummaryChartData = (result: BenchmarkResult): SummaryChartData => {
  const fileName = result.fileName;
  const metrics = result.metrics;

  const wholeUpdateVals = result.metricValues.get(MetricEnum.WHOLE_UPDATE.name);
  if (!wholeUpdateVals) {
    throw new Error(`No ${MetricEnum.WHOLE_UPDATE.name} metric values found in ${fileName}`);
  }
  const wholeUpdateAverage = nanoToMicro(metricValueAverage(wholeUpdateVals));

  const otherMetricAverages = metrics
    .filter(it => it.name !== "wholeUpdate")
    .filter(it => supportedMetrics[it.name] != undefined)
    .map(metric => {
      return {
        metricName: metric.name,
        metricDescription: metric.description,
        average: nanoToMicro(metricValueAverage(result.metricValues.get(metric.name))),
        min: nanoToMicro(min(result.metricValues.get(metric.name).map(it => it.value))),
        max: nanoToMicro(max(result.metricValues.get(metric.name).map(it => it.value)))
      }
    })
    .sort((a, b) => b.average - a.average); // Descending order

  const sumOfParts = otherMetricAverages.reduce((sum, metricAverage) => sum + metricAverage.average, 0);
  const otherAvg = wholeUpdateAverage - sumOfParts;

  const metricValues = [
    ...otherMetricAverages,
    {
      metricName: "other",
      metricDescription: "Other",
      average: otherAvg,
    },
    {
      metricName: MetricEnum.WHOLE_UPDATE.name,
      metricDescription: MetricEnum.WHOLE_UPDATE.description,
      average: wholeUpdateAverage,
      min: nanoToMicro(min(wholeUpdateVals.map(it => it.value))),
      max: nanoToMicro(max(wholeUpdateVals.map(it => it.value)))
    },
  ]

  return {
    mapName: result.fileName,
    metrics: metricValues.map(it => {
      return {
        metricName: it.metricName,
        metricDescription: it.metricDescription,
      }
    }),
    metricValues: metricValues,
    wholeUpdateAverage,
  }
}

export const createSummaryChartConfiguration = (results: BenchmarkResult[]): ChartConfiguration<"bar"> => {
  const chartData = results.map(mapSummaryChartData);
  // Sort data by "Whole Update" total time ascending
  chartData.sort((a, b) => a.wholeUpdateAverage - b.wholeUpdateAverage);

  const metrics = chartData[0].metrics;

  const datasets = metrics
    .filter(metric => metric.metricName != MetricEnum.WHOLE_UPDATE.name) // Exclude wholeUpdate from stacked bars
    .map(metric => {
      return {
        label: metric.metricDescription,
        data: chartData.map(data => data.metricValues.find(it => it.metricName === metric.metricName)?.average || 0),
        backgroundColor: metricNameToColor[metric.metricName]
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
        ctx.fillText(metric.metricDescription, left + colWidth / 2, y);
        chartData.forEach((res, colIdx) => {
          const metricValue = res.metricValues.find(it => it.metricName == metric.metricName)
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
        console.log({ mapName: data.mapName })

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
        padding: { bottom: (metrics.length + 3) * 20 + 10 },
      },
      plugins: {
        title: {
          display: true,
          text: "Verbose Metrics",
          color: colors.white,
        },
        legend: {
          labels: { color: colors.white, },
        },
        tooltip: {
          callbacks: {
            label: (context: any) =>
              `${context.dataset.label}: ${Math.round(context.parsed.x)}`,
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: { color: colors.white, },
          title: { display: true, text: "Average Time [microseconds] (lower is better)", color: "white" },
        },
        y: {
          stacked: true,
          ticks: { color: colors.white, },
        },
      },
    },
    plugins: [backgroundPlugin, tablePlugin],
  };

  return configuration;

}