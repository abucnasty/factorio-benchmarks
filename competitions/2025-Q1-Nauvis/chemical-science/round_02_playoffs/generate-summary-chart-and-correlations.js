const fs = require("fs/promises")


const keyEntities = new Map([
    ['beacon', 'beacon'],
    ['stack-inserter', 'stack-inserter'],
    ['turbo-transport-belt', 'turbo-transport-belt'],
    // ['turbo-underground-belt', 'turbo-underground-belt'],
    ['assembling-machine-3', 'assembling-machine'],
    ['foundry', 'foundry'],
    ['decider-combinator', 'decider-combinator'],
    ['cryogenic-plant', 'cryogenic-plant'],
    ['chemical-plant', 'chemical-plant'],
    // ['medium-electric-pole', 'power-pole'],
    ['constant-combinator', 'constant-combinator'],
    // ['substation', 'substation'],
    ['steel-chest', 'steel-chest'],
    ['oil-refinery', 'oil-refinery'],
    ['cargo-wagon', 'cargo-wagon'],
    ['pump', 'pump'],
    ['small-lamp', 'small-lamp'],
    ['electromagnetic-plant', 'em-plant'],
    ['pipe', 'pipe'],
    ['big-mining-drill', 'big-mining-drill']
]);

const designTags = [
    { designName: "00_baseline", speed: 240, tags: "Belt Based, Basic Oil" },
    { designName: "01_undertow", speed: 480, tags: "Direct Insertion, Molten Fluid Bus, Basic Oil" },
    { designName: "03_swiftdeath007", speed: 240, tags: "Direct Insertion, Molten Fluid Bus, Basic Oil" },
    { designName: "04_swiftdeath007", speed: 240, tags: "Direct Insertion, Molten Fluid Bus, Basic Oil" },
    { designName: "05_derantrix", speed: 480, tags: "Direct Insertion, Molten Fluid Bus, Basic Oil" },
    { designName: "06_imp", speed: 240, tags: "Direct Insertion, Basic Oil" },
    { designName: "08_lady_meyneth", speed: 240, tags: "Direct Insertion, Molten Fluid Bus, Basic Oil, Coal Direct Insertion Mining" },
    { designName: "09_jobo", speed: 240, tags: "Direct Insertion, Recipe Switching, Molten Fluid Bus, Basic Oil" },
    { designName: "11_theflyingcurryfish154", speed: 960, tags: "Molten Fluid Bus, Basic Oil, Direct Insertion, Belt Based" },
    { designName: "12_phlap", speed: 240, tags: "Direct Insertion, Molten Fluid Bus, Basic Oil" },
    { designName: "13_phlap", speed: 240, tags: "Recipe Switching, Basic Oil" },
    { designName: "14_abucnasty", speed: 240, tags: "Direct Insertion, Recipe Switching, Belt Based, Molten Fluid Bus, Basic Oil" },
    { designName: "15_yuu", speed: 240, tags: "Direct Insertion, Recipe Switching, Molten Fluid Bus, Basic Oil, Trains" },
    { designName: "16_yuu", speed: 240, tags: "Direct Insertion, Recipe Switching, Molten Fluid Bus, Basic Oil, Silo" },
    { designName: "17_henryjk", speed: 240, tags: "Direct Insertion, Recipe Switching, Molten Fluid Bus, Basic Oil" },
    { designName: "18_lady_meyneth", speed: 240, tags: "Direct Insertion, Molten Fluid Bus, Basic Oil" },
    { designName: "19_werezwolf", speed: 240, tags: "Direct Insertion, Molten Fluid Bus, Basic Oil" },
    { designName: "20_toda1", speed: 240, tags: "Direct Insertion, Molten Fluid Bus, Advanced Oil" },
    { designName: "22_mcmayhem57", speed: 240, tags: "Direct Insertion, Molten Fluid Bus, Basic Oil" },
    { designName: "23_mcmayhem57", speed: 240, tags: "Direct Insertion, Molten Fluid Bus, Basic Oil" },
    { designName: "26_mrcooki4", speed: 480, tags: "Direct Insertion, Basic Oil, Metal Ore Inputs" },
    { designName: "27_geist", speed: 480, tags: "Direct Insertion, Molten Fluid Bus, Basic Oil, Engine DI" },
    { designName: "28_geist", speed: 480, tags: "Direct Insertion, Recipe Switching, Molten Fluid Bus, Basic Oil" },
    { designName: "29_geist", speed: 480, tags: "Direct Insertion, Recipe Switching, Molten Fluid Bus, Basic Oil" },
    { designName: "30_reja", speed: 240, tags: "Molten Fluid Bus, Basic Oil, belt based" },
    { designName: "31_minebuilder", speed: 240, tags: "Basic Oil, Metal Ore Inputs" },
    { designName: "32_reja", speed: 240, tags: "Molten Fluid Bus, Basic Oil, belt based" },
    { designName: "34_osboz", speed: 480, tags: "Basic Oil, Metal Ore Inputs" },
    { designName: "35_henryjk", speed: 240, tags: "Direct Insertion, Recipe Switching, Molten Fluid Bus, Basic Oil" },
].map(it => (
    {
        ...it,
        tags: it.tags = it.tags.split(",").map(it => toSnakeCase(it).trim()).filter(it => it != "")
    }
))

