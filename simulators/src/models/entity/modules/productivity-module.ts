import { ProductivityEffect, SpeedEffect } from "../../effects";
import { QualityLevel } from "../../quality";
import { ModuleMetadata, ModuleTier, ModuleType } from "./module";

export class ProductivityModule implements ModuleMetadata, SpeedEffect, ProductivityEffect {
    public readonly type: ModuleType = ModuleType.PRODUCTIVITY;
        public readonly name: string;
        public readonly speed: number;
        public readonly productivity: number;

    constructor(
        public readonly tier: ModuleTier,
        public readonly qualityLevel: QualityLevel,
        speedEffect: SpeedEffect,
        productivityEffect: ProductivityEffect
    ) {
        this.name = `productivity-${tier}-${qualityLevel}`
        this.speed = speedEffect.speed
        this.productivity = productivityEffect.productivity
    }
}


export const createProductivityModule = (tier: ModuleTier, qualityLevel: QualityLevel, productivity: ProductivityEffect, speed: SpeedEffect): ProductivityModule => {
    return new ProductivityModule(
        tier,
        qualityLevel,
        speed,
        productivity
    )
}