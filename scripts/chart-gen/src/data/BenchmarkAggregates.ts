import { average } from "../utils";
import { BenchmarkTickResult, MetricTickStat, MetricValue } from "./BenchmarkTickResult";
import { MetricName } from "./Metric";

export interface BenchmarkAggregate {
    run: number;
    data: Map<MetricName, number>;
}

export const ignoreFirstTicksFromResult = (result: BenchmarkTickResult, ticksToIgnore: number): BenchmarkTickResult => {
    const filteredMetricValues: Map<MetricName, MetricTickStat[]> = new Map();
    result.metricTickStats.forEach((values, metricName) => {
        filteredMetricValues.set(metricName, values.filter(v => v.tick > ticksToIgnore));
    });
    return {
        ...result,
        metricTickStats: filteredMetricValues
    }
}

// export const computeBenchmarkAverages = (result: BenchmarkResult): Map<MetricName, number> => {
//     const averages: Map<MetricName, number> = new Map();
//     result.metrics.forEach(metric => {
//         const values = result.metricTickStats.get(metric.name)!;
//         const avg = values.reduce((sum, metricValue) => sum + metricValue.value, 0) / values.length;
//         averages.set(metric.name, avg);
//     })
//     return averages;
// }

// export const computeBenchmarkAveragePerRun = (result: BenchmarkResult): BenchmarkAggregate[] => {
//     const aggregates: Map<number, BenchmarkAggregate> = new Map();

//     result.metricTickStats.forEach((metricValues, metricName) => {
//         const runToValues: Map<number, number[]> = new Map();

//         metricValues.forEach(mv => {
//             if (!runToValues.has(mv.run)) {
//                 runToValues.set(mv.run, []);
//             }
//             runToValues.get(mv.run)!.push(mv.value);
//         });

//         runToValues.forEach((values, run) => {
//             const avg = average(values);
//             if (!aggregates.has(run)) {
//                 aggregates.set(run, { run, data: new Map() });
//             }
//             aggregates.get(run)!.data.set(metricName, avg);
//         });
//     })

//     return Array.from(aggregates.values())
// }

export const metricValueAverage = (values: Array<MetricValue>): number => {
    return average(values.map(v => v.value));
}