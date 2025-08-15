#!/usr/bin/env node
// Usage: node index "./data/*.csv"

import fs from "fs";
import path from "path";
import csv from "csv-parser";
import * as glob from "glob";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import { Command } from "commander";

const program = new Command();

program
  .name("chart-gen")
  .description("Extension of Belt's verbose_metrics to generate charts")
  .argument("<glob-pattern>", "Glob pattern for CSV files (e.g. './data/*.csv')")
  .option("-o, --output <file>", "Output PNG file", "verbose_metrics.png")
  .option("-w, --width <px>", "Chart width in pixels", (it) => parseInt(it), 1400)
  .option("-h, --height <px>", "Chart height in pixels", (it) => parseInt(it), 800)
  .parse();

const options = program.opts();
const pattern = program.args[0];
const width = options.width;
const height = options.height;
const outputFile = path.resolve(process.cwd(), options.output);

const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

async function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}

function average(array) {
  return array.reduce((sum, val) => sum + val, 0) / array.length;
}

function nanoToMicro(nano) {
  return nano / 1000; // convert nanoseconds to microseconds
}

async function processFile(filePath) {
  const data = await readCSV(filePath);

  const entityUpdateVals = data.map((row) => Number(row.entityUpdate));
  const controlBehaviorVals = data.map((row) => Number(row.controlBehaviorUpdate));
  const transportLinesVals = data.map((row) => Number(row.transportLinesUpdate));
  const electricHeatVals = data.map((row) => Number(row.electricHeatFluidCircuitUpdate));
  const wholeUpdateVals = data.map((row) => Number(row.wholeUpdate));

  const entityAvg = nanoToMicro(average(entityUpdateVals));
  const controlAvg = nanoToMicro(average(controlBehaviorVals));
  const transportAvg = nanoToMicro(average(transportLinesVals));
  const electricAvg = nanoToMicro(average(electricHeatVals));
  const wholeUpdateAverage = nanoToMicro(average(wholeUpdateVals));

  const sumOfParts = entityAvg + controlAvg + transportAvg + electricAvg;
  const otherAvg = wholeUpdateAverage - sumOfParts;

  return {
    label: path.basename(filePath, ".csv").replace("_verbose_metrics", ""),
    values: [entityAvg, controlAvg, transportAvg, electricAvg, otherAvg],
    wholeUpdateAverage
  };
}

async function main() {
  const files = glob.sync(pattern);
  if (files.length === 0) {
    console.error("No files matched the given pattern.");
    process.exit(1);
  }

  const results = [];
  for (const file of files) {
    results.push(await processFile(file));
  }

  // Sort results by "Whole Update" total time ascending
  results.sort((a, b) => a.wholeUpdateAverage - b.wholeUpdateAverage);

  const categories = [
    "Entity Update",
    "Control Behavior Update",
    "Transport Lines Update",
    "Electric/Heat/Fluid Circuit Update",
    "Other",
  ];

  const colors = [
    "rgb(29, 35, 133)",
    "rgb(228, 72, 24)",
    "rgb(244, 166, 154)",
    "rgb(244, 171, 18)",
    "rgb(166, 129, 87)",
  ];

  const datasets = categories.map((cat, idx) => ({
    label: cat,
    data: results.map((r) => r.values[idx]),
    backgroundColor: colors[idx],
  }))

  // Plugin: black background
  const backgroundPlugin = {
    id: "customBackground",
    beforeDraw: (chart) => {
      const { ctx, width, height } = chart;
      ctx.save();
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    },
  };

  // Plugin: white text table at bottom
  const tablePlugin = {
    id: "valueTable",
    afterDraw: (chart) => {
      const { ctx, chartArea: { left, right }, height } = chart;
      ctx.save();

      // Start table lower down so it never overlaps
      const tableTop = height - (categories.length + 2) * 20;
      const rowHeight = 20;
      const colWidth = (right - left) / (results.length + 1);

      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = "white";

      // Header
      ctx.fillText("Category", left + colWidth / 2, tableTop);
      results.forEach((res, i) => {
        ctx.fillText(res.label, left + colWidth * (i + 1) + colWidth / 2, tableTop);
      });

      // Data rows
      ctx.font = "12px Arial";
      categories.forEach((cat, rowIdx) => {
        const y = tableTop + (rowIdx + 1) * rowHeight;
        ctx.fillText(cat, left + colWidth / 2, y);
        results.forEach((res, colIdx) => {
          ctx.fillText(Math.round(res.values[rowIdx]), left + colWidth * (colIdx + 1) + colWidth / 2, y);
        });
      });

      ctx.restore();
    }
  };

  const configuration = {
    type: "bar",
    data: {
      labels: results.map((r) => r.label),
      datasets,
    },
    options: {
      indexAxis: "y", // horizontal bars
      responsive: false,
      layout: {
        padding: { bottom: 200 },
      },
      plugins: {
        title: {
          display: true,
          text: "Verbose Metrics",
          color: "white",
        },
        legend: {
          labels: { color: "white" },
        },
        tooltip: {
          callbacks: {
            label: (context) =>
              `${context.dataset.label}: ${Math.round(context.parsed.x)}`,
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: { color: "white" },
          title: { display: true, text: "Average Time [microseconds] (lower is better)", color: "white" },
        },
        y: {
          stacked: true,
          ticks: { color: "white" },
        },
      },
    },
    plugins: [backgroundPlugin, tablePlugin],
  };

  const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);

  fs.writeFileSync(outputFile, imageBuffer);
  console.log(`Stacked horizontal chart with table saved to ${outputFile}`);
}

main().catch((err) => {
  console.error("Error:", err);
});
