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
 * @param {string} entityId
 */
const incrementCountForId = (counts, entityId) => {
    counts[entityId] = (counts[entityId] || 0) + 1;
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


function handleCircuitCounts(counts, entity) {
    const controlBehavior = entity.control_behavior;

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

function handleInserterCounts(counts, bpEntities, entity) {
    assert(entity.name.includes("inserter"), `entity ${entity.name} is not an inserter`)
    const inserterTypes = classifyInserter(entity, bpEntities);
    inserterTypes.forEach(type => {
        const inserterTypeId = entityIdWithTag(entity, type)
        incrementCountForEntityTags(counts, entity, type)
        handleCircuitCounts(counts, {
            ...entity,
            name: inserterTypeId
        })
    });
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

    for (const entity of entities) {
        if (!entity.name) {
            continue;
        }

        if (entity.name.includes("inserter")) {
            handleInserterCounts(counts, entities, entity)
        }

        handleBaseEntityCounts(counts, entity)
        handleRecipeCounts(counts, entity)
        handleCircuitCounts(counts, entity)
    }
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
        console.warn(`multiple pickup entities found [${pickupEntities.map(it => it.name).join(",")}]`)

    }

    if (dropEntities.length > 1) {
        console.warn(`multiple drop entities found [${dropEntities.map(it => it.name).join(",")}]`)
    }

    const pickupEntity = pickupEntities[0]
    const dropEntity = dropEntities[0]

    const buildingRecipeLabel = (ent) => {
        const setRecipe = ent.control_behavior?.set_recipe ?? false
        if (setRecipe) {
            return "set_recipe"
        }

        return ent.recipe
    }

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
    } else {
        const possibleMissedEntities = entities.filter(e => pointInArea(pickupPos, e.position, [20, 20]))
        const debugMessage = `missing pickup entity for ${inserter.name} at ${JSON.stringify(inserter.position)}`
        console.warn(`${debugMessage} possible entities [${createDebugBlueprintFromPossibleEntities(possibleMissedEntities, debugMessage)}]`)
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
    } else {
        const possibleMissedEntities = entities.filter(e => pointInArea(dropPos, e.position, [20, 20]))
        const debugMessage = `missing drop entity for ${inserter.name} at ${JSON.stringify(inserter.position)} `
        console.warn(`${debugMessage} possible entities [${createDebugBlueprintFromPossibleEntities(possibleMissedEntities, debugMessage)}]`)
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
        .map(it => it.replace("design_", ""))

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

// Handle blueprint or blueprint book
function processBlueprintJson(jsonData, jsonFile, allCounts) {
    const baseName = path.basename(jsonFile, ".txt");

    if (jsonData.blueprint) {
        const counts = countEntitiesFromBlueprint(jsonData.blueprint);
        const csvPath = jsonFile.replace(/\.txt$/, ".csv");
        writeCsv(csvPath, counts);
        allCounts[baseName] = counts;

    } else if (jsonData.blueprint_book) {
        const blueprints = jsonData.blueprint_book.blueprints || [];
        blueprints.forEach((item, idx) => {
            if (item.blueprint) {
                const counts = countEntitiesFromBlueprint(item.blueprint);
                const suffix = item.blueprint.label
                    ? `_${item.blueprint.label.replace(/\s+/g, "_")}`
                    : `_${idx + 1}`;
                const csvPath = jsonFile.replace(/\.txt$/, `${suffix}.csv`);
                writeCsv(csvPath, counts);

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
