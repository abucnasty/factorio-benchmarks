import { MetricEnum } from "./MetricEnum";

export type MetricName = typeof MetricEnum[keyof typeof MetricEnum]["name"];

export interface Metric {
    name: MetricName;
    description: string;
}