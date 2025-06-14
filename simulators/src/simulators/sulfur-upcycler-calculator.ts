import { ModuleTier, ModuleType } from "../models/entity/modules/module"
import { QualityLevel } from "../models/quality"
import { SpeedModuleRegistry } from "../models/entity/modules/speed-module-registry"
import { PatroleumGas, QualityRecipe, Sulfur, SulfurRecipe, SulfurRecycling, Water } from "../recipes"
import { combinationsWithRepeats, CsvWriteMode, powerset, writeCsvFile } from "../utils"
import { CryogenicPlant } from "../models/entity/cryogenic-plant"
import { ProductionRateSystem } from "../models/systems/production-rate-system"
import { Beacon, BeaconEffect } from "../models/entity/beacon"
import { Recycler } from "../models/entity/recycler"
import { ItemRateMapFactory, totalRateFromRateMap } from "../models/crafting"
import { createEfficiencyModule } from "../models/entity/modules/efficiency-module"
import { QualityModuleRegistry } from "../models/entity/modules/quality-module-registry"
import { ProductivityModuleRegistry } from "../models/entity/modules/productivity-module-registry"
import { groupBy, orderBy, round, sortBy, sumBy } from "lodash"
import { CompositeEffect } from "../models/effects"
import { Module } from "../models/components"

export type SulfurUpcyclerProps = {}
export type SulfurUpcyclerSimResult = {
    cryo_module_prod_count: number;
    cryo_module_quality_count: number;
    cryo_production_speed: number;
    cryo_water_rate: number;
    cryo_petro_rate: number;
    cryo_io_ratio: number;
    cryo_quality: number;
    cryo_beacon_1?: string;
    cryo_beacon_2?: string;
    cryo_beacon_3?: string;
    cryo_beacon_4?: string;
    cryo_beacon_count: number;
    rec_beacon_1?: string;
    rec_beacon_2?: string;
    rec_beacon_3?: string;
    rec_beacon_4?: string;
    recycler_beacon_count: number;
    recycler_modules: string;
    output_q1: number;
    output_q2: number;
    output_q3: number;
    output_q4: number;
    output_q5: number;
    recycled_q1: number;
    recycler_quality: number;
}

