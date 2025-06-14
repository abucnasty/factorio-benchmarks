import { QualityLevel } from "../../quality";
import { ItemRate, OutputRate } from "../item-rate";
import { ItemRateTransformer } from "./item-rate-transformer";


export class ThrottledItemRateTransformer implements ItemRateTransformer {
    constructor(
        public otherTransformer: ItemRateTransformer,
        public readonly divisor: number
    ) {}

    transform(inputRate: ItemRate): OutputRate {
        return this.otherTransformer.transform(inputRate.copy({
            quantity: inputRate.quantity / this.divisor
        }))
    }
}