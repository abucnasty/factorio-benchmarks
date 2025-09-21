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

// Convert all .txt files in a directory
function convertBlueprints(baseDir) {
  const txtFiles = findTxtFiles(baseDir);

  txtFiles.forEach((txtFile) => {
    try {
      const content = fs.readFileSync(txtFile, "utf-8").trim();
      const jsonData = decodeBlueprintString(content);

      const jsonPath = txtFile.replace(/\.txt$/, ".json");
      fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), "utf-8");

      console.log(`Converted: ${txtFile} → ${jsonPath}`);
    } catch (err) {
      console.error(`Failed to convert ${txtFile}: ${err.message}`);
    }
  });
}

// Run with the current directory or provided arg
const targetDir = process.argv[2] || process.cwd();
convertBlueprints(targetDir);