const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

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


function generateBook(targetDirectory) {
    console.log(`Searching for files in ${targetDirectory}`)
    const txtFiles = findTxtFiles(targetDirectory);
    console.log(`Found ${txtFiles.length} .txt files.`);

    const blueprints = [];

    for(const filePath of txtFiles) {
        const baseName = path.basename(filePath, ".txt");
        const blueprintString = fs.readFileSync(filePath, "utf-8");
        const blueprintDto = decodeBlueprintString(blueprintString)
        if(blueprintDto["blueprint_book"]) {
            throw new Error(`File ${filePath} is a blueprint book which is not supported for now...`)
        }

        const blueprint = blueprintDto.blueprint
        blueprint.label = baseName;
        blueprints.push(blueprint);
    }


    const maxVersion = Math.max(...blueprints.map(bp => bp.version || 0));


    return {
        blueprint_book: {
            blueprints: blueprints.map((bp, index) => ({ 
                blueprint: bp,
                index: index
            })),
            item: "blueprint-book",
            label: "My Beautiful Book",
            active_index: 0,
            version: maxVersion
        }
    }
}

function writeBookToFile(book, outputPath) {
    const bookString = encodeBlueprintJSON(book);
    fs.writeFileSync(outputPath, bookString, "utf-8");
    console.log(`Blueprint book written to ${outputPath}`);
}

// Run
const targetDir = process.argv[2] || process.cwd();
const book = generateBook(targetDir);

writeBookToFile(book, path.join(process.cwd(), "blueprint-book.txt"));

