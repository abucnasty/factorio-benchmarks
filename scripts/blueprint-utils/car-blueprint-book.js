const fs = require("fs");
const path = require("path");
const assert = require("node:assert")
const zlib = require("zlib");

const FACTORIO_VERSION = 562949958139904;

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

function createCar(orientation) {
    return {
        "entity_number": -1,
        "name": "car",
        "position": {
            "x": 0,
            "y": 0
        },
        "enable_logistics_while_moving": false,
        "trunk_inventory": null,
        "ammo_inventory": null,
        "driver_is_main_gunner": false,
        "selected_gun_index": 1,
        "orientation": orientation
    }
}

function createBlueprint(label, entities) {
    return {
        icons: [
            {
                "signal": {
                    "name": "car"
                },
                "index": 1
            }
        ],
        entities: entities.map((entity, index) => assignEntityNumber(entity, index + 1)),
        item: "blueprint",
        label: label,
        version: FACTORIO_VERSION
    }
}

function assignEntityNumber(blueprint, entityNumber) {
    return {
        ...blueprint,
        entity_number: entityNumber,
    }
}

const compass32 = new Map([
  ['0.00000', "N"],
  ['0.03125', "NbE"],
  ['0.06250', "NNE"],
  ['0.09375', "NEbN"],
  ['0.12500', "NE"],
  ['0.15625', "NEbE"],
  ['0.18750', "ENE"],
  ['0.21875', "EbN"],
  ['0.25000', "E"],
  ['0.28125', "EbS"],
  ['0.31250', "ESE"],
  ['0.34375', "SEbE"],
  ['0.37500', "SE"],
  ['0.40625', "SEbS"],
  ['0.43750', "SSE"],
  ['0.46875', "SbE"],
  ['0.50000', "S"],
  ['0.53125', "SbW"],
  ['0.56250', "SSW"],
  ['0.59375', "SWbS"],
  ['0.62500', "SW"],
  ['0.65625', "SWbW"],
  ['0.68750', "WSW"],
  ['0.71875', "WbS"],
  ['0.75000', "W"],
  ['0.78125', "WbN"],
  ['0.81250', "WNW"],
  ['0.84375', "NWbW"],
  ['0.87500', "NW"],
  ['0.90625', "NWbN"],
  ['0.93750', "NNW"],
  ['0.96875', "NbW"]
]);


function main() {

    const blueprints = []
    const resolution = 32;
    for (let i = 0; i < resolution; i++) {
        const car = createCar(i / resolution);
        const name = compass32.get(car.orientation.toFixed(5));
        const blueprint = createBlueprint(name, [car]);
        blueprints.push(blueprint);
    }


    const book = {
        blueprint_book: {
            blueprints: blueprints.map((bp, index) => ({
                blueprint: bp,
                index: index
            })),
            item: "blueprint-book",
            label: "Car Orientations",
            active_index: 0,
            version: FACTORIO_VERSION
        }
    }
    console.log(book.blueprint_book.blueprints[0])

    const bookString = encodeBlueprintJSON(book);
    fs.writeFileSync(path.join(process.cwd(), "car-orientations-book.json"), JSON.stringify(book, null, 4), "utf-8");
    fs.writeFileSync(path.join(process.cwd(), "car-orientations-book.txt"), bookString, "utf-8");
    console.log(`Blueprint book written to ${path.join(process.cwd(), "car-orientations-book.txt")}`);
}


main()