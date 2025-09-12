
export const AggregationStrategy = {
    AVERAGE: "average",
    MINIMUM: "minimum",
    MAXIMUM: "maximum",
    MEDIAN: "median",
    STANDARD_DEVIATION: "standard_deviation"
} as const;

export type AggregationStrategy = (typeof AggregationStrategy)[keyof typeof AggregationStrategy];


export const aggregationStrategyFromString = (strategy: string): AggregationStrategy => {
    const possible: string[] = Object.values(AggregationStrategy)
    if(possible.includes(strategy)) {
        return strategy as AggregationStrategy
    } else {
        throw Error(`Aggregation strategy "${strategy}" must be one of [${possible.join(",")}]`)
    }
}