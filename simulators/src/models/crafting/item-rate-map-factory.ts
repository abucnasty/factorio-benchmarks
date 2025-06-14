import { cloneDeep } from "lodash"
import { QualityEffect } from "../effects"
import { QualityLevel, AllQualityLevels } from "../quality"
import { ItemRate, ItemRateMap } from "./item-rate"
import { Item } from "../../recipes"

export class ItemRateMapFactory {


    public static from(item: Item, inputQualityLevel: QualityLevel, qualityEffect: QualityEffect, baseRate: number): ItemRateMap {
        const newItemRateMap = ItemRateMapFactory.empty(item)

        AllQualityLevels.forEach(qualityLevel => {
            newItemRateMap[qualityLevel] = newItemRateMap[qualityLevel].copy({
                quantity: ItemRateMapFactory.qualityMapper(inputQualityLevel, qualityLevel, qualityEffect.quality, baseRate),
                qualityLevel: qualityLevel
            })
        })

        return newItemRateMap
    }

    public static fromQualityLevel(item: Item, inputQualityLevel: QualityLevel, baseRate: number): ItemRateMap {
        return ItemRateMapFactory.from(item, inputQualityLevel, { quality: 0 }, baseRate)
    }

    public static empty(item: Item): ItemRateMap {
        return {
            [QualityLevel.COMMON]: ItemRate.empty(item, QualityLevel.COMMON),
            [QualityLevel.UNCOMMON]: ItemRate.empty(item, QualityLevel.UNCOMMON),
            [QualityLevel.RARE]: ItemRate.empty(item, QualityLevel.RARE),
            [QualityLevel.EPIC]: ItemRate.empty(item, QualityLevel.EPIC),
            [QualityLevel.LEGENDARY]: ItemRate.empty(item, QualityLevel.LEGENDARY),
        }
    }

    public static removeQualityLevel(rateMap: ItemRateMap, qualityLevel: QualityLevel): ItemRateMap{
        const newRateMap = cloneDeep(rateMap)
        return {
            ...newRateMap,
            [qualityLevel]: newRateMap[qualityLevel].copy({
                quantity: 0
            })
        }
    }

    public static add(a: ItemRateMap, ...others: ItemRateMap[]): ItemRateMap {
        const newRateMap = cloneDeep(a)

        others.forEach(other => {
            AllQualityLevels.forEach(qualityLevel => {
                const otherItemRate = other[qualityLevel]
                const newItemRate = newRateMap[qualityLevel]
                newRateMap[qualityLevel] = newItemRate.copy({
                    quantity: newItemRate.quantity + otherItemRate.quantity
                })
            })
        })
        return newRateMap
    }

    public static divide(a: ItemRateMap, constant: number): ItemRateMap {
        const newRateMap = cloneDeep(a)
        AllQualityLevels.forEach(qualityLevel => {
            const itemRate = newRateMap[qualityLevel]
            newRateMap[qualityLevel] = newRateMap[qualityLevel].copy({
                quantity: itemRate.quantity / constant
            })
        })
        return newRateMap
    }

    public static qualityMapper(inputQualityLevel: QualityLevel, outputQualityLevel: QualityLevel, quality: number, rate: number) {
        if (inputQualityLevel == QualityLevel.COMMON) {
             switch(outputQualityLevel){
                case QualityLevel.COMMON:
                    return rate * (1-quality)
                case QualityLevel.UNCOMMON:
                    return rate * quality * 9/10
                case QualityLevel.RARE:
                    return rate * quality * 9/100
                case QualityLevel.EPIC:
                    return rate * quality * 9/1000
                case QualityLevel.LEGENDARY:
                    return rate * quality * 1/1000
            }
        }

        if (inputQualityLevel == QualityLevel.UNCOMMON) {
            switch(outputQualityLevel){
                case QualityLevel.COMMON:
                    return 0;
                case QualityLevel.UNCOMMON:
                    return rate * (1-quality)
                case QualityLevel.RARE:
                    return rate * quality * 9/10
                case QualityLevel.EPIC:
                    return rate * quality * 9/100
                case QualityLevel.LEGENDARY:
                    return rate * quality * 1/100
            }
        }

        if (inputQualityLevel == QualityLevel.RARE) {
            switch(outputQualityLevel){
                case QualityLevel.COMMON:
                case QualityLevel.UNCOMMON:
                    return 0;
                case QualityLevel.RARE:
                    return rate * (1-quality)
                case QualityLevel.EPIC:
                    return rate * quality * 9/10
                case QualityLevel.LEGENDARY:
                    return rate * quality * 1/10
            }
        }

        if (inputQualityLevel == QualityLevel.EPIC) {
            switch(outputQualityLevel){
                case QualityLevel.COMMON:
                case QualityLevel.UNCOMMON:
                case QualityLevel.RARE:
                    return 0;
                case QualityLevel.EPIC:
                    return rate * (1-quality)
                case QualityLevel.LEGENDARY:
                    return rate * quality
            }
        }

        if (inputQualityLevel == QualityLevel.LEGENDARY) {
            switch(outputQualityLevel){
                case QualityLevel.COMMON:
                case QualityLevel.UNCOMMON:
                case QualityLevel.RARE:
                case QualityLevel.EPIC:
                    return 0;
                case QualityLevel.LEGENDARY:
                    return rate
            }
        }
        throw Error("somehow this god forsaken condition has occurred")
    }
}