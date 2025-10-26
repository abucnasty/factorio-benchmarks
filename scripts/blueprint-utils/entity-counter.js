const fs = require("fs");
const path = require("path");
const assert = require("node:assert")
const zlib = require("zlib");

// if you want to change the name of individual blueprints within a book, map them here...
const blueprintNameReplacements = new Map([
    ["foo", "bar"]
])

// Entity Sizes
const BUILDING_SIZES = {
    "assembling-machine-1": [3, 3],
    "assembling-machine-2": [3, 3],
    "assembling-machine-3": [3, 3],
    "electric-furnace": [3, 3],
    "stone-furnace": [2, 2],
    "steel-furnace": [2, 2],
    "oil-refinery": [5, 5],
    "chemical-plant": [3, 3],
    "foundry": [5, 5],
    "electromagnetic-plant": [4, 4],
    "cryogenic-plant": [5, 5],
};

const CHEST_SIZES = {
    "wooden-chest": [1, 1],
    "iron-chest": [1, 1],
    "steel-chest": [1, 1],
    "logistic-chest-requester": [1, 1],
    "logistic-chest-provider": [1, 1],
    "logistic-chest-buffer": [1, 1],
    "logistic-chest_storage": [1, 1],
    "cargo-wagon": [6, 2],
    "infinity-chest": [1, 1],
    "car": [3, 3],
};

const BELT_SIZES = {
    "turbo-splitter": [2, 1],
    "turbo-transport-belt": [1, 1],
    "turbo-underground-belt": [1, 1],
    "express-splitter": [2, 1],
    "express-transport-belt": [1, 1],
    "express-underground-belt": [1, 1],
    "fast-splitter": [2, 1],
    "fast-transport-belt": [1, 1],
    "fast-underground-belt": [1, 1],
    "splitter": [2, 1],
    "transport-belt": [1, 1],
    "underground-belt": [1, 1]
};

const INSERTER_SIZES = {
    "burner-inserter": [1, 1]
}

const ENTITY_SIZES = { ...BUILDING_SIZES, ...CHEST_SIZES, ...BELT_SIZES, ...INSERTER_SIZES };

const BEACON_RANGE = [9, 9]


// Entity Categories

const ENTITY_CATEGORIES = {
    ELECTRIC_INTERFACE: "electric_interface",
    FLUID_INTERFACE: "fluid_interface"
}


const createEntityMapByEntityNumber = (entities) => {
    const entityMap = new Map()

    entities.forEach(entity => {
        entityMap.set(entity.entity_number, entity)
    })

    return entityMap
}


// Circuit Networks

const WIRE_CODES = {
    circuit_red: 1,
    combinator_input_red: 1,
    circuit_green: 2,
    combinator_input_green: 2,
    combinator_output_green: 4,
    combinator_output_red: 3,
    pole_copper: 5,
    power_switch_left_copper: 5,
    power_switch_right_copper: 6
}

const WIRE_COLOR = {
    RED: "red",
    GREEN: "green",
    COPPER: "copper"
}

/**
 * 
 * @param {number} code 
 * @returns {[string, string] | [string]} [color, description]
 */
const wireCodeColor = (code) => {
    assert(typeof code == "number", "code must be a number")

    switch (code) {
        case WIRE_CODES.circuit_red:
            return [WIRE_COLOR.RED]
        case WIRE_CODES.combinator_input_red:
            return [WIRE_COLOR.RED, "COMBINATOR_INPUT"]
        case WIRE_CODES.circuit_green:
            return [WIRE_COLOR.GREEN]
        case WIRE_CODES.combinator_input_green:
            return [WIRE_COLOR.GREEN, "COMBINATOR_INPUT"]
        case WIRE_CODES.combinator_output_green:
            return [WIRE_COLOR.GREEN, "COMBINATOR_OUTPUT"]
        case WIRE_CODES.combinator_output_red:
            return [WIRE_COLOR.RED, "COMBINATOR_OUTPUT"]
        case WIRE_CODES.pole_copper:
            return [WIRE_COLOR.COPPER]
        case WIRE_CODES.power_switch_left_copper:
            return [WIRE_COLOR.COPPER, "POWER_SWITCH_LEFT"]
        case WIRE_CODES.power_switch_right_copper:
            return [WIRE_COLOR.COPPER, "POWER_SWITCH_RIGHT"]
        default:
            throw new Error(`Wire code "${code}" not supported`)
    }
}

