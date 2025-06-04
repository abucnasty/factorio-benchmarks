import { createCompositeEffect, Effect } from "./effects"
import { QualityLevel } from "./quality"
import { round } from "lodash"

export interface ProductionRate {
    /**
     * all values in items / second
     */
    productionRate: { [QualityLevel.COMMON]: number } & Partial<Record<QualityLevel, number>>,
    totalRate: number
}

export const createProductionRate = (baseRate: number, effects: Effect[]): ProductionRate => {
    const externalEffect = createCompositeEffect(effects)
    const {
        speed,
        productivity,
        quality
    } = externalEffect;

    const newBaseRate = (baseRate + baseRate * speed)

    const additionalItemsPerCraft =  newBaseRate * productivity
    const newRate = newBaseRate + additionalItemsPerCraft

    return roundProductionRate({
        productionRate: {
            [QualityLevel.COMMON]: newRate * (1-quality),
            [QualityLevel.UNCOMMON]: newRate * quality * 9/10,
            [QualityLevel.RARE]: newRate * quality * 9/100,
            [QualityLevel.EPIC]: newRate * quality * 9/1000,
            [QualityLevel.LEGENDARY]: newRate * quality * 1/1000,
        },
        totalRate: newRate
    })
}

export const roundProductionRate = ({ productionRate, totalRate }: ProductionRate, precision: number = 2): ProductionRate => {
    return {
        productionRate: {
            [QualityLevel.COMMON]:  round(productionRate[QualityLevel.COMMON], precision),
            [QualityLevel.UNCOMMON]: round(productionRate[QualityLevel.UNCOMMON], precision),
            [QualityLevel.RARE]: round(productionRate[QualityLevel.RARE], precision),
            [QualityLevel.EPIC]: round(productionRate[QualityLevel.EPIC], precision),
            [QualityLevel.LEGENDARY]: round(productionRate[QualityLevel.LEGENDARY], precision),
        },
        totalRate: round(totalRate, precision)
    }
}