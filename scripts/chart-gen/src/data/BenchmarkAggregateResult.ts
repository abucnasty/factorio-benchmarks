import fs from "fs";
import csv from "csv-parser";
import path from "path";
import { MetricName } from "./Metric";
import { MetricRegistryInstance } from "./MetricRegistry";
import { average, max, median, min, standardDeviation } from "../utils";
import { MetricEnum } from "./MetricEnum";
import { BenchmarkResultRaw } from "./BenchmarkTickResult";
import { createObjectCsvWriter } from "csv-writer"
import { AggregationStrategy } from "./AggregationStrategy";

export type MetricAggregate = {
    average: number; // in nanoseconds
    standardDeviation: number; // in nanoseconds
    minimum: number; // in nanoseconds
    maximum: number;
    median: number; // in nanoseconds
}

export type MetricRunAggregate = MetricAggregate & {
    run: number
}

export interface BenchmarkAggregateRunResult {
    fileName: string;
    metrics: MetricEnum[]
    runs: Map<MetricName, MetricRunAggregate[]>
    all: Map<MetricName, MetricAggregate>
}

export type RunValue = {
    value: number
    run: number
}

export const parseBenchmarkAggregatesPerRunResultFromCsv = async (filePath: string, removeFirstTicks: number = 0, metrics: MetricEnum[]): Promise<BenchmarkAggregateRunResult> => {
    const baseName = path.basename(filePath, ".csv").replace("_verbose_metrics", "");
    const runValuesPerMetric: Map<number, Partial<Record<MetricName, RunValue[]>>> = new Map()

    await new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row: BenchmarkResultRaw) => {
                const run = Number(row.run)
                if (metrics.length === 0) {
                    metrics = Object.keys(row)
                        .filter(it => it !== "tick" && it !== "run")
                        .map(metricName => MetricRegistryInstance.getOrThrow(metricName));
                }
                if (Number(row.tick) <= removeFirstTicks) {
                    return
                }

                if (runValuesPerMetric.get(run) === undefined) {
                    const metricToRunValues = {}
                    metrics.forEach(metric => {
                        metricToRunValues[metric.name] = []
                    });
                    runValuesPerMetric.set(run, metricToRunValues)
                }

                const wholeUpdate = row[MetricEnum.WHOLE_UPDATE.name];
                if (wholeUpdate == undefined) {
                    throw new Error("Expected 'wholeUpdate' column to be present in the CSV");
                }

                metrics.forEach(metric => {
                    runValuesPerMetric.get(run)[metric.name].push({
                        value: Number(row[metric.name]),
                        run: Number(row.run)
                    })
                })
            })
            .on("end", () => resolve())
            .on("error", reject);
    })


    const runAggregates: Map<MetricName, MetricRunAggregate[]> = new Map()
    metrics.forEach(metric => {
        runAggregates.set(metric.name, [])
    })

    for (const [run, metricToRunValues] of runValuesPerMetric) {
        metrics.forEach(metric => {
            const rawValues = metricToRunValues[metric.name].map(it => it.value)
            runAggregates.get(metric.name).push({
                average: average(rawValues),
                standardDeviation: standardDeviation(rawValues),
                minimum: min(rawValues),
                maximum: max(rawValues),
                median: median(rawValues),
                run: run
            })
        })
    }

    const all: Map<MetricName, MetricAggregate> = new Map()

    metrics.forEach(metric => {
        const metricRawValues = []
        runValuesPerMetric.forEach((metricToRunValues) => {
            metricRawValues.push(...metricToRunValues[metric.name].map(it => it.value))
        })
        all.set(metric.name, {
            average: average(metricRawValues),
            standardDeviation: standardDeviation(metricRawValues),
            minimum: min(metricRawValues),
            maximum: max(metricRawValues),
            median: median(metricRawValues),
        })
    })

    return {
        fileName: baseName,
        metrics,
        runs: runAggregates,
        all: all
    };
}


export const saveBenchmarkAggregateRunResultsToCsv = async (results: BenchmarkAggregateRunResult[], aggregationStrategy: AggregationStrategy, path: string): Promise<void> => {
    const allMetricNames = Array.from(
        new Set(results.flatMap(r => r.metrics.map(m => m.name)))
    );

    // Prepare CSV header for csv-writer
    const header = [
        { id: "fileName", title: "fileName" },
        { id: "run", title: "run" },
        ...allMetricNames.flatMap(metric => {
            let metricHeader = `${metric}`
            switch (aggregationStrategy) {
                case AggregationStrategy.AVERAGE:
                    metricHeader = `${metric}_average`
                    break;
                case AggregationStrategy.MINIMUM:
                    metricHeader = `${metric}_minimum`
                    break;
                case AggregationStrategy.MAXIMUM:
                    metricHeader = `${metric}_maximum`
                    break;
                case AggregationStrategy.MEDIAN:
                    metricHeader = `${metric}_median`
                    break;
                case AggregationStrategy.STANDARD_DEVIATION:
                    metricHeader = `${metric}_standardDeviation`
                    break;
            }

            return [
                { id: metricHeader, title: metricHeader }
            ]

        })
    ];

    const records: any[] = [];
    for (const result of results) {
        const runsSet = new Set<number>();
        result.runs.forEach(runAggregates => {
            runAggregates.forEach(agg => runsSet.add(agg.run));
        });
        const runs = Array.from(runsSet).sort((a, b) => a - b);

        for (const run of runs) {
            const record: Record<string, any> = {
                fileName: result.fileName,
                run: run
            };
            for (const metric of allMetricNames) {
                const runAgg = result.runs.get(metric)?.find(agg => agg.run === run);

                switch (aggregationStrategy) {
                    case AggregationStrategy.AVERAGE:
                        record[`${metric}_average`] = runAgg ? runAgg.average : "";
                        break;
                    case AggregationStrategy.MINIMUM:
                        record[`${metric}_minimum`] = runAgg ? runAgg.minimum : "";
                        break;
                    case AggregationStrategy.MAXIMUM:
                        record[`${metric}_maximum`] = runAgg ? runAgg.maximum : "";
                        break;
                    case AggregationStrategy.MEDIAN:
                        record[`${metric}_median`] = runAgg ? runAgg.median : "";
                        break;
                    case AggregationStrategy.STANDARD_DEVIATION:
                        record[`${metric}_standardDeviation`] = runAgg ? runAgg.standardDeviation : "";
                        break;
                }
            }
            records.push(record);
        }
    }

    const csvWriter = createObjectCsvWriter({
        path: path,
        header: header
    });

    await csvWriter.writeRecords(records);
}