/**
 * 
 * @param {[number, number, number, number]} wireArray 
 * @returns 
 */
const wireArrayToStuct = (wireArray) => {
    assert(Array.isArray(wireArray), "wire array must be an array")
    assert(wireArray.length = 4, `wire array must have 4 items ${wireArray.join(",")}`)

    const [
        source_entity_number,
        source_wire_code,
        sink_entity_number,
        sink_wire_code
    ] = wireArray;


    const [source_wire_color] = wireCodeColor(Number(source_wire_code))
    const [sink_wire_color] = wireCodeColor(Number(sink_wire_code))

    return {
        source: {
            entity_number: Number(source_entity_number),
            color: source_wire_color
        },
        sink: {
            entity_number: Number(sink_entity_number),
            color: sink_wire_color
        }
    }
}

const buildCircuitNetworks = (entities, wires) => {
    assert(Array.isArray(entities), "entities must be an array")
    assert(Array.isArray(wires), "wries must be an array")
    // Build adjacency list by color
    const adjacency = { red: {}, green: {}, copper: {} };

    for (const wire of wires) {
        const { source, sink } = wireArrayToStuct(wire);
        const { entity_number: sId, color: sColor } = source;
        const { entity_number: tId, color: tColor } = sink;

        // only connect if both ends have the same color
        if (sColor === tColor) {
            const color = sColor;
            if (!adjacency[color][sId]) adjacency[color][sId] = [];
            if (!adjacency[color][tId]) adjacency[color][tId] = [];
            adjacency[color][sId].push(tId);
            adjacency[color][tId].push(sId);
        }
    }

    const findNetworks = (color) => {
        const visited = new Set();
        const networks = [];

        for (const entity of entities) {
            const id = entity.entity_number;
            if (visited.has(id)) continue;

            const stack = [id];
            const component = new Set();

            while (stack.length > 0) {
                const current = stack.pop();
                if (visited.has(current)) continue;
                visited.add(current);
                component.add(current);

                const neighbors = adjacency[color][current] || [];
                for (const next of neighbors) {
                    if (!visited.has(next)) stack.push(next);
                }
            }

            if (component.size > 1) {
                networks.push([...component]);
            }
        }



        return networks;
    }


    const networkCategories = {
        red: findNetworks("red"),
        green: findNetworks("green"),
        copper: findNetworks("copper")
    }

    const circuitConnectedEntities = new Set()
    networkCategories.red.forEach(entityIds => entityIds.forEach(entityId => circuitConnectedEntities.add(entityId)))
    networkCategories.green.forEach(entityIds => entityIds.forEach(entityId => circuitConnectedEntities.add(entityId)))


    return {
        red: findNetworks("red"),
        green: findNetworks("green"),
        copper: findNetworks("copper"),
        circuitConnectedEntities
    };
}

// General Utilities
const toSnakeCase = (str) => {
    return str
        // Convert camelCase to snake_case
        .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
        // Convert kebab-case to snake_case
        .replace(/-/g, "_")
        // Lowercase the result
        .toLowerCase();
}

function average(arr) {
    if (arr.length == 0) {
        return 0
    }
    return arr.reduce((acc, it) => acc + it, 0) / arr.length
}


// Entity Helpers
const assertEntityExists = (entity) => assert(entity !== undefined, "entity is not defined")
const assertEntityNameExists = (ent) => {
    assertEntityExists(ent)
    assert(ent.name !== undefined, "entity is missing name")
}

const isAnyTrackedEntity = (entity) => {
    assertEntityExists(entity)
    return ENTITY_SIZES[entity.name] !== undefined;
}

const isBelt = (entity) => {
    assertEntityExists(entity)
    return BELT_SIZES[entity.name] !== undefined;
}

const isChest = (entity) => {
    assertEntityExists(entity)
    return CHEST_SIZES[entity.name] !== undefined;
}
const isBuilding = (entity) => {
    assertEntityExists(entity)
    return BUILDING_SIZES[entity.name] !== undefined;
}

const isCar = (entity) => {
    assertEntityExists(entity)
    return entity.name == "car";
}

const isCargoWagon = (entity) => {
    assertEntityExists(entity)
    return entity.name == "cargo-wagon";
}

