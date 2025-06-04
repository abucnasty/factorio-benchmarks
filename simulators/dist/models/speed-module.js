"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeedModuleRegistry = exports.createSpeedModule = exports.SpeedModule = void 0;
const quality_1 = require("../constants/quality");
const module_1 = require("./module");
class SpeedModule {
    constructor(tier, qualityLevel, speed, quality) {
        this.tier = tier;
        this.qualityLevel = qualityLevel;
        this.speed = speed;
        this.quality = quality;
        this.type = module_1.ModuleType.SPEED;
    }
}
exports.SpeedModule = SpeedModule;
const createSpeedModule = (tier, qualityLevel, speed, quality) => {
    return Object.assign(Object.assign({ type: module_1.ModuleType.SPEED, tier, qualityLevel }, speed), quality);
};
exports.createSpeedModule = createSpeedModule;
exports.SpeedModuleRegistry = {
    type: module_1.ModuleType.SPEED,
    get: (tier, qualityLevel) => {
        return SPEED_MODULES[tier][qualityLevel];
    }
};
const SPEED_MODULES = {
    [module_1.ModuleTier.L1]: {
        [quality_1.QualityLevel.COMMON]: (0, exports.createSpeedModule)(module_1.ModuleTier.L1, quality_1.QualityLevel.COMMON, { speed: 0.20 }, { quality: -0.010 }),
        [quality_1.QualityLevel.UNCOMMON]: (0, exports.createSpeedModule)(module_1.ModuleTier.L1, quality_1.QualityLevel.UNCOMMON, { speed: 0.26 }, { quality: -0.010 }),
        [quality_1.QualityLevel.RARE]: (0, exports.createSpeedModule)(module_1.ModuleTier.L1, quality_1.QualityLevel.RARE, { speed: 0.32 }, { quality: -0.010 }),
        [quality_1.QualityLevel.EPIC]: (0, exports.createSpeedModule)(module_1.ModuleTier.L1, quality_1.QualityLevel.EPIC, { speed: 0.38 }, { quality: -0.010 }),
        [quality_1.QualityLevel.LEGENDARY]: (0, exports.createSpeedModule)(module_1.ModuleTier.L1, quality_1.QualityLevel.LEGENDARY, { speed: 0.50 }, { quality: -0.010 }),
    },
    [module_1.ModuleTier.L2]: {
        [quality_1.QualityLevel.COMMON]: (0, exports.createSpeedModule)(module_1.ModuleTier.L2, quality_1.QualityLevel.COMMON, { speed: 0.30 }, { quality: -0.015 }),
        [quality_1.QualityLevel.UNCOMMON]: (0, exports.createSpeedModule)(module_1.ModuleTier.L2, quality_1.QualityLevel.UNCOMMON, { speed: 0.39 }, { quality: -0.015 }),
        [quality_1.QualityLevel.RARE]: (0, exports.createSpeedModule)(module_1.ModuleTier.L2, quality_1.QualityLevel.RARE, { speed: 0.48 }, { quality: -0.015 }),
        [quality_1.QualityLevel.EPIC]: (0, exports.createSpeedModule)(module_1.ModuleTier.L2, quality_1.QualityLevel.EPIC, { speed: 0.57 }, { quality: -0.015 }),
        [quality_1.QualityLevel.LEGENDARY]: (0, exports.createSpeedModule)(module_1.ModuleTier.L2, quality_1.QualityLevel.LEGENDARY, { speed: 0.75 }, { quality: -0.015 }),
    },
    [module_1.ModuleTier.L3]: {
        [quality_1.QualityLevel.COMMON]: (0, exports.createSpeedModule)(module_1.ModuleTier.L3, quality_1.QualityLevel.COMMON, { speed: 0.50 }, { quality: -0.025 }),
        [quality_1.QualityLevel.UNCOMMON]: (0, exports.createSpeedModule)(module_1.ModuleTier.L3, quality_1.QualityLevel.UNCOMMON, { speed: 0.65 }, { quality: -0.025 }),
        [quality_1.QualityLevel.RARE]: (0, exports.createSpeedModule)(module_1.ModuleTier.L3, quality_1.QualityLevel.RARE, { speed: 0.80 }, { quality: -0.025 }),
        [quality_1.QualityLevel.EPIC]: (0, exports.createSpeedModule)(module_1.ModuleTier.L3, quality_1.QualityLevel.EPIC, { speed: 0.95 }, { quality: -0.025 }),
        [quality_1.QualityLevel.LEGENDARY]: (0, exports.createSpeedModule)(module_1.ModuleTier.L3, quality_1.QualityLevel.LEGENDARY, { speed: 1.25 }, { quality: -0.025 }),
    }
};
//# sourceMappingURL=speed-module.js.map