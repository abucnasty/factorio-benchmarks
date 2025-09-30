const fs = require("fs/promises")
const assert = require("node:assert")

const PATHS = {
    VERBOSE_METRIC_SUMMARY: "./summary_verbose_metrics_table.csv",
    METRIC_CORRELATIONS_OUTPUT: "./metric_correlations.csv",
    METRIC_TO_ENTITY_OUTPUT: "./design_metrics_and_key_entities.csv",
    ENTITY_COUNT_REPORT: "./entity_counts.csv"
}

const designInfo = [
    { designName: "design_00_baseline", speed: 240, },
    { designName: "design_01_undertow", speed: 480, },
    { designName: "design_08_lady_meyneth", speed: 240, },
    { designName: "design_09_jobo", speed: 240, },
    { designName: "design_12_phlap", speed: 240, },
    { designName: "design_14_abucnasty", speed: 240, },
    { designName: "design_18_lady_meyneth", speed: 240, },
    { designName: "design_27_geist_fixed", speed: 480, },
    { designName: "design_35_henryjk", speed: 240, },
    { designName: "design_hybrid_01_abucnasty", speed: 240 },
    { designName: "design_hybrid_03_thaeln_abucnasty", speed: 240 },
    { designName: "design_hybrid_04_thaeln_abucnasty", speed: 240 },
    { designName: "design_hybrid_05_thaeln_abucnasty", speed: 480 },
    { designName: "design_hybrid_06_abucnasty", speed: 240 },
]

const IGNORED_ENTITIES = new Set([
    "ee_infinity_chest",
    "express_loader",
    "substation"
])


const PERFORMANCE_METRICS = {
    WHOLE_UPDATE: "metric_whole_update",
    CONTROL_BEHAVIOR_UPDATE: "metric_control_behavior_update",
    TRANSPORT_LINES_UPDATE: "metric_transport_lines_update",
    ELECTRIC_HEAT_FLUID_CIRCUIT_UPDATE: "metric_electric_heat_fluid_circuit_update",
    CIRCUIT_UPDATE: "metric_circuit_update",
    ELECTRIC_NETWORK_UPDATE: "metric_electric_network_update",
    FLUID_FLOW_UPDATE: "metric_fluid_flow_update",
    ENTITY_UPDATE: "metric_entity_update",
    TRAINS: "metric_trains",
    SPACE_PLATFORMS: "metric_space_platforms",
}

const METRICS_TO_INCLUDE = [
    PERFORMANCE_METRICS.WHOLE_UPDATE,
    PERFORMANCE_METRICS.CONTROL_BEHAVIOR_UPDATE,
    PERFORMANCE_METRICS.TRANSPORT_LINES_UPDATE,
    PERFORMANCE_METRICS.ELECTRIC_HEAT_FLUID_CIRCUIT_UPDATE,
    PERFORMANCE_METRICS.CIRCUIT_UPDATE,
    PERFORMANCE_METRICS.ELECTRIC_NETWORK_UPDATE,
    PERFORMANCE_METRICS.FLUID_FLOW_UPDATE,
    PERFORMANCE_METRICS.ENTITY_UPDATE,
    PERFORMANCE_METRICS.TRAINS,
    PERFORMANCE_METRICS.SPACE_PLATFORMS,
];


const allEntityTags = new Set()

// returns a map of design name to entities
async function getEntityCountsByDesign() {
    const text = await fs.readFile(PATHS.ENTITY_COUNT_REPORT, { encoding: "utf-8" })

    const rows = text.split("\n").map(it => it.split(","))

    const [headers, ...dataRows] = rows

    const [_, ...designNames] = headers

    const designSpeedMultiplier = new Map()

    const max_speed = Math.max(...designInfo.map(it => it.speed))

    designNames.forEach(designName => {
        const info = designInfo.find(it => it.designName == designName)
        if (!info) {
            console.warn(`${designName} not found`)
            return;
        }
        const speed = info.speed
        const multiplier = max_speed / speed
        designSpeedMultiplier.set(designName, multiplier)
    })


    const data = new Map()

    dataRows
        .filter(([entityTag]) => !IGNORED_ENTITIES.has(entityTag))
        .forEach((row) => {
            const [entityTag, ...values] = row
            const numericValues = values.map(it => Number(it))

            allEntityTags.add(entityTag)

            designNames.forEach((designName, index) => {
                const counts = data.get(designName) ?? {}
                let multiplier = designSpeedMultiplier.get(designName)
                if(entityTag.startsWith("beacons_per")) {
                    multiplier = 1
                }
                if(entityTag.startsWith("average")) {
                    multiplier = 1
                }
                counts[entityTag] = numericValues[index] * multiplier
                data.set(designName, counts)
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
    const text = await fs.readFile(PATHS.VERBOSE_METRIC_SUMMARY, { encoding: "utf-8" })
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
        Object.keys(stats)
            .forEach(metricName => {
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

    const performanceMetrics = METRICS_TO_INCLUDE

    // Entity types
    const entityTypes = [...allEntityTags.values()].map(toSnakeCase)

    const comparisonKeys = [...entityTypes]
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

    designs.forEach(designName => {

        const designData = {}
        designData.designName = designName
        Object.assign(designData, verboseMetrics.get(designName))
        Object.assign(designData, designEntities.get(designName))

        const info = designInfo.find(it => it.designName == designName)
        assert(info !== undefined, `design ${designName} not found`)

        designData.speed = info.speed


        const snakeData = {}

        Object.keys(designData).forEach(key => {
            const key_snake = toSnakeCase(key)
            snakeData[key_snake] = designData[key]
        })

        summaryData.push(snakeData)
    })

    const correlations = findCorrelations(summaryData)

    await writeCorrelationsToCsv(correlations, PATHS.METRIC_CORRELATIONS_OUTPUT)



    const csvRows = []

    summaryData.sort((a, b) => Number(a.whole_update) - Number(b.whole_update))

    const designNames = summaryData.map(it => it.design_name)
    const header = ["design", ...designNames]

    csvRows.push(header)

    const parameters = Object.keys(summaryData[0]).filter(it => it != "design_name")


    parameters.forEach(parameter => {
        csvRows.push([parameter, ...summaryData.map(it => it[parameter])])
    })
    await fs.writeFile(PATHS.METRIC_TO_ENTITY_OUTPUT, csvRows.map(it => it.join(",")).join("\n"))
}


main()