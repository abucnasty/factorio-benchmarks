import { ProductivityEffect } from "./effects";

export const createMiningProductivityByLevel = (miningProductivityLevel: number): ProductivityEffect => {
    return {
        productivity: (miningProductivityLevel - 1) / 10
    }
}