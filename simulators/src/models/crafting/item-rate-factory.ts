import { Ingredient, QualityRecipe, Recipe } from "../../recipes"
import { QualityLevel } from "../quality"
import { InputRate, ItemRate, OutputRate } from "./item-rate"
import { ItemRateMapFactory } from "./item-rate-map-factory"

export class ItemRateFactory {
    public static fromRecipeOutput(recipe: QualityRecipe): OutputRate[] {
        return recipe.outputs.map(ingredient => {
            const inputRate = ingredient.quantity / recipe.craftingTime
                return {
                    item: ingredient.item,
                    rateMap: ItemRateMapFactory.fromQualityLevel(ingredient.item, recipe.qualityLevel, inputRate)
                }
            }
        )
    }

    public static fromRecipeInputs(recipe: Recipe, qualityLevel: QualityLevel): InputRate[] {
        return recipe.inputs.map(ingredient => 
            this.fromIngredient(
                ingredient, 
                qualityLevel, 
                recipe.craftingTime
            )
        )
    }

    public static fromIngredient(ingredient: Ingredient, qualityLevel: QualityLevel, craftingTime: number): ItemRate {
        const item = ingredient.item
        const quantity = ingredient.quantity
        return new ItemRate(item, quantity, qualityLevel, craftingTime)
    }
}