const designDetails = [
    {
        designName: "18_lady_meyneth",
        science_assembler_beacons: 11,
        engine_unit_beacons: 5,
        output_inserter_enable_gate: 16,
        output_inserter_working_condition: true,
        output_inserter_set_filter: true
    },
    {
        designName: "14_abucnasty",
        science_assembler_beacons: 12,
        engine_unit_beacons: 12,
        output_inserter_enable_gate: 16,
        output_inserter_working_condition: false,
        output_inserter_set_filter: false

    },
    {
        designName: "12_phlap",
        science_assembler_beacons: 11,
        engine_unit_beacons: 3,
        output_inserter_enable_gate: 16,
        output_inserter_working_condition: true,
        output_inserter_set_filter: true

    },
    {
        designName: "08_lady_meyneth",
        science_assembler_beacons: 11,
        engine_unit_beacons: 5,
        output_inserter_enable_gate: 16,
        output_inserter_working_condition: true,
        output_inserter_set_filter: true

    },
    {
        designName: "35_henryjk",
        science_assembler_beacons: 8,
        engine_unit_beacons: 7,
        output_inserter_enable_gate: 16,
        output_inserter_working_condition: false,
        output_inserter_set_filter: false

    },
    {
        designName: "28_geist",
        science_assembler_beacons: 10,
        engine_unit_beacons: 7,
        output_inserter_enable_gate: 16,
        output_inserter_working_condition: false,
        output_inserter_set_filter: false

    },
    {
        designName: "27_geist",
        science_assembler_beacons: 11,
        engine_unit_beacons: 8,
        output_inserter_enable_gate: 16,
        output_inserter_working_condition: false,
        output_inserter_set_filter: false

    },
    {
        designName: "01_undertow",
        science_assembler_beacons: 11,
        engine_unit_beacons: 7,
        output_inserter_enable_gate: 0,
        output_inserter_working_condition: false,
        output_inserter_set_filter: false

    },
    {
        designName: "13_phlap",
        science_assembler_beacons: 12,
        engine_unit_beacons: 12,
        output_inserter_enable_gate: 16,
        output_inserter_working_condition: true,
        output_inserter_set_filter: true
    },
    {
        designName: "09_jobo",
        science_assembler_beacons: 10,
        engine_unit_beacons: 10,
        output_inserter_enable_gate: 8,
        output_inserter_working_condition: true,
        output_inserter_set_filter: false

    },
    {
        designName: "26_mrcooki4",
        science_assembler_beacons: 8,
        engine_unit_beacons: 6,
        output_inserter_enable_gate: 8,
        output_inserter_working_condition: true,
        output_inserter_set_filter: false

    },
    {
        designName: "32_reja",
        science_assembler_beacons: 11,
        engine_unit_beacons: 7,
        output_inserter_enable_gate: 8,
        output_inserter_working_condition: false,
        output_inserter_set_filter: false

    },
    {
        designName: "29_geist",
        science_assembler_beacons: 8,
        engine_unit_beacons: 12,
        output_inserter_enable_gate: 16,
        output_inserter_working_condition: false,
        output_inserter_set_filter: false

    },
    {
        designName: "30_reja",
        science_assembler_beacons: 11,
        engine_unit_beacons: 7,
        output_inserter_enable_gate: 8,
        output_inserter_working_condition: false,
        output_inserter_set_filter: false

    },
    {
        designName: "06_imp",
        science_assembler_beacons: 10,
        engine_unit_beacons: 3,
        output_inserter_enable_gate: 0,
        output_inserter_working_condition: false,
        output_inserter_set_filter: false
    },
    {
        designName: "23_mcmayhem57",
        science_assembler_beacons: 7,
        engine_unit_beacons: 4,
        output_inserter_enable_gate: 8,
        output_inserter_working_condition: false,
        output_inserter_set_filter: false
    },
    {
        designName: "05_derantrix",
        science_assembler_beacons: 9,
        engine_unit_beacons: 8,
        output_inserter_enable_gate: 8,
        output_inserter_working_condition: false,
        output_inserter_set_filter: false
    },
    {
        designName: "22_mcmayhem57",
        science_assembler_beacons: 9,
        engine_unit_beacons: 6,
        output_inserter_enable_gate: 8,
        output_inserter_working_condition: false,
        output_inserter_set_filter: false
    },
    {
        designName: "34_osboz",
        science_assembler_beacons: 8,
        engine_unit_beacons: 7,
        output_inserter_enable_gate: 12,
        output_inserter_working_condition: true,
        output_inserter_set_filter: false
    },
    {
        designName: "11_theflyingcurryfish154",
        science_assembler_beacons: 11,
        engine_unit_beacons: 7,
        output_inserter_enable_gate: 8,
        output_inserter_working_condition: true,
        output_inserter_set_filter: false
    },
    {
        designName: "00_baseline",
        science_assembler_beacons: 10,
        engine_unit_beacons: 10,
        output_inserter_enable_gate: 0,
        output_inserter_working_condition: false,
        output_inserter_set_filter: false
    },
].map(it => {
    return {
        ...it,
        output_inserter_working_condition: Number(it.output_inserter_working_condition),
        output_inserter_set_filter: Number(it.output_inserter_set_filter)
    }
})

