import { CsvWriteMode, writeCsvFile } from "../utils/csv"
import { Item } from "../recipes"
import { orderBy } from "lodash"

export interface MiningProdSimProps {
    minMiningProdLevel: number
    maxMiningProdLevel: number
    numberOfMiners: number
    maxVoidedPerSecond: number
    targetQ2Rate: number
    item: Item,
}

export interface MiningProdSimResult {
    number_of_miners: number
    mining_prod_level: number
    beacon_1: string
    beacon_2: string
    beacon_3: string
    rate_Q1: number
    rate_Q2: number
    rate_Q3: number
    rate_Q4: number
    rate_Q5: number
    rate_voided: number
}

export const miningProdSim = async (props: MiningProdSimProps): Promise<MiningProdSimResult[]> => {

    throw Error("not implemented after refactor")

    // const {
    //     minMiningProdLevel,
    //     maxMiningProdLevel,
    //     numberOfMiners,
    //     maxVoidedPerSecond,
    //     targetQ2Rate,
    //     item
    // } = props;


    // const qualityModule = QualityModuleRegistry.get(ModuleTier.L3, QualityLevel.LEGENDARY)
    // const efficiencyModule = createEfficiencyModule(ModuleTier.L3, QualityLevel.LEGENDARY)

    // const modules = [
    //     SpeedModuleRegistry.get(ModuleTier.L1, QualityLevel.LEGENDARY),
    //     SpeedModuleRegistry.get(ModuleTier.L2, QualityLevel.LEGENDARY),
    //     SpeedModuleRegistry.get(ModuleTier.L3, QualityLevel.LEGENDARY),
    //     SpeedModuleRegistry.get(ModuleTier.L1, QualityLevel.LEGENDARY),
    //     SpeedModuleRegistry.get(ModuleTier.L2, QualityLevel.LEGENDARY),
    //     SpeedModuleRegistry.get(ModuleTier.L3, QualityLevel.LEGENDARY),
    //     efficiencyModule, // efficiency module will act as "empty case"
    // ]

    // /**
    //  * beacons can only take 2 module slots, so limit the max to 2 combinations
    //  */
    // const combinationsOfModules = [...powerset(modules, 2)]


    // const beacons = [
    //     ...combinationsOfModules.map(moduleCombo => createBeacon(QualityLevel.LEGENDARY, moduleCombo)),
    //     createBeacon(QualityLevel.LEGENDARY, [efficiencyModule, efficiencyModule]) // adding one more beacon as stub
    // ]
    // const beaconEffectPowerSet = powerset(beacons, 3).map(combination => createBeaconEffect(combination))
    // const groupedBeaconEffects = groupBy(beaconEffectPowerSet, effect => [effect.speed, effect.quality])
    
    // const beaconEffects = Object.values(groupedBeaconEffects).flatMap(duplicateBeaconEffects => {
    //     // prefer beacons with higher tier modules over lower tier
    //     const sortedEffects = orderBy(
    //         duplicateBeaconEffects, 
    //         effect => sumBy(effect.beacons.flatMap(beacon => beacon.modules), slot => slot.module.tier),
    //         "desc"
    //     )

    //     return sortedEffects[0]
    // })

    // const results: MiningProdSimResult[] = []

    // for(const beaconEffect of beaconEffects) {
        
    //     for(let miningProdLevel = minMiningProdLevel; miningProdLevel < maxMiningProdLevel; miningProdLevel++) {
    //         const miningProductivity: ProductivityEffect = createMiningProductivityByLevel(miningProdLevel)
    //         const bigMiningDrill = createGenericMiningDrill({
    //             modules: [qualityModule, qualityModule, qualityModule, qualityModule],
    //             effects: [
    //                 beaconEffect,
    //                 miningProductivity
    //             ],
    //             item,
    //             miningSpeed: 2.5 * numberOfMiners
    //         })
    //         if (bigMiningDrill.productionRate.Q2 >= targetQ2Rate) {
    //             const beacons = beaconEffect.beacons
    //             const modulePairs = beacons.map(beacon => beacon.modules.map(({module}) => module.name))

    //             const productionRate = bigMiningDrill.productionRate
    //             const voidedRate = productionRate.Q1 + productionRate.Q3 + productionRate.Q4 + productionRate.Q5;
    //             if (voidedRate > maxVoidedPerSecond) {
    //                 break;
    //             }

    //             results.push(
    //                 {
    //                     number_of_miners: numberOfMiners,
    //                     mining_prod_level: miningProdLevel,
    //                     beacon_1: modulePairs[0]?.join("|"),
    //                     beacon_2: modulePairs[1]?.join("|"),
    //                     beacon_3: modulePairs[2]?.join("|"),
    //                     rate_Q1: productionRate.Q1,
    //                     rate_Q2: bigMiningDrill.productionRate.Q2,
    //                     rate_Q3: bigMiningDrill.productionRate.Q3,
    //                     rate_Q4: bigMiningDrill.productionRate.Q4,
    //                     rate_Q5: bigMiningDrill.productionRate.Q5,
    //                     rate_voided: round(productionRate.Q1 + productionRate.Q3 + productionRate.Q4 + productionRate.Q5, 2),
    //                 }
    //             )
    //             break;
    //         }
    //     }

    // }

    // console.log(`Found ${results.length} matching results`)

    // return results
}

export const writeMiningProdResultsToFile = async (path: string, results: MiningProdSimResult[], writeMode: CsvWriteMode) => {
    await writeCsvFile({
            path: path,
            header: [
                { id: "number_of_miners", title: "number_of_miners" },
                { id: "mining_prod_level", title: "mining_prod_level" },
                { id: "beacon_1", title: "beacon_1" },
                { id: "beacon_2", title: "beacon_2" },
                { id: "beacon_3", title: "beacon_3" },
                { id: "rate_Q2", title: "rate_Q2" },
                { id: "rate_Q1", title: "rate_Q1" },
                { id: "rate_Q3", title: "rate_Q3" },
                { id: "rate_Q4", title: "rate_Q4" },
                { id: "rate_Q5", title: "rate_Q5" },
                { id: "rate_voided", title: "rate_voided" },
            ],
            rows: orderBy(results, result => result.mining_prod_level, "asc"),
            writeMode: writeMode
        }
    )
}