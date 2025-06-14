import { QualityRecipe, Recipe } from "../../recipes";
import { ItemRate, ItemRateFactory } from "../crafting";
import { Component, ComponentType } from "./component";

export class ItemInputComponent extends Component {
    public static fromRecipe(recipe: QualityRecipe) {
        const rates = ItemRateFactory.fromRecipeInputs(recipe, recipe.qualityLevel)
        return new ItemInputComponent(rates)
    }


    componentType: ComponentType = ComponentType.ITEM_INPUT

    constructor(public inputRates: ItemRate[]) {
        super()
    }

    clone(): ItemInputComponent {
        return new ItemInputComponent([...this.inputRates])
    }
}