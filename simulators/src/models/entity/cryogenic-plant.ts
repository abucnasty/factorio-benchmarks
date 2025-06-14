import { QualityRecipe, Recipe } from "../../recipes"
import { CraftingSpeedFactory } from "../../recipes/recipe-factory"
import { Module, ModuleComponent } from "../components"
import { EffectsComponent } from "../components/effects-component"
import { ItemInputComponent } from "../components/item-input-component"
import { ItemOutputComponent } from "../components/item-output-component"
import { OutputTransformerComponent } from "../components/output-transformer-component"
import { ItemRateTransformerFactory } from "../crafting/transformers/item-rate-transformer-factory"
import { CompositeEffect, Effect, SpeedEffect } from "../effects"
import { QualityLevel } from "../quality"
import { AbstractEntity } from "./entity"

export class CryogenicPlant extends AbstractEntity {
    public readonly name = "cryogenic-plant"
    constructor(
        modules: Module[],
        public readonly qualityLevel: QualityLevel,
        recipe: QualityRecipe,
        effects: Effect[]
    ) {
        super()

        const baseRecipeRate: QualityRecipe = {
            ...recipe,
            craftingTime: recipe.craftingTime / cryogenicQualitySpeed[qualityLevel]
        }

        this._components.set(ModuleComponent.fromModules(modules))
        this._components.set(ItemOutputComponent.fromRecipe(baseRecipeRate))
        this._components.set(ItemInputComponent.fromRecipe(baseRecipeRate))
        this._components.set(EffectsComponent.fromEffects([
            ...effects,
            ...modules
        ]))
        this._components.set(new OutputTransformerComponent(
            baseRecipeRate,
            ItemRateTransformerFactory.fromCompositeEffect(
                CompositeEffect.fromEffects(
                    [
                        ...modules,
                        ...effects,
                    ]
                )
            )
        ))
    }
}

const cryogenicQualitySpeed: Record<QualityLevel, number> = {
    [QualityLevel.COMMON]: 2,
    [QualityLevel.UNCOMMON]: 2.6,
    [QualityLevel.RARE]: 3.2,
    [QualityLevel.EPIC]: 3.8,
    [QualityLevel.LEGENDARY]: 5,
}