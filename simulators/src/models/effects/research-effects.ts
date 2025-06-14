import { ProductivityEffect } from "./productivity-effect"

export const createMiningProductivityByLevel = (miningProductivityLevel: number): ProductivityEffect => {
    return ProductivityEffect.fromDecimal((miningProductivityLevel - 1) / 10)
}