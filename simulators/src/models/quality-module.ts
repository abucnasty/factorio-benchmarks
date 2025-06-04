import { QualityLevel } from "./quality";
import { SpeedEffect, QualityEffect } from "./effects";
import { Module, ModuleType, ModuleTier } from "./module";
import { ModuleRegistry } from "./module-registry";

export interface QualityModule extends Module, SpeedEffect, QualityEffect {}

export const createQualityModule = (tier: ModuleTier, qualityLevel: QualityLevel, speed: SpeedEffect, quality: QualityEffect): QualityModule => {
    return {
        name: `quality-${tier}-${qualityLevel}`,
        type: ModuleType.QUALITY,
        tier, 
        qualityLevel, 
        ...speed, 
        ...quality
    }
}

export const QualityModuleRegistry: ModuleRegistry<QualityModule> = {
    type: ModuleType.QUALITY,
    get: (tier: ModuleTier, qualityLevel: QualityLevel): QualityModule => {
        return QUALITY_MODULES[tier][qualityLevel]
    },
    getAll: () => {
        return new Set(Object.values(QUALITY_MODULES).flatMap(it => Object.values(it)))
    }
}


const QUALITY_MODULES: Record<ModuleTier, Record<QualityLevel, QualityModule>> = {
    [ModuleTier.L1]: {
        [QualityLevel.COMMON]:      createQualityModule(ModuleTier.L1, QualityLevel.COMMON,     { speed: -0.05 }, { quality: 0.010     }),
        [QualityLevel.UNCOMMON]:    createQualityModule(ModuleTier.L1, QualityLevel.UNCOMMON,   { speed: -0.05 }, { quality: 0.010*1.3 }),
        [QualityLevel.RARE]:        createQualityModule(ModuleTier.L1, QualityLevel.RARE,       { speed: -0.05 }, { quality: 0.010*1.6 }),
        [QualityLevel.EPIC]:        createQualityModule(ModuleTier.L1, QualityLevel.EPIC,       { speed: -0.05 }, { quality: 0.010*1.9 }),
        [QualityLevel.LEGENDARY]:   createQualityModule(ModuleTier.L1, QualityLevel.LEGENDARY,  { speed: -0.05 }, { quality: 0.010*2.5 }),
    },
    [ModuleTier.L2]: {
        [QualityLevel.COMMON]:      createQualityModule(ModuleTier.L2, QualityLevel.COMMON,     { speed: -0.05 }, { quality: 0.020     }),
        [QualityLevel.UNCOMMON]:    createQualityModule(ModuleTier.L2, QualityLevel.UNCOMMON,   { speed: -0.05 }, { quality: 0.020*1.3 }),
        [QualityLevel.RARE]:        createQualityModule(ModuleTier.L2, QualityLevel.RARE,       { speed: -0.05 }, { quality: 0.020*1.6 }),
        [QualityLevel.EPIC]:        createQualityModule(ModuleTier.L2, QualityLevel.EPIC,       { speed: -0.05 }, { quality: 0.020*1.9 }),
        [QualityLevel.LEGENDARY]:   createQualityModule(ModuleTier.L2, QualityLevel.LEGENDARY,  { speed: -0.05 }, { quality: 0.020*2.5 }),
    },
    [ModuleTier.L3]: {
        [QualityLevel.COMMON]:      createQualityModule(ModuleTier.L3, QualityLevel.COMMON,     { speed: -0.05 }, { quality: 0.025     }),
        [QualityLevel.UNCOMMON]:    createQualityModule(ModuleTier.L3, QualityLevel.UNCOMMON,   { speed: -0.05 }, { quality: 0.025*1.3 }),
        [QualityLevel.RARE]:        createQualityModule(ModuleTier.L3, QualityLevel.RARE,       { speed: -0.05 }, { quality: 0.025*1.6 }),
        [QualityLevel.EPIC]:        createQualityModule(ModuleTier.L3, QualityLevel.EPIC,       { speed: -0.05 }, { quality: 0.025*1.9 }),
        [QualityLevel.LEGENDARY]:   createQualityModule(ModuleTier.L3, QualityLevel.LEGENDARY,  { speed: -0.05 }, { quality: 0.025*2.5 }),
    }
}