const buildingRecipeLabel = (ent) => {
    assertEntityExists(ent)
    assert(isBuilding(ent), `entity ${ent.name} is not a building`)
    const setRecipe = ent.control_behavior?.set_recipe ?? false
    if (setRecipe) {
        return "set_recipe"
    }

    return ent.recipe
}

const getEntitySize = (entity) => {
    if (!isAnyTrackedEntity(entity)) {
        return [1, 1]
    }

    return ENTITY_SIZES[entity.name]
}

// Coordinate System

const FACTORIO_DIRECTION = {
    SOUTH: 0,
    WEST: 4,
    NORTH: 8,
    EAST: 12,
}

const pointInArea = (fromPos, toPos, area) => {
    const [w, h] = area

    const halfW = w / 2, halfH = h / 2;
    return (
        fromPos.x >= toPos.x - halfW &&
        fromPos.x < toPos.x + halfW &&
        fromPos.y >= toPos.y - halfH &&
        fromPos.y < toPos.y + halfH
    );
}

const areasOverlap = (posA, sizeA, posB, sizeB) => {
    const [wA, hA] = sizeA;
    const [wB, hB] = sizeB;

    const halfWA = wA / 2, halfHA = hA / 2;
    const halfWB = wB / 2, halfHB = hB / 2;

    // A’s edges
    const leftA = posA.x - halfWA;
    const rightA = posA.x + halfWA;
    const topA = posA.y - halfHA;
    const bottomA = posA.y + halfHA;

    // B’s edges
    const leftB = posB.x - halfWB;
    const rightB = posB.x + halfWB;
    const topB = posB.y - halfHB;
    const bottomB = posB.y + halfHB;

    // Overlap occurs if both X and Y projections overlap
    return (
        leftA < rightB &&
        rightA > leftB &&
        topA < bottomB &&
        bottomA > topB
    );
};

const pointInEntity = (pos, entity) => {
    let [w, h] = getEntitySize(entity);

    if (entity.name == "cargo-wagon") {
        const orientation = entity.orientation ?? 0;
        if (orientation == 0 || orientation == 0.5) { w = 2; h = 6; }
        else { w = 6; h = 2; }
    }

    if (entity.name != "cargo-wagon" && w != h) {

        const orientation = entity.direction ?? 0
        const max_side = Math.max(w, h)
        const min_side = Math.min(w, h)
        switch (orientation) {
            case FACTORIO_DIRECTION.NORTH:
            case FACTORIO_DIRECTION.SOUTH:
                w = max_side
                h = min_side
                break;
            case FACTORIO_DIRECTION.EAST:
            case FACTORIO_DIRECTION.WEST:
                w = min_side
                h = max_side
                break;
        }
    }
    return pointInArea(pos, entity.position, [w, h])
}

// Entity Id Naming
const stringIsNotEmpty = (it) => it !== undefined && typeof it === "string" && it.length != 0

/**
 * 
 * @param {string} a 
 * @param {string} b 
 * @returns {string}
 */
const idChain = (a, b) => {
    assert(stringIsNotEmpty(a), "empty or missing a string")
    assert(stringIsNotEmpty(b), "empty or missing a string")

    return `${toSnakeCase(a)}_${toSnakeCase(b)}`
}


/**
 * 
 * @param {string} entity 
 * @returns {string}
 */
const entityBaseId = (entity) => {
    assertEntityExists(entity)
    assertEntityNameExists(entity)

    return toSnakeCase(entity.name)
}

/**
 * 
 * @param {*} entity 
 * @param {string} tag 
 * @returns {string}
 */
const entityIdWithTag = (entity, tag) => {
    const baseId = entityBaseId(entity)
    return idChain(baseId, tag)
}

/**
 * 
 * @param {*} entity 
 * @param  {...string} tags 
 * @returns {string[]}
 */
const entityIdTags = (entity, ...tags) => tags.map(tag => entityIdWithTag(entity, tag))


// Entity Count Logic

/**
 * 
 * @param {Record<string, number} counts 
 * @param {string} id
 */
const incrementCountForId = (counts, id) => {
    counts[id] = (counts[id] || 0) + 1;
}

/**
 * 
 * @param {Record<string, number} counts 
 * @param {*} entity 
 * @param  {...string} tags 
 */
const incrementCountForEntityTags = (counts, entity, ...tags) => {
    const ids = entityIdTags(entity, ...tags)
    ids.forEach(id => incrementCountForId(counts, id))
}




