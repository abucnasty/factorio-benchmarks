import { QualityRecipe } from "../../recipes";
import { ComponentType, ItemInputComponent, ItemOutputComponent, Module, ModuleComponent, OutputTransformerComponent } from "../components";
import { EffectsComponent } from "../components/effects-component";
import { ItemRateTransformerFactory } from "../crafting/transformers/item-rate-transformer-factory";
import { CompositeEffect, Effect } from "../effects";
import { QualityLevel } from "../quality";
import { AbstractEntity } from "./entity";

export class Recycler extends AbstractEntity {
    public readonly name = "recycler"
    constructor(
        private readonly _modules: Module[],
        public readonly qualityLevel: QualityLevel,
        private readonly _recipe: QualityRecipe,
        private readonly _effects: Effect[]
    ) {
        super()

        const baseRecipeRate: QualityRecipe = {
            ..._recipe,
            craftingTime: _recipe.craftingTime / recyclerQualitySpeed[qualityLevel]
        }

        this._components.set(ModuleComponent.fromModules(_modules))
        this._components.set(ItemOutputComponent.fromRecipe(baseRecipeRate))
        this._components.set(ItemInputComponent.fromRecipe(baseRecipeRate))

        this._components.set(EffectsComponent.fromEffects([
            ..._effects,
            ..._modules
        ]))

        this._components.set(new OutputTransformerComponent(
            baseRecipeRate,
            ItemRateTransformerFactory.fromCompositeEffect(
                CompositeEffect.fromEffects(
                    [
                        ..._modules,
                        ..._effects,
                    ]
                )
            )
        ))
    }

    public clone(): Recycler {
        return new Recycler([...this._modules], this.qualityLevel, this._recipe, [...this._effects])
    }

    public throttleByDivisor(divisor: number) {
        const outputTransformer = this._components.get<OutputTransformerComponent>(ComponentType.OUTPUT_TRANSFORMER)!!

        this._components.set(
            new OutputTransformerComponent(
                outputTransformer.qualityRecipe,
                ItemRateTransformerFactory.throttle(outputTransformer.transformer, divisor)
            )
        )
    }

    public multiplyOutputRateBy(multiplier: number) {
        this.throttleByDivisor(1 / multiplier)
    }
}


const recyclerQualitySpeed: Record<QualityLevel, number> = {
    [QualityLevel.COMMON]:      0.5,
    [QualityLevel.UNCOMMON]:    0.5*1.3,
    [QualityLevel.RARE]:        0.5*1.6,
    [QualityLevel.EPIC]:        0.5*1.9,
    [QualityLevel.LEGENDARY]:   0.5*2.5,
}