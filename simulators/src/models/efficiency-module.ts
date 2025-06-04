import { EfficiencyEffect } from "./effects";
import { Module, ModuleTier, ModuleType } from "./module";
import { QualityLevel } from "./quality";

// TODO: ABUC
export interface EfficiencyModule extends Module, EfficiencyEffect {}

export const createEfficiencyModule = (tier: ModuleTier, qualityLevel: QualityLevel): EfficiencyModule => {
    return {
        name: `efficiency-${tier}-${qualityLevel}`,
        type: ModuleType.EFFICIENCY,
        tier,
        qualityLevel,
        efficiency: 0
    }
}