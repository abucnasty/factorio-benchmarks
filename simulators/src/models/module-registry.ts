import { QualityLevel } from "./quality";
import { Module, ModuleTier, ModuleType } from "./module";

export interface ModuleRegistry<T extends Module> {
    type: ModuleType
    get(tier: ModuleTier, qualityLevel: QualityLevel): T
    getAll(): Set<T>
}