import { miningProdSim } from "./simulators/mining-prod-calculator"
import { CsvWriteMode } from "./utils"

const main = async () => {
    await miningProdSim({
        minMiningProdLevel: 0,
        maxMiningProdLevel: 50000,
        numberOfMiners: 1,
        maxVoidedPerSecond: 120*12,
        targetQ2Rate: 240, // per second
        saveFileName: "./q2-tungsten-miner-sim.csv",
        writeMode: CsvWriteMode.REPLACE,
        baseRate: 2.5/5
    })

    await miningProdSim({
        minMiningProdLevel: 0,
        maxMiningProdLevel: 50000,
        numberOfMiners: 2,
        maxVoidedPerSecond: 120*12,
        targetQ2Rate: 240, // per second
        saveFileName: "./q2-tungsten-miner-sim.csv",
        writeMode: CsvWriteMode.APPEND,
        baseRate: 2.5/5
    })


    await miningProdSim({
        minMiningProdLevel: 0,
        maxMiningProdLevel: 50000,
        numberOfMiners: 1,
        maxVoidedPerSecond: 120*12,
        targetQ2Rate: 240, // per second
        saveFileName: "./q2-miner-sim.csv",
        writeMode: CsvWriteMode.REPLACE,
        baseRate: 2.5
    })

    await miningProdSim({
        minMiningProdLevel: 0,
        maxMiningProdLevel: 50000,
        numberOfMiners: 2,
        maxVoidedPerSecond: 120*12,
        targetQ2Rate: 240, // per second
        saveFileName: "./q2-miner-sim.csv",
        writeMode: CsvWriteMode.APPEND,
        baseRate: 2.5
    })
}


main()