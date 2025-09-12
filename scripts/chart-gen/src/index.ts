#!/usr/bin/env node
// Usage: node index "./data/*.csv"

import fs from "fs";
import path from "path";
import * as glob from "glob";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import { Command } from "commander";
import { BenchmarkResult, parseBenchmarkAveragePerTickResultFromCsv } from "./data/BenchmarkResult";
import { AggregationStrategy, aggregationStrategyFromString } from "./data/AggregationStrategy";
import { createSummaryChartConfiguration } from "./charts/SummaryChart";
import { createLineChartForMetrics } from "./charts/LineChart";
import { ignoreFirstTicksFromResult } from "./data/BenchmarkAggregates";
import { MetricEnum } from "./data/MetricEnum";
import { nanoToMicro } from "./utils";
import { MetricRegistryInstance } from "./data/MetricRegistry";

const program = new Command();

program
  .name("chart-gen")
  .description("Extension of Belt's verbose_metrics to generate charts")
  .argument("<glob-pattern>", "Glob pattern for CSV files (e.g. './data/*.csv')")
  .option("-t, --type <type>", "Type of chart to generate (summary)", "summary")
  .option("-o, --output <file>", "Output PNG file", "verbose_metrics.png")
  .option("-w, --width <px>", "Chart width in pixels", (it: string) => parseInt(it), 1400)
  .option("-h, --height <px>", "Chart height in pixels", (it: string) => parseInt(it), 800)
  .option("--remove-first-ticks <number>", "Remove the first N ticks from the data (to ignore initialization spikes)", (it: string) => parseInt(it), 3600)
  .option("--max-ticks <number>", "Max tick to include in charts", (it: string) => parseInt(it), 0)
  .option("--max-update <number>", "Max ms value to plot", (it: string) => Number(it), null)
  .option("--trim-prefix <string>", "Trim the prefix of the map name", (it: string) => it, "")
  .option("--summary-table <boolean>", "Create a verbose summary stats table in summary chart (default true)", (it) => it.toLowerCase() == "true", true)
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
    const aggregationStrategy: AggregationStrategy = aggregationStrategyFromString(options.aggregateStrategy)

    const metrics: MetricEnum[] = options.metrics
    console.debug(options)

    const files = glob.sync(pattern);
    if (files.length === 0) {
      console.error("No files matched the given pattern.");
      process.exit(1);
    }

    const benchmarkResults: BenchmarkResult[] = [];
    for (const file of files) {
      console.log(`Processing file: ${file}`);
      let result: BenchmarkResult = await parseBenchmarkAveragePerTickResultFromCsv(file);
      
      if (removeFirstTicks > 0) {
        result = ignoreFirstTicksFromResult(result, removeFirstTicks);
      }

      if (trimPrefix && result.fileName.startsWith(trimPrefix)) {
        result.fileName = result.fileName.slice(trimPrefix.length);
      }
      benchmarkResults.push(result);
    }

    if (type == "summary") {
      const configuration = createSummaryChartConfiguration(benchmarkResults, { 
        metrics: metrics,
        includeTable: options.summaryTable,
        aggregationStrategy: aggregationStrategy
      });
      console.log("Chart configuration created.");
      const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });
      const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);

      fs.writeFileSync(outputFile, imageBuffer);
      console.log(`Summary chart with table saved to ${outputFile}`);
      return;
    }

    if (type == "line" || type == "bar") {
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
            aggregationStrategy
          })
        }
      })
      console.log("Chart configurations created.");

      const fileNameWithoutExt = outputFile.replace(/\.[^/.]+$/, "")

      configurations.forEach(async ({ result, config }) => {
        const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });
        const imageBuffer = await chartJSNodeCanvas.renderToBuffer(config);

        const fileName = `${fileNameWithoutExt}_${result.fileName}.png`

        fs.writeFileSync(fileName, imageBuffer);
        console.log(`Metric Line Chart Generated for ${fileName}`);
      });


      return;
    }

    console.error(`Unknown chart type: ${type}`);
    process.exit(1);
  })

program.parse();