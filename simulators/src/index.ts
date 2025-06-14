import { orderBy } from "lodash"
import { miningProdSim, MiningProdSimResult, writeMiningProdResultsToFile } from "./simulators/mining-prod-calculator"
import { CsvWriteMode } from "./utils"
import { IronOre, TungstenOre } from "./recipes"
import { sulfurUpcyclerSim, writeSulfurUpcyclerSimResultsToFile } from "./simulators/sulfur-upcycler-calculator"

const runMiningProdSim = async () => {

    const targetQ2Rates = [60, 120, 240]

    const normalOreResults: MiningProdSimResult[][] = []

    for (let numberOfMiners = 1; numberOfMiners <= 4; numberOfMiners++) {
        for (const targetRate of targetQ2Rates) {
            normalOreResults.push(await miningProdSim({
                minMiningProdLevel: 0,
                maxMiningProdLevel: 50000,
                numberOfMiners: numberOfMiners,
                maxVoidedPerSecond: 120*12,
                targetQ2Rate: targetRate, // per second
                item: IronOre
            }))
        }
    }

    const sortedResults = orderBy(normalOreResults.flatMap(it => it), ['number_of_miners','mining_prod_level'], ['asc', 'desc'])

    await writeMiningProdResultsToFile("./q2-miner-sim-verbose.csv", sortedResults, CsvWriteMode.REPLACE)

    const tungstenOreResults: MiningProdSimResult[][] = []

    // tungsten
    for (let numberOfMiners = 1; numberOfMiners <= 4; numberOfMiners++) {
        for (const targetRate of targetQ2Rates) {
            tungstenOreResults.push(await miningProdSim({
                minMiningProdLevel: 0,
                maxMiningProdLevel: 50000,
                numberOfMiners: numberOfMiners,
                maxVoidedPerSecond: 120*12,
                targetQ2Rate: targetRate, // per second
                item: TungstenOre
            }))
        }
    }

    const sortedTungstenResults = orderBy(tungstenOreResults.flatMap(it => it), ['number_of_miners','mining_prod_level'], ['asc', 'desc'])

    await writeMiningProdResultsToFile(
        "./q2-tungsten-miner-sim-verbose.csv",
        sortedTungstenResults,
        CsvWriteMode.REPLACE
    )
}


// runMiningProdSim()


const runSulfurUpcyclerSim = async () => {
    const results = await sulfurUpcyclerSim({})
    
    await writeSulfurUpcyclerSimResultsToFile(
        "./q2-sulfur.csv",
        results,
        CsvWriteMode.REPLACE
    )
}

runSulfurUpcyclerSim()