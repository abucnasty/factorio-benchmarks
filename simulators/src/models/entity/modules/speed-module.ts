import { QualityLevel } from "../../quality";
import { SpeedEffect, QualityEffect } from "../../effects";
import { ModuleMetadata, ModuleType, ModuleTier } from "./module";

export class SpeedModule implements ModuleMetadata, SpeedEffect, QualityEffect {

    public readonly type: ModuleType = ModuleType.SPEED;
    public readonly name: string;
    public readonly speed: number;
    public readonly quality: number;

    constructor(
        public readonly tier: ModuleTier,
        public readonly qualityLevel: QualityLevel,
        speedEffect: SpeedEffect,
        qualityEffect: QualityEffect,
    ) {
        this.name = `speed-${tier}-${qualityLevel}`
        this.speed = speedEffect.speed
        this.quality = qualityEffect.quality
    }
}

export const createSpeedModule = (tier: ModuleTier, qualityLevel: QualityLevel, speed: SpeedEffect, quality: QualityEffect): SpeedModule => {
    return new SpeedModule(
        tier,
        qualityLevel,
        speed,
        quality
    )
}

