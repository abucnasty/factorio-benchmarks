import { CompositeEffect, createCompositeEffect, Effect } from "./effects"
import { Entity } from "./entity"
import { Module } from "./module"
import { ComponentModule, ModuleComponent } from "./module-component"
import { createProductionRate, ProductionRate } from "./production-rate"

export interface Miner extends Entity, ProductionRate, ModuleComponent, CompositeEffect {}

export const createBigMiningDrill = (props: {modules: ComponentModule[], effects: Effect[]}): Miner => {

    const {
        modules,
        effects
    } = props;

    const compositeEffect = createCompositeEffect([...modules, ...effects])


    return {
        name: "big-mining-drill",
        modules: modules.map(module => ({module})),
        ...createProductionRate(2.5, [compositeEffect]),
        ...compositeEffect
    }
}

export const createGenericMiningDrill = (props: {modules: ComponentModule[], effects: Effect[], baseRate: number}): Miner => {

    const {
        modules,
        effects,
        baseRate
    } = props;

    const compositeEffect = createCompositeEffect([...modules, ...effects])


    return {
        name: "generic-mining-drill",
        modules: modules.map(module => ({module})),
        ...createProductionRate(baseRate, [compositeEffect]),
        ...compositeEffect
    }
}