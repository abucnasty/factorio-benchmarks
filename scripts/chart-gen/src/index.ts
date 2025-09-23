#!/usr/bin/env node
import path from "path";
import { globSync } from "glob";
import { Command } from "commander";
import { BenchmarkTickResult, parseBenchmarkAveragePerTickResultFromCsv } from "./data/BenchmarkTickResult";
import { AggregationStrategy, aggregationStrategyFromString } from "./data/AggregationStrategy";
import { createSummaryChartConfiguration } from "./charts/SummaryChart";
import { createLineChartForMetrics } from "./charts/LineChart";
import { ignoreFirstTicksFromResult } from "./data/BenchmarkAggregates";
import { MetricEnum } from "./data/MetricEnum";
import { nanoToMicro } from "./utils";
import { MetricRegistryInstance } from "./data/MetricRegistry";
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';
import { createBoxPlotChartConfiguration } from "./charts/BoxPlot";
import { Canvas } from "skia-canvas"
import { Chart, LinearScale, CategoryScale, registerables } from "chart.js";
import fsp from 'node:fs/promises';
import { BenchmarkAggregateRunResult, parseBenchmarkAggregatesPerRunResultFromCsv, saveBenchmarkAggregateRunResultsToCsv } from "./data/BenchmarkAggregateResult";

Chart.register(
  BoxPlotController,
  BoxAndWiskers,
  LinearScale,
  CategoryScale,
  ...registerables
);

const program = new Command();

