import { QualityLevel } from "../models/quality"
import { Ingredient } from "./ingredient"
import { IronOre, Item, PatroleumGas, Sulfur, TungstenOre, Water } from "./item"

export interface Recipe {
    inputs: Ingredient[],
    outputs: Ingredient[],
    /**
     * seconds
     */
    craftingTime: number,
}

export class QualityRecipe implements Recipe {

    static fromRecipe(recipe: Recipe, qualityLevel: QualityLevel): QualityRecipe {
        return new QualityRecipe(
            qualityLevel,
            recipe.inputs,
            recipe.outputs,
            recipe.craftingTime
        )
    }

    static common(recipe: Recipe): QualityRecipe {
        return this.fromRecipe(recipe, QualityLevel.COMMON)
    }
    

    constructor(
        public readonly qualityLevel: QualityLevel,
        public readonly inputs: Ingredient[],
        public readonly outputs: Ingredient[],
        public readonly craftingTime: number,
    ) {}
}

export const SulfurRecipe: Recipe = {
    outputs: [
        {
            item: Sulfur,
            quantity: 2
        }
    ],
    inputs: [
        {
            item: Water,
            quantity: 30
        },
        {
            item: PatroleumGas,
            quantity: 30
        }
    ],
    craftingTime: 1,
}

export const SulfurRecycling: Recipe = {
    inputs: [
        {
            item: Sulfur,
            quantity: 1
        }
    ],
    outputs: [
        {
            item: Sulfur,
            quantity: 0.25
        }
    ],
    craftingTime: 0.0625
}

export const createMiningRecipe = (item: Item, miningSpeed: number): Recipe => {

    let craftingTime = 1;
    if (item == TungstenOre) {
        craftingTime = 5;
    }

    return {
        inputs: [],
        outputs: [
            {
                item: item,
                quantity: miningSpeed
            }
        ],
        craftingTime: craftingTime,
    }
}