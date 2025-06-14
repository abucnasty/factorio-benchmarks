// import { cloneDeep } from "lodash";
// import { Item, Recipe } from "../recipes";
// import { Effect, ProductivityEffect, QualityEffect, SpeedEffect } from "./effects";
// import { AllQualityLevels, QualityLevel } from "./quality";
// import { Entity } from "./entity";
// import { ModuleComponent } from "./components/module-component";

// export interface ItemRate {
//     item: Item
//     rate: ItemRateMap
// }

// export class ItemRateFactory {
//     public static fromRecipeOutput(recipe: Recipe): ItemRate[] {
//         return recipe.outputs.map(ingredient => {
//             const inputRate = ingredient.quantity / recipe.craftingTime
//             return {
//                 item: ingredient.item,
//                 rate: ItemRateMapFactory.fromBaseRate(inputRate)
//             }
//         })
//     }

//     public static fromRecipeInputs(recipe: Recipe): ItemRate[] {
//         return recipe.inputs.map(ingredient => {
//             const inputRate = ingredient.quantity / recipe.craftingTime
//             return {
//                 item: ingredient.item,
//                 rate: ItemRateMapFactory.fromBaseRate(inputRate)
//             }
//         })
//     }
// }

// export type ItemRateMap = Record<QualityLevel, number>

// export class ItemRateMapFactory {

//     public static fromBaseRate(baseRate: number): ItemRateMap {
//         return this.fromBaseRateWithQuality(baseRate, { quality: 0 })
//     }

//     public static fromBaseRateWithQuality(baseRate: number, qualityEffect: QualityEffect): ItemRateMap {
//         const quality = qualityEffect.quality
//         return {
//             [QualityLevel.COMMON]: baseRate * (1-quality),
//             [QualityLevel.UNCOMMON]: baseRate * quality * 9/10,
//             [QualityLevel.RARE]: baseRate * quality * 9/100,
//             [QualityLevel.EPIC]: baseRate * quality * 9/1000,
//             [QualityLevel.LEGENDARY]: baseRate * quality * 1/1000,
//         }
//     }

//     public static add(a: ItemRateMap, other: ItemRateMap): ItemRateMap {
//         const newRateMap = cloneDeep(a)

//         AllQualityLevels.forEach(qualityLevel => {
//             newRateMap[qualityLevel] += other[qualityLevel]
//         })

//         return newRateMap
//     }

//     public static applyTransform(input: ItemRateMap, f: (qualityLevel: QualityLevel, value: number) => number): ItemRateMap {
//         const newRateMap = cloneDeep(input)

//         AllQualityLevels.forEach(qualityLevel => {
//             newRateMap[qualityLevel] = f(qualityLevel, newRateMap[qualityLevel])
//         })

//         return newRateMap
//     }
// }


// interface ItemRateTransformer {
//     transform(itemRate: ItemRate): ItemRate
// }

// abstract class AbstractItemRateTransformer implements ItemRateTransformer {
//     abstract transformer(qualityLevel: QualityLevel, value: number): number

//     transform(itemRate: ItemRate): ItemRate {
//         return {
//             item: itemRate.item,
//             rate: ItemRateMapFactory.applyTransform(itemRate.rate, this.transformer)
//         }
//     }
// }


// class SpeedEffectItemRateTransformer extends AbstractItemRateTransformer {
//     constructor(private readonly speedEffect: SpeedEffect) {
//         super();
//     }

//     transformer(_: QualityLevel, value: number): number {
//         return value * this.speedEffect.speed
//     }
// }

// class ProductivityEffectItemRateTransformer extends AbstractItemRateTransformer {
//     constructor(private readonly effect: ProductivityEffect) {
//         super();
//     }

//     transformer(_: QualityLevel, value: number): number {
//         return value * this.effect.productivity
//     }
// }

// class QualityEffectItemRateTransformer extends AbstractItemRateTransformer {
//     constructor(private readonly effect: QualityEffect) {
//         super();
//     }

//     transformer(qualityLevel: QualityLevel, value: number): number {
//         const quality = this.effect.quality
//         switch(qualityLevel){
//             case QualityLevel.COMMON:
//                 return value * (1-quality)
//             case QualityLevel.UNCOMMON:
//                 return value * quality * 9/10
//             case QualityLevel.RARE:
//                 return value * quality * 9/100
//             case QualityLevel.EPIC:
//                 return value * quality * 9/1000
//             case QualityLevel.LEGENDARY:
//                 return value * quality * 1/1000
//         }
//     }
// }

// class RecyclerItemRateTransformer extends AbstractItemRateTransformer {
//     transformer(qualityLevel: QualityLevel, value: number): number {
//         return value * 0.25
//     }
// }

// class CompositeEffectTransformer implements ItemRateTransformer {
//     constructor(private readonly transformers: ItemRateTransformer[]) {}

//     transform(itemRate: ItemRate): ItemRate {
//         return this.transformers.reduce((previousRate, transformer) => {
//             return transformer.transform(previousRate)
//         }, itemRate)
//     }
// }
// // interface ProductionEntity extends Entity, ModuleComponent {
// //     inputs: ItemRate[]
// //     output: ItemRate
// //     effect: CompositeEffect
// // }

// // interface RecyclerEntity extends Entity, ModuleComponent {
// //     input: ItemRate
// //     output: ItemRate
// //     effect: CompositeEffect
// // }


// // const applyEffectsToProductionEntity = (productionEntity: ProductionEntity, effects: Effect[]): ProductionEntity => {

// //     const compositeEffect = createCompositeEffect([productionEntity.effect, ...effects])

// //     const speedTransformer = ItemRateTransformerFactory.speed(compositeEffect)
// //     const productivityTransformer = ItemRateTransformerFactory.productivity(compositeEffect)
// //     const qualityTransformer = ItemRateTransformerFactory.quality(compositeEffect)

// //     const outputRateTransformer = ItemRateTransformerFactory.composite([
// //         speedTransformer,
// //         productivityTransformer,
// //         qualityTransformer
// //     ])

// //     const inputRateTransformer = speedTransformer
// //     const outputRate = outputRateTransformer.transform(productionEntity.output)
// //     const inputRates = productionEntity.inputs.map(input => inputRateTransformer.transform(input))

// //     return {
// //         ...productionEntity,
// //         inputs: inputRates,
// //         output: outputRate
// //     }
// // }

// // const applyEffectsToRecyclerEntity = (recyclerEntity: RecyclerEntity, effects: Effect[]): RecyclerEntity => {
// //     // speed impact the rate the inputs are destroyed
    
// //     const compositeEffect = createCompositeEffect([recyclerEntity.effect, ...effects])

// //     compositeEffect.productivity = 0;
// // }