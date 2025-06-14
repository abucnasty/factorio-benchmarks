import { QualityEffect } from "../../effects";
import { QualityLevel } from "../../quality";
import { ItemRate } from "../item-rate";
import { ItemRateMapFactory } from "../item-rate-map-factory";
import { AbstractItemRateTransformer } from "./abstract-item-rate-transformer";

export class QualityEffectItemRateTransformer extends AbstractItemRateTransformer {
    constructor(private readonly effect: QualityEffect) {
        super();
    }

    transformer = (qualityLevel: QualityLevel, itemRate: ItemRate): ItemRate => {
        const quality = this.effect.quality
        const inputQualityLevel = itemRate.qualityLevel
        const quantity = itemRate.quantity
        const modifiedQuantity = ItemRateMapFactory.qualityMapper(inputQualityLevel, qualityLevel, quality, quantity)

        const newItemRate = itemRate.copy({
            qualityLevel: qualityLevel,
            quantity: modifiedQuantity
        })

        return newItemRate
    }
}