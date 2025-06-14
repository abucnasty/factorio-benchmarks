// import { createMiningRecipe, Item } from "../recipes"
// import { CompositeEffect, createCompositeEffect, Effect } from "./effects"
// import { Entity } from "./entity"
// import { Module, ModuleComponent } from "./components/module-component"
// import { createProductionRate, ProductionRate } from "./production-rate"

// export interface Miner extends Entity, ProductionRate, ModuleComponent, CompositeEffect {}

// export const createBigMiningDrill = (item: Item, props: {modules: Module[], effects: Effect[]}): Miner => {

//     const genericMiningDrill = createGenericMiningDrill({
//         modules: props.modules,
//         effects: props.effects,
//         item: item,
//         miningSpeed: 2.5
//     })


//     return {
//         ...genericMiningDrill,
//         name: "big-mining-drill",
//     }
// }

// export const createGenericMiningDrill = (props: {modules: Module[], effects: Effect[], item: Item, miningSpeed: number}): Miner => {

//     const {
//         modules,
//         effects,
//         miningSpeed,
//         item
//     } = props;

//     const compositeEffect = createCompositeEffect([...modules, ...effects])

//     const miningRecipe = createMiningRecipe(item, miningSpeed)


//     return {
//         name: "generic-mining-drill",
//         modules: modules.map(module => ({module})),
//         ...createProductionRate(miningRecipe, [compositeEffect]),
//         ...compositeEffect
//     }
// }