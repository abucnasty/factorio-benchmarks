import * as zlib from 'zlib';

const offset = 2;    // offset between inserters in ticks
const duration = 1;   // duration of the inserter in ticks
const inserters = 30;   // number of inserters in the sequence


const signal_names = [
    "A", "B", "C", "D", "E", "F", "G", "H",
    "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "0","1", "2", "3", "4", "5", "6", "7", "8", "9",
]


const total_sequence_duration = (inserters - 1) * offset + duration

const letter_to_offset = Array.from({ length: inserters }, (_, i) => [total_sequence_duration - (offset * (inserters - i)) + offset, signal_names[i]]);
const filters = []

letter_to_offset.forEach(([offset, letter], index) => {
    filters.push({
        "index": index + 1,
        "type": "virtual",
        "name": `signal-${letter}`,
        "quality": "normal",
        "comparator": "=",
        "count": offset
    })
})


const blueprint = {
    "blueprint": {
        "icons": [
            {
                "signal": {
                    "name": "constant-combinator"
                },
                "index": 1
            }
        ],
        "entities": [
            {
                "entity_number": 1,
                "name": "constant-combinator",
                "position": {
                    "x": 90.5,
                    "y": -244.5
                },
                "direction": 4,
                "control_behavior": {
                    "sections": {
                        "sections": [
                            {
                                "index": 1,
                                "filters": filters
                            }
                        ]
                    }
                }
            }
        ],
        "item": "blueprint",
        "version": 562949957025792
    }
}

const blueprintString = '0' + zlib.deflateSync(JSON.stringify(blueprint)).toString('base64');
console.log(blueprintString);

console.log(`total_sequence_duration = ${total_sequence_duration}`);

const mod = (offset*inserters);
console.log(`mod = ${mod}`);
letter_to_offset.forEach(([offset, letter], index) => {
    const start = offset
    const end = (offset-total_sequence_duration) % mod
    console.log(`signal-${letter} = ${start}:${end}`);
})

printTestInserters()

function printTestInserters() {

    const createInserter = (entityNumber, x, y, signalName) => {
        return {
            "entity_number": entityNumber,
            "name": "stack-inserter",
            "position": {
                "x": x,
                "y": y
            },
            "control_behavior": {
                "circuit_enabled": true,
                "circuit_condition": {
                    "first_signal": {
                        "type": "virtual",
                        "name": `signal-${signalName}`
                    },
                    "constant": 0,
                    "comparator": ">"
                },
            },
            "quality": "legendary"
        }
    }

    const entities = letter_to_offset.map(([_, letter], index) => {
            const x = 0.5 + (index *2);
            return createInserter(index+1, x, 0.5, letter)
        }
    )

    let bp = {
        "blueprint": {
            "icons": [
                {
                    "signal": {
                        "name": "ee-infinity-chest"
                    },
                    "index": 1
                }
            ],
            "entities": entities,
            "wires": [],
            "item": "blueprint",
            "version": 562949957353472
        }
    }

    console.log('0' + zlib.deflateSync(JSON.stringify(bp)).toString('base64'))
}