function handleBaseEntityCounts(counts, entity) {
    const baseEntityId = entityBaseId(entity)
    incrementCountForId(counts, baseEntityId)
}

/**
 * 
 * @param {*} counts 
 * @param {*} entity 
 * @param {Set<number>} connectedIds 
 * @returns 
 */
function handleCircuitCounts(counts, entity, connectedIds) {
    const controlBehavior = entity.control_behavior;

    if (!connectedIds.has(entity.entity_number)) {
        return
    }

    if (!controlBehavior) {
        return
    }

    const tags = []

    if (controlBehavior.circuit_enabled ?? false) {
        tags.push("circuit_enabled")
    }
    if (controlBehavior.circuit_set_filters ?? false) {
        tags.push("circuit_set_filters")
    }

    if (controlBehavior.set_recipe ?? false) {
        tags.push("set_recipe")
    }

    if (tags.length == 0) {
        return
    }
    incrementCountForEntityTags(counts, entity, ...tags)
}

function handleInserterCounts(counts, bpEntities, entity, circuitConnectedEntities) {
    assert(entity.name.includes("inserter"), `entity ${entity.name} is not an inserter`)
    const inserterTypes = classifyInserter(entity, bpEntities);
    inserterTypes.forEach(type => {
        const inserterTypeId = entityIdWithTag(entity, type)
        incrementCountForEntityTags(counts, entity, type)
        handleCircuitCounts(
            counts, {
            ...entity,
            name: inserterTypeId
        },
            circuitConnectedEntities
        )

        const anyInserterId = idChain("inserter_all", type)
        incrementCountForEntityTags(counts, {
            name: "inserter_all"
        }, type)
        handleCircuitCounts(
            counts, {
            ...entity,
            name: anyInserterId,
        },
            circuitConnectedEntities)
    });

    incrementCountForId(counts, "inserter_all")
}

function handleRecipeCounts(counts, entity) {
    const setRecipe = entity.control_behavior?.set_recipe ?? false;

    const tags = []
    if (entity.recipe && !setRecipe) {
        tags.push(toSnakeCase(entity.recipe))
    }

    if (tags.length == 0) {
        return
    }

    if (setRecipe) {
        const id = `${entity.name}_set_recipe`;
        counts[id] = (counts[id] || 0) + 1;
    }
}

function buildCircuitNetworksOrEmpty(entities, wires) {
    if (!wires) {
        return null
    }
    return buildCircuitNetworks(entities, wires)
}

function handleCircuitNetworkCounts(counts, circuitNetworks) {
    if (circuitNetworks == null) {
        return
    }

    counts["total_circuit_networks"] = circuitNetworks.red.length + circuitNetworks.green.length
    counts["total_electric_networks"] = circuitNetworks.copper.length

    counts["total_power_poles"] = circuitNetworks.copper.reduce((acc, it) => acc + it.length, 0)
}

function handleAverageBeaconsPerBuildingType(counts, entities) {
    const beacons = entities.filter(it => it.name == "beacon")
    const buildings = entities.filter(it => isBuilding(it))

    const countByBuildingIds = {}

    buildings.forEach(building => {
        const buildingId = building.name
        const recipe = buildingRecipeLabel(building)
        const recipeId = recipe && idChain(idChain(buildingId, recipe), "recipe")

        if (!countByBuildingIds[buildingId]) {
            countByBuildingIds[buildingId] = []
        }

        if (recipeId && !countByBuildingIds[recipeId]) {
            countByBuildingIds[recipeId] = []
        }

        const beaconCount = beacons.reduce((acc, beacon) => {
            if (areasOverlap(beacon.position, BEACON_RANGE, building.position, getEntitySize(building))) {
                return acc + 1
            }
            return acc
        }, 0)

        countByBuildingIds[buildingId].push(beaconCount)
        if (recipeId) {
            countByBuildingIds[recipeId].push(beaconCount)
        }

    })


    Object.entries(countByBuildingIds).forEach(([entityId, beaconCount]) => {
        counts[idChain("beacons_per", entityId)] = average(beaconCount)
    })
}

