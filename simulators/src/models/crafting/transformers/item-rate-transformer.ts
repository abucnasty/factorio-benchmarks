import { ItemRate, OutputRate } from "../item-rate";

export interface ItemRateTransformer {
    transform(inputRate: ItemRate): OutputRate
}