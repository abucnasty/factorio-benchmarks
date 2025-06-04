import { QualityLevel } from "./quality";
import { QualityEffect, SpeedEffect } from "./effects";
import { EfficiencyModule } from "./efficiency-module";
import { Entity } from "./entity";
import { ModuleComponent } from "./module-component";
import { SpeedModule } from "./speed-module";
import { sumBy } from "lodash"

export interface Beacon extends Entity, ModuleComponent<SpeedModule | EfficiencyModule>, SpeedEffect, QualityEffect  {
    distributionEfficiency: number
}



export const createBeacon = (
    qualityLevel: QualityLevel,
    modules: (SpeedModule | EfficiencyModule)[]
): Beacon => {
    const distributionEfficiency = distributionEfficiencyMap[qualityLevel]

    return {
        modules: modules.map(module => ({ module })),
        distributionEfficiency: distributionEfficiencyMap[qualityLevel],
        name: `beacon-${qualityLevel}`,
        speed: sumBy(modules, item => ("speed" in item) ? item.speed : 0) * distributionEfficiency,
        quality: sumBy(modules, item => ("quality" in item) ? item.quality : 0) * distributionEfficiency,
    }
}


const distributionEfficiencyMap: Record<QualityLevel, number> = {
    [QualityLevel.COMMON]: 1.5,
    [QualityLevel.UNCOMMON]: 1.7,
    [QualityLevel.RARE]: 1.9,
    [QualityLevel.EPIC]: 2.1,
    [QualityLevel.LEGENDARY]: 2.5
}

const transmissionPower = (beacon: Beacon, beaconCount: number): number => {
    return beacon.distributionEfficiency / Math.sqrt(beaconCount)
}


export interface BeaconEffect extends SpeedEffect, QualityEffect {
    beacons: Beacon[]
}

export const createBeaconEffect = (beacons: Beacon[]): BeaconEffect => {

    const modules = [...beacons.flatMap(beacon => beacon.modules)]

    const beaconCount = beacons.length

    const speed = sumBy(beacons, beacon => beacon.speed / beacon.distributionEfficiency * transmissionPower(beacon, beaconCount))
    const quality = sumBy(beacons, beacon => beacon.quality / beacon.distributionEfficiency * transmissionPower(beacon, beaconCount))

    /**
     * Beacon effect was designed to be an integer value: https://forums.factorio.com/viewtopic.php?t=125320
     * 
     * This is why the rounding occurs below
     */
    const beaconEffect: BeaconEffect = {
        speed: Math.floor(speed*100)/100,
        quality: Math.floor(quality*100)/100,
        beacons
    }

    return beaconEffect
}