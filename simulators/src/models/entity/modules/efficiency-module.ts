import { EfficiencyEffect } from "../../effects"
import { QualityLevel } from "../../quality"
import { ModuleMetadata, ModuleTier, ModuleType } from "./module"

export interface EfficiencyModule extends ModuleMetadata, EfficiencyEffect {}

export const createEfficiencyModule = (tier: ModuleTier, qualityLevel: QualityLevel): EfficiencyModule => {
    return {
        name: `efficiency-${tier}-${qualityLevel}`,
        type: ModuleType.EFFICIENCY,
        tier,
        qualityLevel,
        efficiency: 0
    }
}