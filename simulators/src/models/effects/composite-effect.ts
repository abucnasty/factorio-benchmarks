import { round } from "lodash";
import { Effect } from "./effect";
import { ProductivityEffect } from "./productivity-effect";
import { QualityEffect } from "./quality-effect";
import { SpeedEffect } from "./speed-effect";

export class CompositeEffect implements SpeedEffect, QualityEffect, ProductivityEffect {
    
    public static fromEffects(effects: readonly Effect[]) {
        let speed = 0;
        let quality = 0;
        let productivity = 0;

        for (const effect of effects) {
            if ("speed" in effect) {
                speed = speed + effect.speed
            }
            if ("quality" in  effect) {
                quality = quality + effect.quality
            }
            if ("productivity" in  effect) {
                productivity = productivity + effect.productivity
            }
        }

        return new CompositeEffect(
            speed,
            productivity,
            Math.max(0, quality)
        )
    }

    public readonly speed: number
    public readonly productivity: number
    public readonly quality: number
    
    private constructor(
        speed: number,
        productivity: number,
        quality: number
    ) {
        const precision = 3
        /**
         * Effect were designed to be an integer value: https://forums.factorio.com/viewtopic.php?t=125320
         * 
         * This is why the rounding occurs below
         */
        this.speed = round(speed, precision)
        this.quality = round(quality, precision)
        this.productivity = round(productivity, precision)
        this.quality = round(quality, 10)
    }
}