export const sulfurUpcyclerSim = async (props: SulfurUpcyclerProps): Promise<SulfurUpcyclerSimResult[]> => {
    
    const productionRateSystem = new ProductionRateSystem()
    
    const beaconEffects: BeaconEffect[] = generateBeaconCombinations()

    const prodMod = ProductivityModuleRegistry.get(ModuleTier.L3, QualityLevel.LEGENDARY)
    const qualMod = QualityModuleRegistry.get(ModuleTier.L3, QualityLevel.LEGENDARY)

    const cryogenicPlantModuleCombinations = combinationsWithRepeats(
        [
            ProductivityModuleRegistry.get(ModuleTier.L3, QualityLevel.LEGENDARY),
            QualityModuleRegistry.get(ModuleTier.L3, QualityLevel.LEGENDARY)
        ],
        8
    )

    const recyclerModuleCombos: Module[][] = [
        [
            QualityModuleRegistry.get(ModuleTier.L3, QualityLevel.LEGENDARY),
            QualityModuleRegistry.get(ModuleTier.L3, QualityLevel.LEGENDARY),
            QualityModuleRegistry.get(ModuleTier.L3, QualityLevel.LEGENDARY),
            QualityModuleRegistry.get(ModuleTier.L3, QualityLevel.LEGENDARY)
        ],
        [
            SpeedModuleRegistry.get(ModuleTier.L3, QualityLevel.LEGENDARY),
            SpeedModuleRegistry.get(ModuleTier.L3, QualityLevel.LEGENDARY),
            SpeedModuleRegistry.get(ModuleTier.L3, QualityLevel.LEGENDARY),
            SpeedModuleRegistry.get(ModuleTier.L3, QualityLevel.LEGENDARY)
        ],
    ]

    const results: SulfurUpcyclerSimResult[] = []

    for(const cryoBeaconEffect of beaconEffects) {
        for(const reyclerBeaconEffect of beaconEffects) {
            for (const cryoModules of cryogenicPlantModuleCombinations) {
                for (const recyclerModules of recyclerModuleCombos) {
                        const cryogenicPlant = new CryogenicPlant(
                            cryoModules,
                            QualityLevel.LEGENDARY,
                            QualityRecipe.common(SulfurRecipe),
                            [ cryoBeaconEffect ]
                        )
                        const recycler = new Recycler(
                            recyclerModules,
                            QualityLevel.LEGENDARY,
                            QualityRecipe.common(SulfurRecycling),
                            [ reyclerBeaconEffect ]
                        )

                        const cryoProductionSpeed = CompositeEffect.fromEffects(cryogenicPlant.effects).speed

                        // if (cryoProductionSpeed > 8) {
                        //     continue;
                        // }

                        const cryogenicPlantOutputRate = productionRateSystem.computeOutputRate(cryogenicPlant)
                        const cryogenicPlantInputRate = productionRateSystem.computeInputRate(cryogenicPlant)

                            

                        const recyclerOutputRate = productionRateSystem.computeOutputRate(recycler)
                        const recyclerInputRateRate = productionRateSystem.computeInputRate(recycler)

                        try {
                            const throttledRecylcerRate = productionRateSystem.computeThrottledOutputRateForEntities(cryogenicPlant, recycler)

                            const output = productionRateSystem.recycleFromProducerUntil(cryogenicPlant, recycler, Sulfur, QualityLevel.COMMON, 1)

                            const combinedOutput = ItemRateMapFactory.add(
                                ItemRateMapFactory.removeQualityLevel(cryogenicPlantOutputRate[0].rateMap, QualityLevel.COMMON),
                                throttledRecylcerRate[0].rateMap
                            )

                            const recycledRate = cryogenicPlantOutputRate[0].rateMap[QualityLevel.COMMON].rate


                            const petroleumRate = cryogenicPlantInputRate.find(it => it.item == PatroleumGas)?.rate ?? 0
                            const totalRate = totalRateFromRateMap(cryogenicPlantOutputRate[0].rateMap)

                            const ioRate = totalRate / petroleumRate

                            

                            results.push({
                                cryo_module_prod_count: cryogenicPlant.modules.filter(it => it.type == ModuleType.PRODUCTIVITY).length,
                                cryo_module_quality_count: cryogenicPlant.modules.filter(it => it.type == ModuleType.QUALITY).length,
                                cryo_beacon_1: cryoBeaconEffect.beacons[0]?.modules.map(it => it.name).join("|"),
                                cryo_beacon_2: cryoBeaconEffect.beacons[1]?.modules.map(it => it.name).join("|"),
                                cryo_beacon_3: cryoBeaconEffect.beacons[2]?.modules.map(it => it.name).join("|"),
                                cryo_beacon_4: cryoBeaconEffect.beacons[3]?.modules.map(it => it.name).join("|"),
                                cryo_petro_rate: cryogenicPlantInputRate.find(it => it.item == PatroleumGas)?.rate ?? 0,
                                cryo_water_rate: cryogenicPlantInputRate.find(it => it.item == Water)?.rate ?? 0,
                                cryo_beacon_count: cryoBeaconEffect.beacons.length,
                                cryo_io_ratio: ioRate,
                                rec_beacon_1: reyclerBeaconEffect.beacons[0]?.modules.map(it => it.name).join("|"),
                                rec_beacon_2: reyclerBeaconEffect.beacons[1]?.modules.map(it => it.name).join("|"),
                                rec_beacon_3: reyclerBeaconEffect.beacons[2]?.modules.map(it => it.name).join("|"),
                                rec_beacon_4: reyclerBeaconEffect.beacons[3]?.modules.map(it => it.name).join("|"),
                                recycler_beacon_count: reyclerBeaconEffect.beacons.length,
                                recycler_modules: recyclerModules[0].type,
                                output_q1: combinedOutput.Q1.rate,
                                output_q2: combinedOutput.Q2.rate,
                                output_q3: combinedOutput.Q3.rate,
                                output_q4: combinedOutput.Q4.rate,
                                output_q5: combinedOutput.Q5.rate,
                                recycled_q1: cryogenicPlantOutputRate[0].rateMap[QualityLevel.COMMON].rate,
                                cryo_production_speed: cryoProductionSpeed,
                                cryo_quality: CompositeEffect.fromEffects(cryogenicPlant.effects).quality,
                                recycler_quality: CompositeEffect.fromEffects(recycler.effects).quality
                            })
                        } catch(e) {
                            // console.error(e)
                        }
                    }
                }
            }
        }
        

   

    const groupedByQ2Output = groupBy(results, result => round(result.output_q2, 1))

    const filteredResults = Object.values(groupedByQ2Output).flatMap(results => {
        // prefer a higher sulfur yield per liquid input first then minimize number of beacons used
        const sortedResults = orderBy(results, ["cryo_io_ratio", "recycler_beacon_count"], ["asc", "asc"])
        return sortedResults[0]
    }).filter(result => result.cryo_petro_rate > 200)

    filteredResults.forEach(result => {
        result.cryo_petro_rate = round(result.cryo_petro_rate, 2)
        result.cryo_water_rate = round(result.cryo_petro_rate, 2)
        result.cryo_module_prod_count = round(result.cryo_module_prod_count, 2)
        result.cryo_module_quality_count = round(result.cryo_module_quality_count, 2)
        result.cryo_production_speed = round(result.cryo_production_speed, 2)
        result.cryo_water_rate = round(result.cryo_water_rate, 2)
        result.cryo_petro_rate = round(result.cryo_petro_rate, 2)
        result.cryo_io_ratio = round(result.cryo_io_ratio, 6)
        result.cryo_quality = round(result.cryo_quality, 4)
        result.output_q1 = round(result.output_q1, 2)
        result.output_q2 = round(result.output_q2, 2)
        result.output_q3 = round(result.output_q3, 2)
        result.output_q4 = round(result.output_q4, 2)
        result.output_q5 = round(result.output_q5, 2)
        result.recycled_q1 = round(result.recycled_q1, 2)
        result.recycler_quality = round(result.recycler_quality, 2)
    })


    return filteredResults
}


