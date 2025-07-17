import * as zlib from 'zlib';

const offset    = 6;    // offset between inserters in ticks
const duration  = 24;   // duration of the inserter in ticks
const inserters = 16;   // number of inserters in the sequence


const total_sequence_duration = (inserters-1)*offset+duration

const letter_to_offset = Array.from({ length: inserters }, (_, i) => [total_sequence_duration-(offset*(inserters-i))+offset, String.fromCharCode(65 + i)]);
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

const json = JSON.stringify(blueprint)
const blueprintString = '0' + zlib.deflateSync(json).toString('base64');
console.log(blueprintString);

console.log(`total_sequence_duration = ${total_sequence_duration}`);

const mod = (offset*inserters);
console.log(`mod = ${mod}`);

letter_to_offset.forEach(([offset, letter], index) => {
    const start = offset
    const end = (offset-total_sequence_duration) % mod
    console.log(`signal-${letter} = ${start}:${end}`);
})