function handleAverageBuildingsPerBeacon(counts, entities) {
    const beacons = entities.filter(it => it.name == "beacon")
    const buildings = entities.filter(it => isBuilding(it))

    const affectedBuildingPerBeacon = []

    beacons.forEach(beacon => {
        const affectedBuildings = buildings.reduce((acc, building) => {
            if (areasOverlap(beacon.position, BEACON_RANGE, building.position, getEntitySize(building))) {
                return acc + 1
            } else {
                return acc
            }
        }, 0)
        affectedBuildingPerBeacon.push(affectedBuildings)
    })

    if (affectedBuildingPerBeacon.length == 0) {
        counts["average_buildings_per_beacon"] = 0
        return
    }

    counts["average_buildings_per_beacon"] = affectedBuildingPerBeacon.reduce((acc, it) => acc + it, 0) / affectedBuildingPerBeacon.length
}

function handleEntityByRecipeCounts(counts, entities) {
    entities.forEach(entity => {
        if (entity.recipe) {
            incrementCountForId(counts, idChain("recipe", entity.recipe))
        }
    })
}

function handleCountEnrichments(counts) {
    const ratios = [
        [counts["stack_inserter"], counts["stack_inserter_direct_insertion"] ?? 0, (a, b) => counts["stack_inserter_direct_insertion_percent"] = b / a * 100],
        [counts["bulk_inserter"], counts["bulk_inserter_direct_insertion"] ?? 0, (a, b) => counts["bulk_inserter_direct_insertion_percent"] = b / a * 100],
        [counts["inserter_all"], counts["inserter_all_direct_insertion"] ?? 0, (a, b) => counts["inserter_all_direct_insertion_percent"] = b / a * 100],
    ]

    ratios.forEach(it => {
        const [a, b, f] = it

        if (a !== undefined && b !== undefined) {
            f(a, b)
        }
    })
}


// Recursively walk through a directory to find .txt files
function findTxtFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);

    list.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
            results = results.concat(findTxtFiles(filePath));
        } else if (filePath.endsWith(".txt")) {
            results.push(filePath);
        }
    });

    return results;
}

// Count entities inside a single blueprint
function countEntitiesFromBlueprint(bp) {
    const counts = {};

    assert(bp !== undefined, "missing bp")
    assert(bp.entities !== undefined, `missing entities ${bp}`)
    assert(Array.isArray(bp.entities), `bp.entities is not defined ${JSON.stringify(bp)}`)

    const entities = bp.entities

    const circuitNetworks = buildCircuitNetworksOrEmpty(entities, bp.wires)

    for (const entity of entities) {
        if (!entity.name) {
            continue;
        }

        if (entity.name.includes("inserter")) {
            handleInserterCounts(counts, entities, entity, circuitNetworks.circuitConnectedEntities)
        }

        handleBaseEntityCounts(counts, entity)
        handleRecipeCounts(counts, entity)
        handleCircuitCounts(counts, entity, circuitNetworks.circuitConnectedEntities)
    }

    handleCircuitNetworkCounts(counts, circuitNetworks)
    handleEntityByRecipeCounts(counts, entities)
    handleAverageBuildingsPerBeacon(counts, entities)
    handleAverageBeaconsPerBuildingType(counts, entities)

    handleCountEnrichments(counts)

    return counts;
}

function createDebugBlueprintFromPossibleEntities(entities, debugDescription) {
    return encodeBlueprintJSON({
        blueprint: {
            description: debugDescription,
            entities: entities,
            item: "blueprint",
            label: "debug",
            version: 562949957746689
        },
    })
}

