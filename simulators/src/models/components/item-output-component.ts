import { QualityRecipe, Recipe } from "../../recipes";
import { ItemRate, ItemRateFactory, OutputRate } from "../crafting";
import { Component, ComponentType } from "./component";

export class ItemOutputComponent extends Component {

    public static fromRecipe(recipe: QualityRecipe) {
        const outputRates = ItemRateFactory.fromRecipeOutput(recipe)
        return new ItemOutputComponent(outputRates)
    }

    componentType: ComponentType = ComponentType.ITEM_OUTPUT

    constructor(public outputRates: OutputRate[]) {
        super()
    }

    clone(): ItemOutputComponent {
        return new ItemOutputComponent([...this.outputRates])
    }
}