const generateBeaconCombinations = (): BeaconEffect[] => {
    const beaconCount = 4;
    const efficiencyModule = createEfficiencyModule(ModuleTier.L3, QualityLevel.LEGENDARY)
    const modules = [
        SpeedModuleRegistry.get(ModuleTier.L1, QualityLevel.LEGENDARY),
        SpeedModuleRegistry.get(ModuleTier.L2, QualityLevel.LEGENDARY),
        SpeedModuleRegistry.get(ModuleTier.L3, QualityLevel.LEGENDARY),
        SpeedModuleRegistry.get(ModuleTier.L1, QualityLevel.LEGENDARY),
        SpeedModuleRegistry.get(ModuleTier.L2, QualityLevel.LEGENDARY),
        SpeedModuleRegistry.get(ModuleTier.L3, QualityLevel.LEGENDARY),
        efficiencyModule, // efficiency module will act as "empty case"
    ]

    /**
     * beacons can only take 2 module slots, so limit the max to 2 combinations
     */
    const combinationsOfModules = [...powerset(modules, 2)]

    const beacons = [
        ...combinationsOfModules.map(moduleCombo => new Beacon(moduleCombo, QualityLevel.LEGENDARY)),
        new Beacon([efficiencyModule, efficiencyModule], QualityLevel.LEGENDARY) // adding one more beacon as stub
    ]
    const beaconEffectPowerSet = powerset(beacons, beaconCount).map(combination => BeaconEffect.fromBeacons(combination))
    const groupedBeaconEffects = groupBy(beaconEffectPowerSet, effect => [effect.speed, effect.quality])
    
    const beaconEffects = Object.values(groupedBeaconEffects).flatMap(duplicateBeaconEffects => {
        // prefer beacons with higher tier modules over lower tier
        const sortedEffects = orderBy(
            duplicateBeaconEffects, 
            effect => sumBy(effect.beacons.flatMap(beacon => beacon.modules), module => module.tier),
            "desc"
        )

        return sortedEffects[0]
    })

    return beaconEffects;
}

export const writeSulfurUpcyclerSimResultsToFile = async (path: string, results: SulfurUpcyclerSimResult[], writeMode: CsvWriteMode) => {

    const rows = orderBy(results, ['output_q2', 'cryo_io_ratio'], ['desc', 'desc'])

    await writeCsvFile({
            path: path,
            header: [
                {id: "cryo_module_prod_count", title: "cryo_module_prod_count"},
                {id: "cryo_module_quality_count", title: "cryo_module_quality_count"},
                {id: "cryo_petro_rate", title: "petroleum"},
                {id: "cryo_water_rate", title: "water"},
                {id: "cryo_io_ratio", title: "cryo_io_ratio"},
                {id: "cryo_beacon_1", title: "cryo_beacon_1"},
                {id: "cryo_beacon_2", title: "cryo_beacon_2"},
                {id: "cryo_beacon_3", title: "cryo_beacon_3"},
                {id: "cryo_beacon_4", title: "cryo_beacon_4"},
                {id: "rec_beacon_1", title: "rec_beacon_1"},
                {id: "rec_beacon_2", title: "rec_beacon_2"},
                {id: "rec_beacon_3", title: "rec_beacon_3"},
                {id: "rec_beacon_4", title: "rec_beacon_4"},
                {id: "output_q1", title: "output_q1"},
                {id: "output_q2", title: "output_q2"},
                {id: "output_q3", title: "output_q3"},
                {id: "output_q4", title: "output_q4"},
                {id: "output_q5", title: "output_q5"},
                {id: "recycler_modules", title: "recycler_modules"},
                {id: "recycled_q1", title: "recycled_q1"},
                {id: "cryo_production_speed", title: "cryo_production_speed"},
                {id: "cryo_quality", title: "cryo_quality"},
                {id: "recycler_quality", title: "recycler_quality"},
            ],
            rows: rows,
            writeMode: writeMode
        }
    )
}