program
  .name("chart-gen")
  .description("Extension of Belt's verbose_metrics to generate charts")
  .argument("<glob-pattern>", "Glob pattern for CSV files (e.g. './data/*.csv')")
  .option("-t, --type <summary | line | bar | boxplot | table>", "Type of chart to generate (summary)", "summary")
  .option("-o, --output <file>", "Output PNG file", "verbose_metrics.png")
  .option("-w, --width <px>", "Chart width in pixels", (it: string) => parseInt(it), 1400)
  .option("-h, --height <px>", "Chart height in pixels", (it: string) => parseInt(it), 800)
  .option("--remove-first-ticks <number>", "Remove the first N ticks from the data (to ignore initialization spikes)", (it: string) => parseInt(it), 3600)
  .option("--max-ticks <number>", "Max tick to include in charts", (it: string) => parseInt(it), 0)
  .option("--max-update <number>", "Max ms value to plot", (it: string) => Number(it), null)
  .option("--trim-prefix <string>", "Trim the prefix of the map name", (it: string) => it, "")
  .option("--summary-table <boolean>", "Create a verbose summary stats table in summary chart (default true)", (it) => it.toLowerCase() == "true", true)
  .option("--tick-window-aggregation <number> (default 0)", "Take the time weighted average for the tick window specified", (it: string) => Number(it), 0)
  .option("--metrics <string>", "Comma seperated list of specific metrics to use (default: *)", (it: string) => {
    if (it == "*") {
      return MetricRegistryInstance.all()
    } else {
      return it.split(",").map(metricName => MetricRegistryInstance.getOrThrow(metricName))
    }
  }, MetricRegistryInstance.all())
  .option("-a, --aggregate-strategy <average | minimum | maximum | median | standard_deviation", "aggregate the runs by either minimum per tick or average per tick", "average")
  .action(async (pattern, options) => {
    const width: number = options.width;
    const height: number = options.height;
    const outputFile: string = path.resolve(process.cwd(), options.output);
    const removeFirstTicks: number = options.removeFirstTicks;
    const type: string = options.type;
    const trimPrefix = options.trimPrefix;
    const tickWindowAggregation: number = options.tickWindowAggregation
    const aggregationStrategy: AggregationStrategy = aggregationStrategyFromString(options.aggregateStrategy)

    const metrics: MetricEnum[] = options.metrics
    console.debug(options)

    const files = globSync(pattern);
    if (files.length === 0) {
      console.error(`No files matched the given pattern ${pattern}`);
      process.exit(1);
    }



    if (type == "summary") {
      const aggregateResults: BenchmarkAggregateRunResult[] = []
      for (const file of files) {
        console.log(`Processing file: ${file}`);
        let result: BenchmarkAggregateRunResult = await parseBenchmarkAggregatesPerRunResultFromCsv(file, removeFirstTicks, metrics);

        if (trimPrefix && result.fileName.startsWith(trimPrefix)) {
          result.fileName = result.fileName.slice(trimPrefix.length);
        }
        aggregateResults.push(result);
      }
      const config = createSummaryChartConfiguration(aggregateResults, {
        metrics: metrics,
        includeTable: options.summaryTable,
        aggregationStrategy: aggregationStrategy
      });
      console.log("Chart configuration created.");
      const canvas = new Canvas(width, height)
      const chart = new Chart(
        canvas as any,
        config
      )
      const imageBuffer = await canvas.toBuffer("png");

      await fsp.writeFile(outputFile, imageBuffer);
      console.log(`Summary chart with table saved to ${outputFile}`);
      chart.destroy()
      return;
    }

    if (type == "line" || type == "bar") {
      const benchmarkResults: BenchmarkTickResult[] = [];
      for (const file of files) {
        console.log(`Processing file: ${file}`);
        let result: BenchmarkTickResult = await parseBenchmarkAveragePerTickResultFromCsv(file);

        if (removeFirstTicks > 0) {
          result = ignoreFirstTicksFromResult(result, removeFirstTicks);
        }

        if (trimPrefix && result.fileName.startsWith(trimPrefix)) {
          result.fileName = result.fileName.slice(trimPrefix.length);
        }
        benchmarkResults.push(result);
      }
      let maxWholeUpdate = 0;
      if (options.maxUpdate) {
        maxWholeUpdate = options.maxUpdate * 1000
      } else {
        benchmarkResults.forEach(result => result.metricTickStats.get(MetricEnum.WHOLE_UPDATE.name).forEach(metricValue => {
          maxWholeUpdate = Math.max(maxWholeUpdate, nanoToMicro(metricValue.maximum))
        }))
      }
      const configurations = benchmarkResults.map(result => {
        return {
          result: result,
          config: createLineChartForMetrics(result, {
            maxTicks: options.maxTicks,
            maxUpdateValue: maxWholeUpdate,
            type: type,
            aggregationStrategy,
            tickWindow: tickWindowAggregation
          })
        }
      })
      console.log("Chart configurations created.");

      const fileNameWithoutExt = outputFile.replace(/\.[^/.]+$/, "")

      configurations.forEach(async ({ result, config }) => {
        const canvas = new Canvas(width, height)
        const chart = new Chart(
          canvas as any,
          config
        )
        const imageBuffer = await canvas.toBuffer("png");

        const fileName = `${fileNameWithoutExt}_${result.fileName}.png`

        await fsp.writeFile(fileName, imageBuffer);
        chart.destroy()
        console.log(`Metric Line Chart Generated for ${fileName}`);
      });


      return;
    }

    if (type == "boxplot") {
      const aggregateResults: BenchmarkAggregateRunResult[] = []
      for (const file of files) {
        console.log(`Processing file: ${file}`);
        let result: BenchmarkAggregateRunResult = await parseBenchmarkAggregatesPerRunResultFromCsv(file, removeFirstTicks, metrics);

        if (trimPrefix && result.fileName.startsWith(trimPrefix)) {
          result.fileName = result.fileName.slice(trimPrefix.length);
        }
        aggregateResults.push(result);
      }
      const config = createBoxPlotChartConfiguration(aggregateResults, aggregationStrategy);
      console.log("Chart configuration created.");
      const canvas = new Canvas(width, height)
      const chart = new Chart(
        canvas as any,
        config
      )
      const imageBuffer = await await canvas.toBuffer("png");

      await fsp.writeFile(outputFile, imageBuffer);
      console.log(`Summary chart with table saved to ${outputFile}`);
      chart.destroy()
      return;
    }


    if (type == "table") {
      const aggregateResults: BenchmarkAggregateRunResult[] = []
      for (const file of files) {
        console.log(`Processing file: ${file}`);
        let result: BenchmarkAggregateRunResult = await parseBenchmarkAggregatesPerRunResultFromCsv(file, removeFirstTicks, metrics);

        if (trimPrefix && result.fileName.startsWith(trimPrefix)) {
          result.fileName = result.fileName.slice(trimPrefix.length);
        }
        aggregateResults.push(result);
      }

      const fileNameWithoutExt = outputFile.replace(/\.[^/.]+$/, "")

      await saveBenchmarkAggregateRunResultsToCsv(aggregateResults, aggregationStrategy, `${fileNameWithoutExt}.csv`)

      console.log(`Verbose Run Statistics Saved to ${fileNameWithoutExt}`)
      return;
    }

    console.error(`Unknown chart type: ${type}`);
    process.exit(1);
  })

program.parse();