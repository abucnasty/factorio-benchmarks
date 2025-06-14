import { OutputRate } from "../item-rate"
import { OutputRateTransformer } from "./output-rate-transformer"

export class CompositeOutputRateTransformer implements OutputRateTransformer {
    constructor(private readonly transformers: OutputRateTransformer[]) {}

    transform(outputRate: OutputRate): OutputRate {
        return this.transformers.reduce(
            (previousRate, transformer) => transformer.transform(previousRate),
            outputRate
        )
    }
}