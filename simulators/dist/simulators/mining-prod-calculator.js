"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.miningProdSim = void 0;
const quality_1 = require("../constants/quality");
const module_1 = require("../models/module");
const speed_module_1 = require("../models/speed-module");
const miningProdSim = () => {
    const speedModule = speed_module_1.SpeedModuleRegistry.get(module_1.ModuleTier.L3, quality_1.QualityLevel.LEGENDARY);
};
exports.miningProdSim = miningProdSim;
//# sourceMappingURL=mining-prod-calculator.js.map