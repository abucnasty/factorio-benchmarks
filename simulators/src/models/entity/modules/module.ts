import { QualityMetadata } from "../../quality"

export const ModuleType = {
    SPEED: "SPEED",
    PRODUCTIVITY: "PRODUCTIVITY",
    QUALITY: "QUALITY",
    EFFICIENCY: "EFFICIENCY"
} as const

export type ModuleType = typeof ModuleType[keyof typeof ModuleType]


export const ModuleTier = {
    L1: 1,
    L2: 2,
    L3: 3,
} as const

export type ModuleTier = typeof ModuleTier[keyof typeof ModuleTier]

export interface ModuleMetadata extends QualityMetadata {
    name: string
    type: ModuleType
    tier: ModuleTier
}