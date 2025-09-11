import { MetricName } from "./Metric";
import { MetricEnum } from "./MetricEnum";

export class MetricRegistry {
    private readonly metrics: Map<MetricName, MetricEnum> = new Map();

    constructor(metrics: MetricEnum[] = []) {
        this.setMany(metrics);
    }

    public set(metric: MetricEnum) {
        this.metrics.set(metric.name, metric);
    }

    public setMany(metrics: MetricEnum[]) {
        metrics.forEach((metric) => this.set(metric));
    }

    public get(name: MetricName): MetricEnum | null {
        return this.metrics.get(name) ?? null;
    }

    public getOrThrow(name: string): MetricEnum {
        const metric = this.get(name as MetricName);
        if (!metric) {
            throw new Error(`Metric not supported: ${name}`);
        }
        return metric;
    }

    public all(): MetricEnum[] {
        return Array.from(this.metrics.values())
    }
}

export const MetricRegistryInstance = new MetricRegistry(Object.values(MetricEnum));