"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QualityModuleRegistry = exports.createQualityModule = void 0;
const quality_1 = require("../constants/quality");
const module_1 = require("./module");
const createQualityModule = (tier, qualityLevel, speed, quality) => {
    return Object.assign(Object.assign({ type: module_1.ModuleType.QUALITY, tier, qualityLevel }, speed), quality);
};
exports.createQualityModule = createQualityModule;
exports.QualityModuleRegistry = {
    type: module_1.ModuleType.QUALITY,
    get: (tier, qualityLevel) => {
        return QUALITY_MODULES[tier][qualityLevel];
    }
};
const QUALITY_MODULES = {
    [module_1.ModuleTier.L1]: {
        [quality_1.QualityLevel.COMMON]: (0, exports.createQualityModule)(module_1.ModuleTier.L1, quality_1.QualityLevel.COMMON, { speed: -0.05 }, { quality: 0.010 }),
        [quality_1.QualityLevel.UNCOMMON]: (0, exports.createQualityModule)(module_1.ModuleTier.L1, quality_1.QualityLevel.UNCOMMON, { speed: -0.05 }, { quality: 0.013 }),
        [quality_1.QualityLevel.RARE]: (0, exports.createQualityModule)(module_1.ModuleTier.L1, quality_1.QualityLevel.RARE, { speed: -0.05 }, { quality: 0.016 }),
        [quality_1.QualityLevel.EPIC]: (0, exports.createQualityModule)(module_1.ModuleTier.L1, quality_1.QualityLevel.EPIC, { speed: -0.05 }, { quality: 0.019 }),
        [quality_1.QualityLevel.LEGENDARY]: (0, exports.createQualityModule)(module_1.ModuleTier.L1, quality_1.QualityLevel.LEGENDARY, { speed: -0.05 }, { quality: 0.025 }),
    },
    [module_1.ModuleTier.L2]: {
        [quality_1.QualityLevel.COMMON]: (0, exports.createQualityModule)(module_1.ModuleTier.L2, quality_1.QualityLevel.COMMON, { speed: -0.05 }, { quality: -0.020 }),
        [quality_1.QualityLevel.UNCOMMON]: (0, exports.createQualityModule)(module_1.ModuleTier.L2, quality_1.QualityLevel.UNCOMMON, { speed: -0.05 }, { quality: -0.026 }),
        [quality_1.QualityLevel.RARE]: (0, exports.createQualityModule)(module_1.ModuleTier.L2, quality_1.QualityLevel.RARE, { speed: -0.05 }, { quality: -0.032 }),
        [quality_1.QualityLevel.EPIC]: (0, exports.createQualityModule)(module_1.ModuleTier.L2, quality_1.QualityLevel.EPIC, { speed: -0.05 }, { quality: -0.038 }),
        [quality_1.QualityLevel.LEGENDARY]: (0, exports.createQualityModule)(module_1.ModuleTier.L2, quality_1.QualityLevel.LEGENDARY, { speed: -0.05 }, { quality: -0.050 }),
    },
    [module_1.ModuleTier.L3]: {
        [quality_1.QualityLevel.COMMON]: (0, exports.createQualityModule)(module_1.ModuleTier.L3, quality_1.QualityLevel.COMMON, { speed: -0.05 }, { quality: -0.025 }),
        [quality_1.QualityLevel.UNCOMMON]: (0, exports.createQualityModule)(module_1.ModuleTier.L3, quality_1.QualityLevel.UNCOMMON, { speed: -0.05 }, { quality: -0.032 }),
        [quality_1.QualityLevel.RARE]: (0, exports.createQualityModule)(module_1.ModuleTier.L3, quality_1.QualityLevel.RARE, { speed: -0.05 }, { quality: -0.040 }),
        [quality_1.QualityLevel.EPIC]: (0, exports.createQualityModule)(module_1.ModuleTier.L3, quality_1.QualityLevel.EPIC, { speed: -0.05 }, { quality: -0.047 }),
        [quality_1.QualityLevel.LEGENDARY]: (0, exports.createQualityModule)(module_1.ModuleTier.L3, quality_1.QualityLevel.LEGENDARY, { speed: -0.05 }, { quality: -0.062 }),
    }
};
//# sourceMappingURL=quality-module.js.map