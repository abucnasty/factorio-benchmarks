import { SpeedEffect } from "../../effects";
import { QualityLevel } from "../../quality";
import { ItemRate } from "../item-rate";
import { AbstractOutputRateTransformer } from "./abstract-output-rate-transformer";

export class SpeedEffectOutputRateTransformer extends AbstractOutputRateTransformer {
    constructor(private readonly speedEffect: SpeedEffect) {
        super();
    }

    transformer = (qualityLevel: QualityLevel, itemRate: ItemRate): ItemRate => {
        return itemRate.copy({
            quantity: itemRate.rate * this.speedEffect.speed / itemRate.seconds,
            qualityLevel: qualityLevel
        })
    }
}