import { sumBy } from "lodash";
import { ComponentType, Module, ModuleComponent } from "../components";
import { EffectsComponent } from "../components/effects-component";
import { CompositeEffect, QualityEffect, SpeedEffect } from "../effects";
import { QualityLevel } from "../quality";
import { AbstractEntity } from "./entity";

export class Beacon extends AbstractEntity {
    public readonly name: string
    public readonly distributionEfficiency: number
    public readonly totalSpeed: number
    public readonly totalQuality: number

    constructor(
        modules: Module[],
        public readonly qualityLevel: QualityLevel
    ) {
        super()
        if (modules.length > 2) {
            throw Error("beacon can contain max 2 modules")
        }

        this.distributionEfficiency = distributionEfficiencyMap[qualityLevel]
        this.name = `beacon-${qualityLevel}`

        this.totalSpeed = sumBy(modules, item => ("speed" in item) ? item.speed : 0) * this.distributionEfficiency
        this.totalQuality = sumBy(modules, item => ("quality" in item) ? item.quality : 0) * this.distributionEfficiency
        const speedEffect = SpeedEffect.fromDecimal(this.totalSpeed)
        const qualityEffect = QualityEffect.fromDecimal(this.totalQuality)

        this._components.set(ModuleComponent.fromModules(modules))
        this._components.set(EffectsComponent.fromEffects([
            speedEffect,
            qualityEffect
        ]))
    }
}


const distributionEfficiencyMap: Record<QualityLevel, number> = {
    [QualityLevel.COMMON]: 1.5,
    [QualityLevel.UNCOMMON]: 1.7,
    [QualityLevel.RARE]: 1.9,
    [QualityLevel.EPIC]: 2.1,
    [QualityLevel.LEGENDARY]: 2.5
}


export class BeaconEffect implements SpeedEffect, QualityEffect {

    public static fromBeacons(beacons: Beacon[]) {
        const beaconCount = beacons.length

        const speed = sumBy(beacons, beacon => beacon.totalSpeed / beacon.distributionEfficiency * transmissionPower(beacon, beaconCount))
        const quality = sumBy(beacons, beacon => beacon.totalQuality / beacon.distributionEfficiency * transmissionPower(beacon, beaconCount))

        /**
         * Beacon effect was designed to be an integer value: https://forums.factorio.com/viewtopic.php?t=125320
         * 
         * This is why the rounding occurs below
         */
        return new BeaconEffect(
            beacons,
            Math.floor(speed*100)/100,
            Math.floor(quality*100)/100
        )
    }


    private constructor(
        public readonly beacons: readonly Beacon[],
        public readonly speed: number,
        public readonly quality: number
    ) {}
}

const transmissionPower = (beacon: Beacon, beaconCount: number): number => {
    return beacon.distributionEfficiency / Math.sqrt(beaconCount)
}