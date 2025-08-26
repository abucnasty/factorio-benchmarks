import fs from "fs";
import csv from "csv-parser";
import path from "path";
import { Metric, MetricName } from "./Metric";
import { MetricRegistryInstance } from "./MetricRegistry";
import { MetricEnum } from "./MetricEnum";
import { average } from "../utils";

export type BenchmarkResultRaw = Record<MetricName, number> & {
    tick: number;
    run: number;
}

export interface MetricValue {
    value: number; // in nanoseconds
    tick: number;
    run: number;
}

export interface BenchmarkResult {
    fileName: string;
    metrics: Metric[]
    metricValues: Map<MetricName, MetricValue[]>
}

export const parseBenchmarkAveragePerTickResultFromCsv = async (filePath: string): Promise<BenchmarkResult> => {
    const baseName = path.basename(filePath, ".csv").replace("_verbose_metrics", "");
    let metrics: Metric[] = [];
    const rawResultsPerTick: Map<number, BenchmarkResultRaw[]> = new Map();

    await new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row: BenchmarkResultRaw) => {
                const tick = Number(row.tick);

                if (metrics.length === 0) {
                    metrics = Object.keys(row)
                        .filter(it => it !== "tick" && it !== "run")
                        .map(metricName => MetricRegistryInstance.getOrThrow(metricName));
                    metrics.forEach(metric => {
                        rawResultsPerTick[metric.name] = new Map();
                    });
                }
                const wholeUpdate = row["wholeUpdate"];
                if (wholeUpdate == undefined) {
                    throw new Error("Expected 'wholeUpdate' column to be present in the CSV");
                }
                if (!rawResultsPerTick.has(tick)) {
                    rawResultsPerTick.set(tick, [row]);
                } else {
                    rawResultsPerTick.get(tick)!.push(row);
                }
            })
            .on("end", () => resolve())
            .on("error", reject);
    });

    const metricValues: Map<MetricName, MetricValue[]> = new Map(metrics.map(it => [it.name, []]));

    rawResultsPerTick.forEach((rows, tick) => {
        metrics.forEach(metric => {
            const average_value = average(rows.map(row => Number(row[metric.name])))
            metricValues.get(metric.name)!.push({ value: average_value, tick: Number(tick), run: -1 });
        })
    })

    return {
        fileName: baseName,
        metrics,
        metricValues
    };
}

export const parseBenchmarkAverageResultLazyFromCsv = async (filePath: string): Promise<BenchmarkResult> => {
    const baseName = path.basename(filePath, ".csv").replace("_verbose_metrics", "");
    let metrics: Metric[] = [];
    const rawResultsPerMetric: Map<MetricName, MetricValue[]> = new Map();

    await new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row: BenchmarkResultRaw) => {
                const tick = Number(row.tick);

                if (metrics.length === 0) {
                    metrics = Object.keys(row)
                        .filter(it => it !== "tick" && it !== "run")
                        .map(metricName => MetricRegistryInstance.getOrThrow(metricName));
                    metrics.forEach(metric => {
                        rawResultsPerMetric.set(metric.name, []);
                    });
                }

                metrics.forEach(metric => {
                    if (!rawResultsPerMetric.has(metric.name)) {
                        rawResultsPerMetric.set(metric.name, [{ value: Number(row[metric.name]), tick: Number(tick), run: -1 }]);
                    } else {
                        rawResultsPerMetric.get(metric.name)!.push({ value: Number(row[metric.name]), tick: Number(tick), run: -1 });
                    }
                })
            })
            .on("end", () => resolve())
            .on("error", reject);
    });

    const metricValues: Map<MetricName, MetricValue[]> = new Map(metrics.map(it => [it.name, []]));

    metrics.forEach(metric => {
        const values = rawResultsPerMetric.get(metric.name);
        const averageValue = average(values?.map(it => it.value) || []);
        metricValues.set(metric.name, [{ value: Number(averageValue), tick: Number(0), run: -1 }])
    })

    return {
        fileName: baseName,
        metrics,
        metricValues
    };
}

export const parseBenchmarkMinPerTickResultFromCsv = async (filePath: string): Promise<BenchmarkResult> => {
    const baseName = path.basename(filePath, ".csv").replace("_verbose_metrics", "");
    let metrics: Metric[] = [];

    const bestWholeUpdatePerRow: Map<number, BenchmarkResultRaw> = new Map();

    await new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row: BenchmarkResultRaw) => {

                const tick = Number(row.tick);

                if (metrics.length === 0) {
                    metrics = Object.keys(row)
                        .filter(it => it !== "tick" && it !== "run")
                        .map(metricName => MetricRegistryInstance.getOrThrow(metricName));
                    metrics.forEach(metric => {
                        bestWholeUpdatePerRow[metric.name] = new Map();
                    });
                }
                const wholeUpdate = row["wholeUpdate"];
                if (wholeUpdate == undefined) {
                    throw new Error("Expected 'wholeUpdate' column to be present in the CSV");
                }
                if (!bestWholeUpdatePerRow.has(tick) || wholeUpdate < bestWholeUpdatePerRow.get(tick)!.wholeUpdate) {
                    bestWholeUpdatePerRow.set(tick, row);
                }
            })
            .on("end", () => resolve())
            .on("error", reject);
    });

    const metricValues: Map<MetricName, MetricValue[]> = new Map(metrics.map(it => [it.name, []]));

    bestWholeUpdatePerRow.forEach((row, tick) => {
        const run = Number(row.run);
        metrics.forEach(metric => {
            const value = row[metric.name];
            if (value !== undefined) {
                metricValues.get(metric.name)!.push({ value: Number(value), tick: Number(tick), run: Number(run) });
            }
        });
    });

    return {
        fileName: baseName,
        metrics,
        metricValues: metricValues
    };
}