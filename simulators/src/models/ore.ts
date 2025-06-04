import { SpeedEffect } from "./effects";
import { Entity } from "./entity";

export interface Ore extends Entity, SpeedEffect {}

export const IronOre: Ore = {
    name: "iron-ore",
    speed: 0
}

export const TungstenOre: Ore = {
    name: "tungsten-ore",
    speed: 0.2 // 500% increase in mining time
}