const allTags = Array.from(
    new Set(designTags.flatMap(it => it.tags))
)


const allEntityTags = new Set()

// returns a map of design name to entities
async function getEntityCountsByDesign() {
    const text = await fs.readFile("./entity_counts.csv", { encoding: "utf-8" })

    const rows = text.split("\n").map(it => it.split(","))

    const [headers, ...dataRows] = rows

    const [_, ...designs] = headers

    const designSpeedMultiplier = new Map()

    const designNamesStripped = designs.map(it => it.replace("design_", ""))

    designNamesStripped.forEach(design => {
        const designInfo = designTags.find(it => it.designName == design)
        if (!designInfo) {
            console.warn(`${design} not found`)
            return;
        }
        const speed = designInfo.speed
        const multiplier = 1920 / speed
        designSpeedMultiplier.set(design, multiplier)
    })


    const data = new Map()

    dataRows
        // .filter(row => {
        //     return keyEntities.has(row[0])
        // })
        .forEach((row) => {
            const [entityTag, ...values] = row
            const numericValues = values.map(it => Number(it))

            allEntityTags.add(entityTag)

            designNamesStripped.forEach((design, index) => {
                const counts = data.get(design) ?? {}
                counts[entityTag] = numericValues[index] * designSpeedMultiplier.get(design)
                data.set(design, counts)
            })
        })

    return data
}

function average(array) {
    return array.reduce((sum, val) => sum + val, 0) / array.length;
}

function nanoToMicro(nano) {
    return nano / 1000
}

function roundTo(value, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}

function toSnakeCase(str) {
    return str
        // Convert camelCase to snake_case
        .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
        // Convert kebab-case to snake_case
        .replace(/-/g, "_")
        // Lowercase the result
        .toLowerCase();
}



async function getSummaryVerboseMetricsPerDesign() {
    const text = await fs.readFile("./summary_verbose_metrics_table.csv", { encoding: "utf-8" })
    const rows = text.split("\n").map(it => it.split(","))
    const headers = rows[0]

    const [fileName, run, ...metrics] = headers

    const metricNames = metrics.map(metric => `metric_${metric.replace("_average", "")}`)

    const perRunStats = new Map()

    rows
        .forEach((row, index) => {
            if (index == 0) { // skip header
                return;
            }
            if (row == "") { // ignore blank end of file line
                return;
            }
            const [designName, runNumberText, ...textValues] = row

            const stats = perRunStats.get(designName) ?? {}

            metricNames.forEach((metricName, index) => {
                const values = stats[metricName] ?? []
                values.push(Number(textValues[index]))
                stats[metricName] = values
            })

            perRunStats.set(designName, stats)

        })

    const designToAverageStat = new Map()

    perRunStats.forEach((stats, designName) => {
        const aggregateStat = {}
        Object.keys(stats).forEach(metricName => {
            aggregateStat[metricName] = roundTo(nanoToMicro(average(stats[metricName])), 6)
        })

        designToAverageStat.set(designName, aggregateStat)
    })

    return designToAverageStat
}

