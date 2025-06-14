import { ModuleType, ModuleTier } from "./module";
import { QualityLevel } from "../../quality";
import { ModuleRegistry } from "./module-registry";
import { SpeedModule, createSpeedModule } from "./speed-module";


export const SpeedModuleRegistry: ModuleRegistry<SpeedModule> = {
    type: ModuleType.SPEED,
    get: (tier: ModuleTier, qualityLevel: QualityLevel): SpeedModule => {
        return SPEED_MODULES[tier][qualityLevel];
    },
    getAll: () => {
        return new Set(Object.values(SPEED_MODULES).flatMap(it => Object.values(it)));
    }
};


const SPEED_MODULES: Record<ModuleTier, Record<QualityLevel, SpeedModule>> = {
    [ModuleTier.L1]: {
        [QualityLevel.COMMON]:      createSpeedModule(ModuleTier.L1, QualityLevel.COMMON,     { speed: 0.20     }, { quality: -0.010 }),
        [QualityLevel.UNCOMMON]:    createSpeedModule(ModuleTier.L1, QualityLevel.UNCOMMON,   { speed: 0.20*1.3 }, { quality: -0.010 }),
        [QualityLevel.RARE]:        createSpeedModule(ModuleTier.L1, QualityLevel.RARE,       { speed: 0.20*1.6 }, { quality: -0.010 }),
        [QualityLevel.EPIC]:        createSpeedModule(ModuleTier.L1, QualityLevel.EPIC,       { speed: 0.20*1.9 }, { quality: -0.010 }),
        [QualityLevel.LEGENDARY]:   createSpeedModule(ModuleTier.L1, QualityLevel.LEGENDARY,  { speed: 0.20*2.5 }, { quality: -0.010 }),
    },
    [ModuleTier.L2]: {
        [QualityLevel.COMMON]:      createSpeedModule(ModuleTier.L2, QualityLevel.COMMON,     { speed: 0.30     }, { quality: -0.015 }),
        [QualityLevel.UNCOMMON]:    createSpeedModule(ModuleTier.L2, QualityLevel.UNCOMMON,   { speed: 0.30*1.3 }, { quality: -0.015 }),
        [QualityLevel.RARE]:        createSpeedModule(ModuleTier.L2, QualityLevel.RARE,       { speed: 0.30*1.6 }, { quality: -0.015 }),
        [QualityLevel.EPIC]:        createSpeedModule(ModuleTier.L2, QualityLevel.EPIC,       { speed: 0.30*1.9 }, { quality: -0.015 }),
        [QualityLevel.LEGENDARY]:   createSpeedModule(ModuleTier.L2, QualityLevel.LEGENDARY,  { speed: 0.30*2.5 }, { quality: -0.015 }),
    },
    [ModuleTier.L3]: {
        [QualityLevel.COMMON]:      createSpeedModule(ModuleTier.L3, QualityLevel.COMMON,     { speed: 0.50     }, { quality: -0.025 }),
        [QualityLevel.UNCOMMON]:    createSpeedModule(ModuleTier.L3, QualityLevel.UNCOMMON,   { speed: 0.50*1.3 }, { quality: -0.025 }),
        [QualityLevel.RARE]:        createSpeedModule(ModuleTier.L3, QualityLevel.RARE,       { speed: 0.50*1.6 }, { quality: -0.025 }),
        [QualityLevel.EPIC]:        createSpeedModule(ModuleTier.L3, QualityLevel.EPIC,       { speed: 0.50*1.9 }, { quality: -0.025 }),
        [QualityLevel.LEGENDARY]:   createSpeedModule(ModuleTier.L3, QualityLevel.LEGENDARY,  { speed: 0.50*2.5 }, { quality: -0.025 }),
    }
}