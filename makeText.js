/** Command-line tool to generate Markov text. */
const { MarkovMachine } = require("./markov");
const fs = require("fs");
const { readFile } = fs.promises;
const process = require("process");
const axios = require("axios");

/** read file at path and return contents. */
async function cat(path) {
    console.log(`... generated text form file '${path}' ...`);
    try {
        return await readFile(path, "utf8");
    } catch (err) {
        console.error(`Error reading ${path}: ${err}`);
        process.exit(1);
    }
}

/** read page at URL return contents. */
async function webCat(url) {
    console.log(`... generated text form that URL ...`);
    try {
        return (await axios.get(url)).data;
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

async function main() {
    const path = process.argv[3];
    let text;

    if (process.argv[2] === "url") {
        text = await webCat(path);
    } else if (process.argv[2] === "file") {
        text = await cat(path);
    }

    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
}

main();
