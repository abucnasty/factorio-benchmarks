// hacked together script to download blueprint images and texts from links of submissions
const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");
const http = require("http");
const https = require("https");
const { URL } = require("url");

const designs = [
    "00_baseline", "https://factoriobin.com/post/pix5u9",
    "01_geist", "https://factoriobin.com/post/6ojavo",
    "02_geist", "https://factoriobin.com/post/ppj5sn",
    "03_swiftdeath007", "https://factoriobin.com/post/obbcp5",
    "04_goirelandbrad", "https://factoriobin.com/post/7buo3s",
    "05_flexime", "https://factoriobin.com/post/gcvqhb",
    "06_mulain", "https://factoriobin.com/post/iyx9om",
    "07_rydberg", "https://factoriobin.com/post/055vfm",
    "08_derantrix", "https://factoriobin.com/post/0t3zku",
    "09_azhrei", "https://factoriobin.com/post/zucx48",
    "10_thaeln", "https://factoriobin.com/post/esfiy4/1",
    "11_thaeln", "https://factoriobin.com/post/feh6yl/1",
    "12_schumulukulu", "https://factoriobin.com/post/las5mx",
    "13_yuu", "https://factoriobin.com/post/x5ic4p",
    "14_redphoenixq", "https://factoriobin.com/post/b0rv5p/1",
    "15_yoyonas", "https://factoriobin.com/post/56o6sh/1",
    "16_teazy", "https://factoriobin.com/post/bssqcf",
    "17_akaravortex", "https://factoriobin.com/post/ylqa0u",
    "18_akaravortex", "https://factoriobin.com/post/ylqa0u/3",
    "19_akaravortex", "https://factoriobin.com/post/ylqa0u/2",
    "20_groot_opperhoofd", "https://factoriobin.com/post/bxvcvj",
    "21_em", "https://factoriobin.com/post/19t8ll",
    "22_warbaque", "https://katiska.cc/temp/factorio/blueprints/ups/purple.txt",
    "23_warbaque", "https://katiska.cc/temp/factorio/blueprints/ups/purple.txt",
    "24_syvkal", "https://factoriobin.com/post/i1w7o60tbus3-EXPIRES",
    "25_mcmayhem57", "https://factoriobin.com/post/7eccsi",
    "26_galacta487", "https://factoriobin.com/post/rlwykn",
    "28_erichteia", "https://factoriobin.com/post/k5qea2",
    "29_the_end", "https://factoriobin.com/post/feh6yl/1",
]

function httpGetBuffer(urlString) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(urlString);
        const getter = urlObj.protocol === "https:" ? https.get : http.get;
        getter(urlObj, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                // follow redirect
                resolve(httpGetBuffer(res.headers.location));
                return;
            }
            if (res.statusCode !== 200) {
                reject(new Error(`Request Failed. Status Code: ${res.statusCode} for ${urlString}`));
                res.resume();
                return;
            }
            const chunks = [];
            res.on("data", (chunk) => chunks.push(chunk));
            res.on("end", () => resolve(Buffer.concat(chunks)));
        }).on("error", reject);
    });
}

async function saveBuffer(filePath, buffer) {
    await fsPromises.mkdir(path.dirname(filePath), { recursive: true });
    await fsPromises.writeFile(filePath, buffer);
}

const main = async () => {
    const outDir = path.resolve(__dirname);
    // process sequentially to avoid too many concurrent requests
    for (let i = 0; i < designs.length; i += 2) {
        const name = designs[i];
        const url = designs[i + 1];
        try {
            if (!url) {
                console.warn(`No URL for design ${name}, skipping.`);
                continue;
            }

            if (url.includes("factoriobin")) {
                // fetch metadata JSON
                const metaBuf = await httpGetBuffer(`${url}/info.json`);
                const metaText = metaBuf.toString("utf8");
                let meta;
                try {
                    meta = JSON.parse(metaText);
                } catch (err) {
                    throw new Error(`Failed to parse JSON from ${url}: ${err.message}`);
                }

                const bpUrl = meta?.node?.blueprintStringUrl;
                // if (bpUrl) {
                //     const bpBuf = await httpGetBuffer(bpUrl);
                //     const txtPath = path.join(outDir, `${name}.txt`);
                //     await saveBuffer(txtPath, bpBuf);
                //     console.log(`Saved blueprint text: ${txtPath}`);
                // } else {
                //     console.warn(`No node.blueprintStringUrl for ${url}`);
                // }

                const imgUrl = meta?.node?.renderImageUrl;
                if (imgUrl) {
                    const imgBuf = await httpGetBuffer(imgUrl);
                    const ext = path.extname(new URL(imgUrl).pathname) || ".jpg";
                    const imgPath = path.join(outDir, `${name}${ext}`);
                    await saveBuffer(imgPath, imgBuf);
                    console.log(`Saved image: ${imgPath}`);
                }
            } else {
                // raw text download and save as .txt
                const buf = await httpGetBuffer(url);
                const txtPath = path.join(outDir, `${name}.txt`);
                await saveBuffer(txtPath, buf);
                console.log(`Saved raw text: ${txtPath}`);
            }
        } catch (err) {
            console.error(`Failed to download ${name} from ${url}: ${err.message}`);
        }
    }
}

main().catch(err => {
    console.error("Fatal error:", err);
    process.exit(1);
});