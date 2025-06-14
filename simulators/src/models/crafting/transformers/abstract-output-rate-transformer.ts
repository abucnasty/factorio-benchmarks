import { cloneDeep } from "lodash";
import { ItemRate, ItemRateMap, OutputRate } from "../item-rate";
import { OutputRateTransformer } from "./output-rate-transformer";
import { AllQualityLevels, QualityLevel } from "../../quality";

export abstract class AbstractOutputRateTransformer implements OutputRateTransformer {
    abstract transformer: (qualityLevel: QualityLevel, itemRate: ItemRate) => ItemRate;

    transform(outputRate: OutputRate): OutputRate {
        return {
            item: outputRate.item,
            rateMap: this.applyTransform(outputRate.rateMap)
        };
    }

    private applyTransform(inputRate: ItemRateMap): ItemRateMap {
        const newRateMap = cloneDeep(inputRate)

        AllQualityLevels.forEach(qualityLevel => {
            newRateMap[qualityLevel] = this.transformer(qualityLevel, inputRate[qualityLevel])
        })

        return newRateMap as ItemRateMap
    }
}