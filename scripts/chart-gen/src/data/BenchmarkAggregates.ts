import { average } from "../utils";
import { BenchmarkResult, MetricValue } from "./BenchmarkResult";
import { MetricName } from "./Metric";

export interface BenchmarkAggregate {
    run: number;
    data: Map<MetricName, number>;
}

export const ignoreFirstTicksFromResult = (result: BenchmarkResult, ticksToIgnore: number): BenchmarkResult => {
    const filteredMetricValues: Map<MetricName, MetricValue[]> = new Map();
    result.metricValues.forEach((values, metricName) => {
        filteredMetricValues.set(metricName, values.filter(v => v.tick > ticksToIgnore));
    });
    return {
        ...result,
        metricValues: filteredMetricValues
    }
}

export const computeBenchmarkAverages = (result: BenchmarkResult): Map<MetricName, number> => {
    const averages: Map<MetricName, number> = new Map();
    result.metrics.forEach(metric => {
        const values = result.metricValues.get(metric.name)!;
        const avg = values.reduce((sum, metricValue) => sum + metricValue.value, 0) / values.length;
        averages.set(metric.name, avg);
    })
    return averages;
}

export const computeBenchmarkAveragePerRun = (result: BenchmarkResult): BenchmarkAggregate[] => {
    const aggregates: Map<number, BenchmarkAggregate> = new Map();

    result.metricValues.forEach((metricValues, metricName) => {
        const runToValues: Map<number, number[]> = new Map();

        metricValues.forEach(mv => {
            if (!runToValues.has(mv.run)) {
                runToValues.set(mv.run, []);
            }
            runToValues.get(mv.run)!.push(mv.value);
        });

        runToValues.forEach((values, run) => {
            const avg = average(values);
            if (!aggregates.has(run)) {
                aggregates.set(run, { run, data: new Map() });
            }
            aggregates.get(run)!.data.set(metricName, avg);
        });
    })

    return Array.from(aggregates.values())
}

export const computeMinPerMetricPerTickAcrossRuns = (result: BenchmarkResult): Map<MetricName, Map<number, MetricValue>> => {
    const metricsPerTick: Map<MetricName, Map<number, MetricValue>> = new Map();

    result.metricValues.forEach((metricValues, metricName) => {
        metricValues.forEach(metricValue => {
            if (!metricsPerTick.has(metricName)) {
                metricsPerTick.set(metricName, new Map());
            }
            const tickMetrics = metricsPerTick.get(metricName)!;
            if (!tickMetrics.has(metricValue.tick) || metricValue.value < tickMetrics.get(metricValue.tick)!.value) {
                tickMetrics.set(metricValue.tick, metricValue);
            }
        });
    });

    return metricsPerTick;
}

export const metricValueAverage = (values: Array<MetricValue>): number => {
    return average(values.map(v => v.value));
}