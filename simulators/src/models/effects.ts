import { Entity } from "./entity"
import { ModuleComponent } from "./module-component"
import { sumBy } from "lodash"

export interface SpeedEffect {
    speed: number
}

export interface QualityEffect {
    quality: number
}

export interface ProductivityEffect {
    productivity: number
}

export interface EfficiencyEffect {
    efficiency: number
}

export type Effect = 
    SpeedEffect |
    QualityEffect |
    ProductivityEffect |
    EfficiencyEffect

export interface CompositeEffect extends SpeedEffect, QualityEffect, ProductivityEffect, EfficiencyEffect {}


export const createCompositeEffect = (effects: Effect[]): CompositeEffect => {
    let speed = 0;
    let quality = 0;
    let productivity = 0;
    let efficiency = 0;

    for (const effect of effects) {
        if ("speed" in  effect) {
            speed = speed + effect.speed
        }
        if ("quality" in  effect) {
            quality = quality + effect.quality
        }
        if ("productivity" in  effect) {
            productivity = productivity + effect.productivity
        }
        if ("efficiency" in  effect) {
            efficiency = efficiency + effect.efficiency
        }
    }

    return roundEffect({
        speed,
        quality: Math.max(0, quality),
        productivity,
        efficiency
    })
}

export const createCompositeEffectForEntity = (entity: Entity & ModuleComponent, effects: Effect[]): CompositeEffect => {
    return createCompositeEffect([...entity.modules.map(it => it.module), ...effects])
}

export const overrideEntityEffects = <T extends (Entity & ModuleComponent)>(entity: T, effects: Effect[]): T & CompositeEffect => {
    const compositeEffect = createCompositeEffectForEntity(entity, effects)
    return { ...entity, ...compositeEffect }
}

/**
 * Effect were designed to be an integer value: https://forums.factorio.com/viewtopic.php?t=125320
 * 
 * This is why the rounding occurs below
 */
export const roundEffect = (effect: CompositeEffect): CompositeEffect => {
    return {
        speed: Math.round(effect.speed*100) / 100,
        quality: Math.round(effect.quality*100) / 100,
        productivity: Math.round(effect.productivity*100) / 100,
        efficiency: Math.round(effect.efficiency*100) / 100,
    }
}