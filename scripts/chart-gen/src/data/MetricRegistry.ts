import { Metric, MetricName } from "./Metric";
import { MetricEnum } from "./MetricEnum";

export class MetricRegistry {
    private readonly metrics: Map<MetricName, Metric> = new Map();

    constructor(metrics: Metric[] = []) {
        this.setMany(metrics);
    }

    public set(metric: Metric) {
        this.metrics.set(metric.name, metric);
    }

    public setMany(metrics: Metric[]) {
        metrics.forEach((metric) => this.set(metric));
    }

    public get(name: MetricName): Metric | null {
        return this.metrics.get(name) ?? null;
    }

    public getOrThrow(name: string): Metric {
        const metric = this.get(name as MetricName);
        if (!metric) {
            throw new Error(`Metric not supported: ${name}`);
        }
        return metric;
    }
}

export const MetricRegistryInstance = new MetricRegistry(Object.values(MetricEnum));