function calculatePearsonCorrelation(x, y) {
    if (x.length !== y.length) {
        throw new Error("Arrays must have the same length.");
    }

    const n = x.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;
    let sumY2 = 0;

    for (let i = 0; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
        sumXY += x[i] * y[i];
        sumX2 += x[i] * x[i];
        sumY2 += y[i] * y[i];
    }

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    if (denominator === 0) {
        return 0; // Avoid division by zero, indicates no variation in one or both datasets
    }

    return numerator / denominator;
}

function findCorrelations(data) {

    const performanceMetrics = [
        "metric_whole_update",
        "metric_control_behavior_update",
        "metric_transport_lines_update",
        // "metric_electric_heat_fluid_circuit_update",
        "metric_electric_network_update",
        "metric_fluid_flow_update",
        "metric_entity_update",
        "metric_trains",
        "metric_space_platforms",
    ];



    // Entity types
    const entityTypes = [...allEntityTags.values()].map(toSnakeCase)
    const tags = [...allTags]
    const designDetailKeys = Object.keys(designDetails[0]).filter(it => it != "designName")

    const comparisonKeys = [...entityTypes, ...tags, ...designDetailKeys]
    const correlations = [];

    performanceMetrics.forEach(metric => {
        const metricValues = data.map(d => d[metric]);

        comparisonKeys.forEach(key => {
            const keyValues = data.map(d => d[key]);
            const correlation = calculatePearsonCorrelation(metricValues, keyValues);

            const strength = Math.abs(correlation)

            if (strength >= 0.3) { // Only show meaningful correlations
                let range = "Low"

                if (strength >= 0.9) {
                    range = "Very High"
                } else if (strength >= 0.7) {
                    range = "High"
                } else if (strength >= 0.5) {
                    range = "Moderate"
                } else if (strength >= 0.3) {
                    range = "Low"
                }

                let polarity = correlation > 0 ? "increase" : "decrease"

                correlations.push({
                    metric,
                    property: key,
                    correlation: correlation,
                    strength: strength,
                    range: range,
                    impact: polarity

                });
            }
        });
    });

    // Sort by correlation strength
    correlations.sort((a, b) => b.strength - a.strength)

    return correlations
}

async function writeCorrelationsToCsv(correlations, path) {
    const headers = Object.keys(correlations[0])

    const rows = correlations.map(correlation => headers.map(header => correlation[header]).join(","))

    const data = [
        headers.join(","),
        ...rows.map(it => it.replace("metric_", ""))
    ]

    await fs.writeFile(path, data.join("\n"))

}

const main = async () => {
    const designEntities = await getEntityCountsByDesign()
    const verboseMetrics = await getSummaryVerboseMetricsPerDesign()

    const designs = [...verboseMetrics.keys()]


    const summaryData = []

    designs.forEach(design => {

        const designData = {}
        designData.designName = design
        Object.assign(designData, verboseMetrics.get(design))
        Object.assign(designData, designEntities.get(design))

        const details = designDetails.find(it => it.designName == design)

        Object.assign(designData, details)

        const designInfo = designTags.find(it => it.designName == design)

        designData.speed = designInfo.speed

        allTags.forEach(tag => {
            const hasTag = (designInfo.tags.find(it => it == tag)) !== undefined
            if (hasTag) {
                designData[tag] = 1
            } else {
                designData[tag] = 0
            }
        })


        const snakeData = {}

        Object.keys(designData).forEach(key => {
            let tempkey = key
            if (keyEntities.has(key)) {
                tempkey = keyEntities.get(key)
            }
            const key_snake = toSnakeCase(tempkey)
            snakeData[key_snake] = designData[key]
        })

        summaryData.push(snakeData)
    })

    const correlations = findCorrelations(summaryData)

    await writeCorrelationsToCsv(correlations, "design_metric_correlations.csv")



    const csvRows = []

    const headers = Object.keys(summaryData[0])

    csvRows.push(headers.join(","))

    summaryData.sort((a, b) => Number(a.whole_update) - Number(b.whole_update))

    csvRows.push(...summaryData.map(designSummary => Object.values(designSummary).map(it => `${it}`).join(",")))
    await fs.writeFile("design_metrics_and_key_entities.csv", csvRows.join("\n"))
}


main()