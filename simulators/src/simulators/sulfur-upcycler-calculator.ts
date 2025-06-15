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
    recycler_count: number;
    recycler_loops: number;
    cryo_production_speed: number;
    cryo_water_rate: number;
    cryo_petro_rate: number;
    cryo_io_ratio: number;
    cryo_quality: number;
    cryo_beacon_modules?: string;
    cryo_beacon_count: number;
    rec_beacon_modules?: string;
    recycler_beacon_count: number;
    recycler_modules: string;
    output_q1: number;
    output_q2: number;
    output_q3: number;
    output_q4: number;
    output_q5: number;
    cryo_q1_output: number;
    recycler_max_input_rate: number;
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

    const simulationsToRun = beaconEffects.length * beaconEffects.length * cryogenicPlantModuleCombinations.length * recyclerModuleCombos.length
    let simulationCount = 0;

    const results: SulfurUpcyclerSimResult[] = []

    for(const cryoBeaconEffect of beaconEffects) {
        for(const reyclerBeaconEffect of beaconEffects) {
            for (const cryoModules of cryogenicPlantModuleCombinations) {
                for (const recyclerModules of recyclerModuleCombos) {

                    simulationCount++
                    console.log(`running simulation ${simulationCount} of ${simulationsToRun}`)
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

                        const cryogenicPlantOutputRate = productionRateSystem.computeOutputRate(cryogenicPlant)
                        const cryogenicPlantInputRate = productionRateSystem.computeInputRate(cryogenicPlant)

                        try {

                            const numberOfRecyclersNeeded = productionRateSystem.entitiesRequiredToConsumeInputFrom(Sulfur, cryogenicPlant, recycler)

                            if (numberOfRecyclersNeeded > 1) {
                                recycler.multiplyOutputRateBy(1 / numberOfRecyclersNeeded)
                            }

                            const q1LoopEndCondition = 4; // 75% destruction on 4 items will yield 0-1 item which is negligible
                            const recursiveRecycleOutput = productionRateSystem.recycleFromProducerRecursively(cryogenicPlant, recycler, Sulfur, q1LoopEndCondition)
                            const combinedOutput = recursiveRecycleOutput.outputRate.rateMap;
                            const recursiveRecycleOutputPasses = recursiveRecycleOutput.passes;

                            const recyclerMaxInputRate = productionRateSystem.computeInputRate(recycler).find(it => it.item == Sulfur)!!


                            const recycledRate = cryogenicPlantOutputRate[0].rateMap[QualityLevel.COMMON].rate

                            const petroleumRate = cryogenicPlantInputRate.find(it => it.item == PatroleumGas)?.rate ?? 0
                            const totalRate = totalRateFromRateMap(cryogenicPlantOutputRate[0].rateMap)

                            const ioRate = totalRate / petroleumRate

                            results.push({
                                cryo_module_prod_count: cryogenicPlant.modules.filter(it => it.type == ModuleType.PRODUCTIVITY).length,
                                cryo_module_quality_count: cryogenicPlant.modules.filter(it => it.type == ModuleType.QUALITY).length,
                                cryo_beacon_modules: modulesToString(cryoBeaconEffect.beacons.flatMap(it => it.modules)),
                                cryo_petro_rate: cryogenicPlantInputRate.find(it => it.item == PatroleumGas)?.rate ?? 0,
                                cryo_water_rate: cryogenicPlantInputRate.find(it => it.item == Water)?.rate ?? 0,
                                cryo_beacon_count: cryoBeaconEffect.beacons.length,
                                cryo_io_ratio: ioRate,
                                rec_beacon_modules: modulesToString(reyclerBeaconEffect.beacons.flatMap(beacon => beacon.modules)),
                                recycler_beacon_count: reyclerBeaconEffect.beacons.length,
                                recycler_modules: recyclerModules[0].type,
                                output_q1: combinedOutput.Q1.rate,
                                output_q2: combinedOutput.Q2.rate,
                                output_q3: combinedOutput.Q3.rate,
                                output_q4: combinedOutput.Q4.rate,
                                output_q5: combinedOutput.Q5.rate,
                                cryo_q1_output: recycledRate,
                                recycler_max_input_rate: recyclerMaxInputRate.rate,
                                cryo_production_speed: cryoProductionSpeed,
                                cryo_quality: CompositeEffect.fromEffects(cryogenicPlant.effects).quality * 100, // percent
                                recycler_quality: CompositeEffect.fromEffects(recycler.effects).quality * 100, // percent
                                recycler_count: numberOfRecyclersNeeded,
                                recycler_loops: recursiveRecycleOutputPasses
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
        const filteredResults = results
            // ignore if the recycler has to have an inserter swing over 3 times to destroy common materials
            .filter(result => result.recycler_loops <= 3)
        // prefer a higher sulfur yield per liquid input first then minimize number of beacons used
        const sortedResults = orderBy(filteredResults, ["cryo_q1_output", "recycler_beacon_count"], ["asc", "asc"])
        return sortedResults[0]
    }).filter(result => 
        result.cryo_petro_rate > 200
    )

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
        result.cryo_q1_output = round(result.cryo_q1_output, 2)
        result.recycler_quality = round(result.recycler_quality, 2)
        result.recycler_max_input_rate = round(result.recycler_max_input_rate, 2)
    })


    return filteredResults
}

const modulesToString = (modules: Module[]): string => {
    const groupedModules = groupBy(modules, it => it.name)
    const sortedNames = Object.keys(groupedModules)
    const nameToCount = new Map(Object.entries(groupedModules).map(([name, modules]) => ([name, modules.length])))
    return  sortedNames.map(name => `${name} (x${nameToCount.get(name)})`).join(" | ")
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

    const rows = orderBy(results, ['output_q2'], ['desc'])

    await writeCsvFile({
            path: path,
            header: [
                {id: "cryo_module_prod_count", title: "cryo_module_prod_count"},
                {id: "cryo_module_quality_count", title: "cryo_module_quality_count"},
                {id: "recycler_count", title: "recycler_count"},
                {id: "recycler_loops", title: "recycler_loops"},
                {id: "recycler_modules", title: "recycler_modules"},
                {id: "cryo_q1_output", title: "cryo_q1_output"},
                {id: "recycler_max_input_rate", title: "recycler_max_input_rate"},
                {id: "cryo_petro_rate", title: "petroleum"},
                {id: "cryo_water_rate", title: "water"},
                {id: "cryo_io_ratio", title: "cryo_io_ratio"},
                {id: "cryo_beacon_modules", title: "cryo_beacon_modules"},
                {id: "rec_beacon_modules", title: "rec_beacon_modules"},
                {id: "output_q2", title: "output_q2"},
                {id: "output_q3", title: "output_q3"},
                {id: "output_q4", title: "output_q4"},
                {id: "output_q5", title: "output_q5"},
                {id: "cryo_production_speed", title: "cryo_production_speed"},
                {id: "cryo_quality", title: "cryo_quality"},
                {id: "recycler_quality", title: "recycler_quality"},

            ],
            rows: rows,
            writeMode: writeMode
        }
    )
}