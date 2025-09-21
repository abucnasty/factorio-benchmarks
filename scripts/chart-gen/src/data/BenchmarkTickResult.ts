import fs from "fs";
import csv from "csv-parser";
import path from "path";
import { MetricName } from "./Metric";
import { MetricRegistryInstance } from "./MetricRegistry";
import { average, max, median, min, standardDeviation } from "../utils";
import { MetricEnum } from "./MetricEnum";
import { AggregationStrategy } from "./AggregationStrategy";

export type BenchmarkResultRaw = Record<MetricName, number> & {
    tick: number;
    run: number;
}

export type RunValue = {
    run: number
    value: number
}

export interface MetricValue {
    value: number; // in nanoseconds
    tick: number;
}

export interface MetricTickStat {
    average: number; // in nanoseconds
    standardDeviation: number; // in nanoseconds
    minimum: number; // in nanoseconds
    maximum: number;
    median: number; // in nanoseconds
    tick: number;
}

export interface BenchmarkTickResult {
    fileName: string;
    metrics: MetricEnum[]
    metricTickStats: Map<MetricName, MetricTickStat[]>
}

export const transformResultToMetricValues = (result: BenchmarkTickResult, strategy: AggregationStrategy): Map<MetricName, MetricValue[]> => {
    const map: Map<MetricName, MetricValue[]> = new Map()

    result.metricTickStats.forEach((stats, metricName) => {
        map.set(metricName, stats.map(stat => transformMetricTickStatToMetricValue(stat, strategy)))
    })

    return map;
}

export const transformMetricTickStatToMetricValue = (metricTickStat: MetricTickStat, strategy: AggregationStrategy): MetricValue => {
    let value: number = 0;
    switch (strategy) {
        case AggregationStrategy.AVERAGE:
            value = metricTickStat.average;
            break;
        case AggregationStrategy.MINIMUM:
            value = metricTickStat.minimum;
            break;
        case AggregationStrategy.MAXIMUM:
            value = metricTickStat.maximum;
            break;
        case AggregationStrategy.MEDIAN:
            value = metricTickStat.median;
            break;
        case AggregationStrategy.STANDARD_DEVIATION:
            value = metricTickStat.standardDeviation;
            break;
    }

    return {
        value: value,
        tick: metricTickStat.tick
    }
}

export const parseBenchmarkAveragePerTickResultFromCsv = async (filePath: string): Promise<BenchmarkTickResult> => {
    const baseName = path.basename(filePath, ".csv").replace("_verbose_metrics", "");
    let metrics: MetricEnum[] = [];
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
                const wholeUpdate = row[MetricEnum.WHOLE_UPDATE.name];
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

    const metricStats: Map<MetricName, MetricTickStat[]> = new Map(metrics.map(it => [it.name, []]));

    rawResultsPerTick.forEach((rows, tick) => {
        metrics.forEach(metric => {
            const rawMetricValues = rows.map(row => Number(row[metric.name]));
            metricStats.get(metric.name)!.push({
                average: average(rawMetricValues),
                standardDeviation: standardDeviation(rawMetricValues),
                minimum: min(rawMetricValues),
                maximum: max(rawMetricValues),
                median: median(rawMetricValues),
                tick: Number(tick),
            });
        })
    })

    return {
        fileName: baseName,
        metrics,
        metricTickStats: metricStats
    };
}