function classifyInserter(inserter, entities) {
    assert(inserter.name.includes("inserter"), `Entity ${inserter.name} is not an inserter!`)

    /**
     * Direction vectors
     *  0 = south (pickup north (-1),  drop south  (+1))
     *  4 = west  (pickup east  (+1),  drop west   (-1))
     *  8 = north (pickup south (+1),  drop north  (-1))
     * 12 = east  (pickup west  (-1),  drop east   (+1))
     * 
     * Factorio coordinate system:
     * down is positive y
     * right is positive x
     */
    const pickupLocation = {
        0: { dx: 0, dy: -1 },
        4: { dx: 1, dy: 0 },
        8: { dx: 0, dy: 1 },
        12: { dx: -1, dy: 0 }
    };

    const dir = inserter.direction ?? 0;
    const vec = pickupLocation[dir];
    if (!vec) {
        console.warn(`no vector ${inserter.direction}`)
        return ["unknown"];
    }

    const pickupPos = {
        x: inserter.position.x + vec.dx,
        y: inserter.position.y + vec.dy
    };
    const dropPos = {
        x: inserter.position.x - vec.dx,
        y: inserter.position.y - vec.dy
    };

    let pickupEntities = entities
        .filter(e => isAnyTrackedEntity(e))
        .filter(e => pointInEntity(pickupPos, e))

    let dropEntities = entities
        .filter(e => isAnyTrackedEntity(e))
        .filter(e => pointInEntity(dropPos, e))


    if (pickupEntities.length > 1) {
        if (pickupEntities.some(e => e.name == "car")) {
            pickupEntities = pickupEntities.filter(e => e.name != "car")
        } else {
            const debugMessage = `multiple pickup entities found [${pickupEntities.map(it => it.name).join(",")}]`
            console.warn(`${debugMessage} possible entities \n ---\n${createDebugBlueprintFromPossibleEntities([inserter, ...pickupEntities], debugMessage)}\n---\n`)
        }
    }

    if (dropEntities.length > 1) {
        console.warn(`multiple drop entities found [${dropEntities.map(it => it.name).join(",")}]`)
    }

    const pickupEntity = pickupEntities[0]
    const dropEntity = dropEntities[0]



    const labels = new Set([])

    let from_label = null

    if (!pickupEntity && !dropEntity) {
        return ["unknown"]
    }

    if (pickupEntity) {
        if (isBuilding(pickupEntity)) {
            from_label = `from_${pickupEntity.name}_${buildingRecipeLabel(pickupEntity)}`
            labels.add("from_building")
        }

        if (isChest(pickupEntity)) {
            from_label = `from_${pickupEntity.name}`
            labels.add("from_chest")
        }

        if (isBelt(pickupEntity)) {
            from_label = `from_${pickupEntity.name}`
            labels.add("from_belt")
        }

        if (isCar(pickupEntity)) {
            labels.add("from_car")
        }

        if (isCargoWagon(pickupEntity)) {
            labels.add("from_cargo_wagon")
        }
    } else {
        const possibleMissedEntities = entities.filter(e => pointInArea(pickupPos, e.position, [20, 20]))
        const debugMessage = `missing pickup entity for ${inserter.name} at ${JSON.stringify(inserter.position)}`
        console.warn(`${debugMessage} possible entities \n ---\n${createDebugBlueprintFromPossibleEntities(possibleMissedEntities, debugMessage)}\n---\n`)
    }

    let to_label = null

    if (dropEntity) {
        if (isBuilding(dropEntity)) {
            to_label = `to_${dropEntity.name}_${buildingRecipeLabel(dropEntity)}`
            labels.add("to_building")
        }

        if (isChest(dropEntity)) {
            to_label = `to_${dropEntity.name}`
            labels.add("to_chest")
        }

        if (isBelt(dropEntity)) {
            to_label = `to_${dropEntity.name}`
            labels.add("to_belt")
        }
        if (isCar(dropEntity)) {
            labels.add("to_car")
        }

        if (isCargoWagon(dropEntity)) {
            labels.add("to_cargo_wagon")
        }
    } else {
        const possibleMissedEntities = entities.filter(e => pointInArea(dropPos, e.position, [20, 20]))
        const debugMessage = `missing drop entity for ${inserter.name} at ${JSON.stringify(inserter.position)} `
        console.warn(`${debugMessage} possible entities \n ---\n${createDebugBlueprintFromPossibleEntities(possibleMissedEntities, debugMessage)}\n---\n`)
    }


    if (from_label) {
        labels.add(from_label)
    }

    if (to_label) {
        labels.add(to_label)
    }

    if (pickupEntity && dropEntity) {
        if (isBuilding(pickupEntity) && isBuilding(dropEntity)) {
            labels.add("direct_insertion")
        }

        if (isChest(pickupEntity) && isChest(dropEntity)) {
            labels.add("chest_to_chest")
        }
    }

    if (from_label && to_label) {
        labels.add(idChain(from_label, to_label))
    }



    if (labels.length == 0) {
        return ["unknown"]
    }
    return Array.from(labels)
}


// File Processing

