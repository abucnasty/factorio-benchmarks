import { ItemRate } from "../models/crafting";
import { Ingredient } from "./ingredient";
import { Recipe } from "./recipe";

export class CraftingSpeedFactory {
    public static multiply(recipe: Recipe, product: number): Recipe {
        const inputs: Ingredient[] = recipe.inputs.map(input => (
            {
                item: input.item,
                quantity: input.quantity * product
            }
        ))
        const outputs: Ingredient[] = recipe.outputs.map(output => ({
            item: output.item,
            quantity: output.quantity * product
        }))
        return {
            ...recipe,
            inputs,
            outputs
        }
    }
}