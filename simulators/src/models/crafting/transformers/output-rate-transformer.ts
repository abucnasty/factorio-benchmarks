import { OutputRate } from "../item-rate";


export interface OutputRateTransformer {
    transform(outputRate: OutputRate): OutputRate
}