// Write counts to CSV
function writeCsv(filePath, counts) {
    const rows = [["entity", "count"]];
    for (const [name, count] of Object.entries(counts).sort()) {
        rows.push([name, count]);
    }
    const csvContent = rows.map((r) => r.join(",")).join("\n");
    fs.writeFileSync(filePath, csvContent, "utf-8");
    console.log(`Created CSV: ${filePath}`);
}

// Write aggregate matrix CSV
function writeAggregateMatrix(filePath, allCounts) {
    // Collect all unique entity names
    const allEntities = new Set();
    for (const counts of Object.values(allCounts)) {
        for (const entity of Object.keys(counts)) {
            allEntities.add(entity);
        }
    }

    const blueprints = Object.keys(allCounts);

    const designNames = blueprints
        .map(blueprintName => {
            if (blueprintNameReplacements.has(blueprintName)) {
                return blueprintNameReplacements.get(blueprintName)
            } else {
                return blueprintName
            }
        })

    const rows = [["entity", ...designNames]];

    for (const entity of Array.from(allEntities).sort()) {
        const row = [entity];
        for (const bp of blueprints) {
            const count = allCounts[bp][entity] || 0;
            row.push(count);
        }
        rows.push(row);
    }

    const csvContent = rows.map((r) => r.join(",")).join("\n");
    fs.writeFileSync(filePath, csvContent, "utf-8");
    console.log(`Created aggregate CSV: ${filePath}`);
}

function sanitizeFileName(name) {
    return name.replace(/[^a-z0-9_\-\.]/gi, "_");
}

// Handle blueprint or blueprint book
function processBlueprintJson(jsonData, jsonFile, allCounts) {
    const directory = path.dirname(jsonFile);
    const baseName = sanitizeFileName(path.basename(jsonFile, ".txt"))

    if (jsonData.blueprint) {
        const counts = countEntitiesFromBlueprint(jsonData.blueprint);
        const csvPath = `${baseName}.csv`
        writeCsv(path.join(directory, csvPath), counts);
        allCounts[baseName] = counts;

    } else if (jsonData.blueprint_book) {
        const blueprints = jsonData.blueprint_book.blueprints || [];
        blueprints.forEach((item, idx) => {
            if (item.blueprint) {
                const counts = countEntitiesFromBlueprint(item.blueprint);
                const suffix = item.blueprint.label
                    ? `_${item.blueprint.label.replace(/\s+/g, "_")}`
                    : `_${idx + 1}`;
                const csvPath = sanitizeFileName(`${baseName}_${suffix}.csv`);

                console.log({ baseName, csvPath, jsonFile, suffix })
                writeCsv(path.join(directory, csvPath), counts);

                const bpName = `${baseName}${suffix}`;
                allCounts[bpName] = counts;
            }
        });

    } else {
        console.warn(`Unknown format in ${jsonFile}`);
    }
}

// Decode Factorio blueprint string to JSON
function decodeBlueprintString(blueprintString) {
    if (!blueprintString.startsWith("0")) {
        throw new Error("Invalid blueprint string (must start with 0)");
    }

    const data = blueprintString.slice(1); // remove leading '0'
    const buffer = Buffer.from(data, "base64");
    const inflated = zlib.inflateSync(buffer);
    return JSON.parse(inflated.toString());
}

// Encode JSON to Factorio blueprint string
function encodeBlueprintJSON(json) {
    // stringify JSON
    const jsonString = JSON.stringify(json);

    // compress with zlib
    const deflated = zlib.deflateSync(Buffer.from(jsonString, "utf-8"));

    // base64 encode
    const base64 = deflated.toString("base64");

    // prepend '0' (Factorio version header)
    return "0" + base64;
}


// Main
function generateCsvs(baseDir) {
    console.log(`Searching for files in ${baseDir}`)
    const txtFiles = findTxtFiles(baseDir);
    const allCounts = {};

    txtFiles.forEach((txtFile) => {
        try {
            const content = fs.readFileSync(txtFile, "utf-8");
            const jsonData = decodeBlueprintString(content);
            processBlueprintJson(jsonData, txtFile, allCounts);
        } catch (err) {
            console.error(`Failed to process ${txtFile}: ${err.message}`);
            throw err
        }
    });

    // Write aggregate CSV at top level
    const aggregatePath = path.join(baseDir, "aggregate.csv");
    writeAggregateMatrix(aggregatePath, allCounts);
}

// Run
const targetDir = process.argv[2] || process.cwd();
generateCsvs(targetDir);
