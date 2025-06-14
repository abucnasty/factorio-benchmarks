import { AllQualityLevels, QualityLevel } from "../../quality";
import { ItemRate, ItemRateMap, OutputRate } from "../item-rate";
import { ItemRateTransformer } from "./item-rate-transformer";


export abstract class AbstractItemRateTransformer implements ItemRateTransformer {
    abstract transformer: (qualityLevel: QualityLevel, itemRate: ItemRate) => ItemRate;

    transform(inputRate: ItemRate): OutputRate {
        return {
            item: inputRate.item,
            rateMap: this.applyTransform(inputRate)
        };
    }

    private applyTransform(inputRate: ItemRate): ItemRateMap {
        const newRateMap: Partial<ItemRateMap> = {}

        AllQualityLevels.forEach(qualityLevel => {
            newRateMap[qualityLevel] = this.transformer(qualityLevel, inputRate)
        })

        return newRateMap as ItemRateMap
    }
}
