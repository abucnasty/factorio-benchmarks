import { QualityLevel } from "../../quality";
import { ModuleMetadata, ModuleTier, ModuleType } from "./module";

export interface ModuleRegistry<T extends ModuleMetadata> {
    type: ModuleType
    get(tier: ModuleTier, qualityLevel: QualityLevel): T
    getAll(): T[]
}