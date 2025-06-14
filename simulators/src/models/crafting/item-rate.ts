import { Item } from "../../recipes"
import { QualityLevel } from "../quality"

export interface ItemRateConstructorProperties {
    item: Item,
    quantity: number,
    qualityLevel: QualityLevel,
    seconds: number
}

export class ItemRate implements ItemRateConstructorProperties {

    public static empty(item: Item, qualityLevel: QualityLevel): ItemRate {
        return new ItemRate(
            item,
            0,
            qualityLevel,
            1
        )
    }


    public static copy(itemRate: ItemRate, other: Partial<ItemRateConstructorProperties>) {
        return new ItemRate(
            other.item ?? itemRate.item,
            other.quantity ?? itemRate.quantity,
            other.qualityLevel ?? itemRate.qualityLevel,
            other.seconds ?? itemRate.seconds
        )
        
    }

    public readonly rate: number

    constructor(
        public readonly item: Item,
        public readonly quantity: number,
        public readonly qualityLevel: QualityLevel,
        public readonly seconds: number
    ) { 
        this.rate = quantity / seconds
    }

    public copy(values: Partial<ItemRateConstructorProperties>): ItemRate {
        return ItemRate.copy(this, values)
    }
}

export type ItemRateMap = Record<QualityLevel, ItemRate>

export type InputRate = ItemRate

export interface OutputRate {
    item: Item
    rateMap: ItemRateMap
}

export const totalRateFromRateMap = (rateMap: ItemRateMap): number => {
    return rateMap.Q1.rate + rateMap.Q2.rate + rateMap.Q3.rate + rateMap.Q4.rate + rateMap.Q5.rate
}