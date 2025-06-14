import { CompositeEffect } from "../../effects"
import { InputRate, ItemRate, OutputRate } from "../item-rate"
import { ItemRateMapFactory } from "../item-rate-map-factory"
import { ItemRateTransformer } from "./item-rate-transformer"
import { ProductivityEffectItemRateTransformer } from "./productivity-effect-item-rate-transformer"
import { QualityEffectItemRateTransformer } from "./quality-effect-item-rate-transformer"
import { SpeedEffectOutputRateTransformer } from "./speed-effect-output-rate-transformer"

export class CompositeEffectItemRateTransformer implements ItemRateTransformer {
    private readonly productivityTransformer = new ProductivityEffectItemRateTransformer(this.compositeEffect)
    private readonly speedTransformer = new SpeedEffectOutputRateTransformer(this.compositeEffect)
    private readonly qualityTransformer = new QualityEffectItemRateTransformer(this.compositeEffect)
    
    constructor(private readonly compositeEffect: CompositeEffect) {}

    transform(itemRate: ItemRate): OutputRate {
        const baseOutputRate: OutputRate = {
            item: itemRate.item,
            rateMap: ItemRateMapFactory.fromQualityLevel(itemRate.item, itemRate.qualityLevel, itemRate.rate)
        }
        const speedOutput = this.speedTransformer.transform(baseOutputRate)

        const newBaseOutputRate: OutputRate = {
            item: itemRate.item,
            rateMap: ItemRateMapFactory.add(baseOutputRate.rateMap, speedOutput.rateMap)
        }
        const productivityOutputRate: OutputRate = this.productivityTransformer.transform(newBaseOutputRate)
        const compositeRateMap = ItemRateMapFactory.add(newBaseOutputRate.rateMap, productivityOutputRate.rateMap)
        const inputQuality = itemRate.qualityLevel
        return this.qualityTransformer.transform(compositeRateMap[inputQuality])
    }
}