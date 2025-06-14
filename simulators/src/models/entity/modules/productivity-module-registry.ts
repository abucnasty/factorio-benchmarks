import { QualityLevel } from "../../quality"
import { ModuleTier, ModuleType } from "./module"
import { ModuleRegistry } from "./module-registry"
import { createProductivityModule, ProductivityModule } from "./productivity-module"

export const ProductivityModuleRegistry: ModuleRegistry<ProductivityModule> = {
    type: ModuleType.SPEED,
    get: (tier: ModuleTier, qualityLevel: QualityLevel): ProductivityModule => {
        return PRODUCTIVITY_MODULES[tier][qualityLevel]        
    },
    getAll: () => {
        return new Set(Object.values(PRODUCTIVITY_MODULES).flatMap(it => Object.values(it)))
    }
}



const PRODUCTIVITY_MODULES: Record<ModuleTier, Record<QualityLevel, ProductivityModule>> = {
    [ModuleTier.L1]: {
        [QualityLevel.COMMON]:      createProductivityModule(ModuleTier.L1, QualityLevel.COMMON,     { productivity: 0.04     }, { speed: -0.05 }),
        [QualityLevel.UNCOMMON]:    createProductivityModule(ModuleTier.L1, QualityLevel.UNCOMMON,   { productivity: 0.04*1.3 }, { speed: -0.05 }),
        [QualityLevel.RARE]:        createProductivityModule(ModuleTier.L1, QualityLevel.RARE,       { productivity: 0.04*1.6 }, { speed: -0.05 }),
        [QualityLevel.EPIC]:        createProductivityModule(ModuleTier.L1, QualityLevel.EPIC,       { productivity: 0.04*1.9 }, { speed: -0.05 }),
        [QualityLevel.LEGENDARY]:   createProductivityModule(ModuleTier.L1, QualityLevel.LEGENDARY,  { productivity: 0.04*2.5 }, { speed: -0.05 }),
    },
    [ModuleTier.L2]: {
        [QualityLevel.COMMON]:      createProductivityModule(ModuleTier.L2, QualityLevel.COMMON,     { productivity: 0.06     }, { speed: -0.10 }),
        [QualityLevel.UNCOMMON]:    createProductivityModule(ModuleTier.L2, QualityLevel.UNCOMMON,   { productivity: 0.06*1.3 }, { speed: -0.10 }),
        [QualityLevel.RARE]:        createProductivityModule(ModuleTier.L2, QualityLevel.RARE,       { productivity: 0.06*1.6 }, { speed: -0.10 }),
        [QualityLevel.EPIC]:        createProductivityModule(ModuleTier.L2, QualityLevel.EPIC,       { productivity: 0.06*1.9 }, { speed: -0.10 }),
        [QualityLevel.LEGENDARY]:   createProductivityModule(ModuleTier.L2, QualityLevel.LEGENDARY,  { productivity: 0.06*2.5 }, { speed: -0.10 }),
    },
    [ModuleTier.L3]: {
        [QualityLevel.COMMON]:      createProductivityModule(ModuleTier.L3, QualityLevel.COMMON,     { productivity: 0.10     }, { speed: -0.15 }),
        [QualityLevel.UNCOMMON]:    createProductivityModule(ModuleTier.L3, QualityLevel.UNCOMMON,   { productivity: 0.10*1.3 }, { speed: -0.15 }),
        [QualityLevel.RARE]:        createProductivityModule(ModuleTier.L3, QualityLevel.RARE,       { productivity: 0.10*1.6 }, { speed: -0.15 }),
        [QualityLevel.EPIC]:        createProductivityModule(ModuleTier.L3, QualityLevel.EPIC,       { productivity: 0.10*1.9 }, { speed: -0.15 }),
        [QualityLevel.LEGENDARY]:   createProductivityModule(ModuleTier.L3, QualityLevel.LEGENDARY,  { productivity: 0.10*2.5 }, { speed: -0.15 }),
    }
}