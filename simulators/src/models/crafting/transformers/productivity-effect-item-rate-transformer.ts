import { ProductivityEffect } from "../../effects";
import { QualityLevel } from "../../quality";
import { ItemRate } from "../item-rate";
import { AbstractOutputRateTransformer } from "./abstract-output-rate-transformer";

export class ProductivityEffectItemRateTransformer extends AbstractOutputRateTransformer {
    constructor(private readonly effect: ProductivityEffect) {
        super();
    }

    transformer = (qualityLevel: QualityLevel, itemRate: ItemRate): ItemRate => {
        const baseQuantity = itemRate.quantity
        return itemRate.copy({
            quantity: baseQuantity * this.effect.productivity,
            qualityLevel: qualityLevel
        })
    }
}