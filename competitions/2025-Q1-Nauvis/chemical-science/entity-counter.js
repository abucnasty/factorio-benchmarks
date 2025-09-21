// entity-counter.js
const fs = require("fs");
const path = require("path");


const blueprintNameReplacements = new Map([
  ["design_14_abucnasty_Stage_4", "design_14_abucnasty"],
  ["design_21_syvkal_STAGE_2", "design_21_syvkal"],
  ["design_25_ashtroboy_Final_State_(Only_for_comparison_will_not_work)", "design_25_ashtroboy"],
  ["design_33_syvkal_STAGE_2", "design_33_syvkal"]
])

// Recursively walk through a directory to find .json files
function findJsonFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(findJsonFiles(filePath));
    } else if (filePath.endsWith(".json")) {
      results.push(filePath);
    }
  });

  return results;
}

// Count entities inside a single blueprint
function countEntitiesFromBlueprint(bp) {
  const counts = {};
  if (bp.entities) {
    for (const ent of bp.entities) {
      let id = ""

      const circuitEnabled = ent.control_behavior?.circuit_enabled ?? false
      const circuitSetFilters = ent.control_behavior?.circuit_set_filters ?? false

      const setRecipe = ent.control_behavior?.set_recipe ?? false
      if (ent.name) {
        if (ent.recipe && !setRecipe) {
          const id = `${ent.name}_${ent.recipe}`
          counts[id] = (counts[id] || 0) + 1;
        }

        if (setRecipe) {
          const id = `${ent.name}_set_recipe`
          counts[id] = (counts[id] || 0) + 1;
        }

        if (ent.name.includes("inserter")) {
          const inserterTypes = classifyInserter(ent, bp.entities)

          inserterTypes.forEach(type => {
            const id = `${ent.name}_${type}`
            counts[id] = (counts[id] || 0) + 1;

            if (circuitEnabled) {
              counts[`${id}_circuit_enabled`] = (counts[`${id}_circuit_enabled`] || 0) + 1;
            }

            if (circuitSetFilters) {
              counts[`${id}_circuit_set_filters`] = (counts[`${id}_circuit_set_filters`] || 0) + 1;
            }
          })
        }

        if (circuitEnabled) {
          counts[`${ent.name}_circuit_enabled`] = (counts[`${ent.name}_circuit_enabled`] || 0) + 1;
        }

        if (circuitSetFilters) {
          counts[`${ent.name}_circuit_set_filters`] = (counts[`${ent.name}_circuit_set_filters`] || 0) + 1;
        }

        counts[ent.name] = (counts[ent.name] || 0) + 1;
      }
    }
  }
  return enrichWithRatios(counts);
}

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

function enrichWithRatios(counts) {

  // console.log(counts)
  return counts
}

// Handle blueprint or blueprint book
function processBlueprintJson(jsonData, jsonFile, allCounts) {
  const baseName = path.basename(jsonFile, ".json");

  if (jsonData.blueprint) {
    const counts = countEntitiesFromBlueprint(jsonData.blueprint);
    const csvPath = jsonFile.replace(/\.json$/, ".csv");
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
        const csvPath = jsonFile.replace(/\.json$/, `${suffix}.csv`);
        writeCsv(csvPath, counts);

        const bpName = `${baseName}${suffix}`;
        allCounts[bpName] = counts;
      }
    });

  } else {
    console.warn(`Unknown format in ${jsonFile}`);
  }
}


function classifyInserter(inserter, entities) {
  if (!inserter.name.includes("inserter")) {
    throw new Error("Entity is not an inserter");
  }

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

  const buildings = {
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
  }

  const chests = {
    "wooden-chest": [1, 1],
    "iron-chest": [1, 1],
    "steel-chest": [1, 1],
    "logistic-chest-requester": [1, 1],
    "logistic-chest-provider": [1, 1],
    "logistic-chest-buffer": [1, 1],
    "logistic-chest_storage": [1, 1],
    "cargo-wagon": [6, 2],
  }

  const belts = {
    // belts
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
  }

  const isBelt = (ent) => ent && (belts[ent.name] !== undefined)
  const isChest = (ent) => ent && (chests[ent.name] !== undefined)
  const isBuilding = (ent) => ent && (buildings[ent.name] !== undefined)

  const isAnyTrackedEntity = (ent) => isBelt(ent) || isChest(ent) || isBuilding(ent)

  // defaults to 1x1 if not listed
  const entitySizes = {
    ...buildings,
    ...chests,
    ...belts
  };

  // Check if a point lies inside an entity’s bounding box
  const pointInEntity = (pos, ent) => {
    let [w, h] = entitySizes[ent.name] || [1, 1];

    if (ent.name == "cargo-wagon") {
      const orientation = ent.orientation ?? 0;
      if (orientation == 0 || orientation == 0.5) {
        // vertical orientation
        w = 2
        h = 6
      } else {
        // horizontal orientation
        w = 6
        h = 2
      }
    }

    const halfW = w / 2;
    const halfH = h / 2;

    return (
      pos.x >= ent.position.x - halfW &&
      pos.x < ent.position.x + halfW &&
      pos.y >= ent.position.y - halfH &&
      pos.y < ent.position.y + halfH
    )
  }

  const pickupEntities = entities
    .filter((e) => pointInEntity(pickupPos, e))
    .filter(e => isAnyTrackedEntity(e));
  const dropEntities = entities
    .filter((e) => pointInEntity(dropPos, e))
    .filter(e => isAnyTrackedEntity(e));

  if (pickupEntities > 0) {
    console.warn(`multiple pickup entities found ${pickupEntities.map(it => it.name)}`)
  }

  if (dropEntities > 0) {
    console.warn(`multiple drop entities found ${dropEntities.map(it => it.name)}`)
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

  let to_label = null

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

  if (from_label) {
    labels.add(from_label)
  }

  if (to_label) {
    labels.add(to_label)
  }

  if (from_label && to_label) {
    labels.add(`${from_label}_${to_label}`)
  }

  if (isBuilding(pickupEntity) && isBuilding(dropEntity)) {
    labels.add("direct_insertion")
  }

  if (isBuilding(pickupEntity) && isBuilding(dropEntity)) {
    labels.add("direct_insertion")
  }

  if (isChest(pickupEntity) && isChest(dropEntity)) {
    labels.add("chest_to_chest")
  }

  if (labels.length == 0) {
    return ["unknown"]
  } else {
    return labels
  }
}

// Main
function generateCsvs(baseDir) {
  const jsonFiles = findJsonFiles(baseDir);
  const allCounts = {};

  jsonFiles.forEach((jsonFile) => {
    try {
      const content = fs.readFileSync(jsonFile, "utf-8");
      const jsonData = JSON.parse(content);
      processBlueprintJson(jsonData, jsonFile, allCounts);
    } catch (err) {
      console.error(`Failed to process ${jsonFile}: ${err.message}`);
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
