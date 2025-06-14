import { QualityEffect, SpeedEffect } from "../../effects";
import { QualityLevel } from "../../quality";
import { ModuleMetadata, ModuleTier, ModuleType } from "./module";

export class QualityModule implements ModuleMetadata, SpeedEffect, QualityEffect {
    public readonly type: ModuleType = ModuleType.QUALITY;
        public readonly name: string;
        public readonly speed: number;
        public readonly quality: number;

    constructor(
        public readonly tier: ModuleTier,
        public readonly qualityLevel: QualityLevel,
        qualityEffect: QualityEffect,
        speedEffect: SpeedEffect,
    ) {
        this.name = `quality-${tier}-${qualityLevel}`
        this.speed = speedEffect.speed
        this.quality = qualityEffect.quality
    }
}


export const createQualityModule = (tier: ModuleTier, qualityLevel: QualityLevel, speed: SpeedEffect, quality: QualityEffect): QualityModule => {
    return new QualityModule(
        tier,
        qualityLevel,
        quality,
        speed,
    )
}