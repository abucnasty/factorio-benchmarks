#!/usr/bin/env node
'use strict';

/**
 * cleanup.js
 *
 * For each CSV in the target folder:
 *   1. Strip columns that are entirely zero (or empty).
 *   2. For *_verbose_metrics.csv files:
 *        a. Compute the per-run average controlBehaviorUpdate.
 *        b. Detect a bimodal distribution; warn if none is found.
 *        c. Keep only the runs in the lower cluster.
 *        d. Apply the run filter before stripping zero columns.
 *   3. For results.csv / cpu_freq.csv (files with save_name + run_index),
 *      apply the same run filter derived from the verbose metrics analysis.
 *
 * Usage:
 *   node cleanup.js [targetFolder]   (default: ./results)
 */

const fs   = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const targetFolder = process.argv[2] || path.join(__dirname, 'results');

// Bimodal: the largest gap must be at least this many times larger than the
// second-largest gap to be considered a clear bimodal split.
const BIMODAL_RATIO_THRESHOLD = 2.0;

// ---------------------------------------------------------------------------
// CSV helpers
// ---------------------------------------------------------------------------

/**
 * Parse a CSV string into { headers: string[], rows: string[][] }.
 * Handles a trailing comma on every line (Factorio verbose metrics format).
 */
function parseCSV(content) {
  const lines = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trimEnd().split('\n');
  if (lines.length === 0) return { headers: [], rows: [] };

  const rawHeaders = lines[0].split(',');
  // Drop trailing empty column if present
  const headers = rawHeaders[rawHeaders.length - 1].trim() === '' ? rawHeaders.slice(0, -1) : rawHeaders;

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const parts = lines[i].split(',');
    // Drop trailing empty value matching header trimming
    const row = rawHeaders[rawHeaders.length - 1].trim() === '' ? parts.slice(0, -1) : parts;
    rows.push(row);
  }
  return { headers, rows };
}

/**
 * Serialize back to CSV string (no trailing comma).
 */
function stringifyCSV(headers, rows) {
  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(row.join(','));
  }
  return lines.join('\n') + '\n';
}

// ---------------------------------------------------------------------------
// Column filtering
// ---------------------------------------------------------------------------

/**
 * Returns a new { headers, rows } with all-zero (or all-empty) columns removed.
 * Identifier-ish columns that happen to be all-zero are still removed unless
 * their header is in the `alwaysKeep` set.
 */
function removeZeroColumns(headers, rows, alwaysKeep = new Set()) {
  const keep = [];
  for (let c = 0; c < headers.length; c++) {
    if (alwaysKeep.has(headers[c])) {
      keep.push(c);
      continue;
    }
    const hasNonZero = rows.some(row => {
      const v = row[c];
      return v !== undefined && v.trim() !== '' && v.trim() !== '0' && Number(v) !== 0;
    });
    if (hasNonZero) keep.push(c);
  }
  return {
    headers: keep.map(c => headers[c]),
    rows:    rows.map(row => keep.map(c => row[c] ?? '')),
  };
}

// ---------------------------------------------------------------------------
// Bimodal detection
// ---------------------------------------------------------------------------

/**
 * Given an array of numbers, tries to find a bimodal split point.
 * Returns:
 *   { bimodalClear, splitPoint, lowerValues, upperValues, maxGap, secondGap }
 */
function detectBimodal(values) {
  if (values.length < 2) {
    return { bimodalClear: false, splitPoint: NaN, lowerValues: values, upperValues: [], maxGap: 0, secondGap: 0 };
  }

  const sorted = [...values].sort((a, b) => a - b);

  let maxGap = -Infinity;
  let splitIdx = 1;
  for (let i = 1; i < sorted.length; i++) {
    const gap = sorted[i] - sorted[i - 1];
    if (gap > maxGap) {
      maxGap = gap;
      splitIdx = i;
    }
  }

  // Collect all gaps to assess quality
  const gaps = [];
  for (let i = 1; i < sorted.length; i++) gaps.push(sorted[i] - sorted[i - 1]);
  gaps.sort((a, b) => b - a);
  const secondGap = gaps.length > 1 ? gaps[1] : 0;

  const bimodalClear = maxGap > 0 && (secondGap === 0 || maxGap / secondGap >= BIMODAL_RATIO_THRESHOLD);
  const splitPoint = (sorted[splitIdx - 1] + sorted[splitIdx]) / 2;

  return {
    bimodalClear,
    splitPoint,
    lowerValues: sorted.slice(0, splitIdx),
    upperValues: sorted.slice(splitIdx),
    maxGap,
    secondGap,
  };
}

// ---------------------------------------------------------------------------
// Verbose metrics processing
// ---------------------------------------------------------------------------

/**
 * Process a single *_verbose_metrics.csv file.
 * Returns a Set<string> of the run indices (as strings) that belong to the
 * lower controlBehaviorUpdate cluster.
 */
function processVerboseMetrics(filePath) {
  const fileName = path.basename(filePath);
  console.log(`\n[verbose] ${fileName}`);

  const content = fs.readFileSync(filePath, 'utf8');
  const { headers, rows } = parseCSV(content);

  const runCol      = headers.indexOf('run');
  const cbUpdateCol = headers.indexOf('controlBehaviorUpdate');

  if (runCol === -1) {
    console.warn(`  WARN: no 'run' column — skipping bimodal analysis.`);
    return null;
  }
  if (cbUpdateCol === -1) {
    console.warn(`  WARN: no 'controlBehaviorUpdate' column — skipping bimodal analysis.`);
    return null;
  }

  // Accumulate per-run sums
  const sums   = {};
  const counts = {};
  for (const row of rows) {
    const r  = row[runCol];
    const cb = Number(row[cbUpdateCol]) || 0;
    sums[r]   = (sums[r]   || 0) + cb;
    counts[r] = (counts[r] || 0) + 1;
  }

  const runIds = Object.keys(sums);
  const avgs   = runIds.map(r => sums[r] / counts[r]);
  const runAvgMap = Object.fromEntries(runIds.map((r, i) => [r, avgs[i]]));

  const { bimodalClear, splitPoint, lowerValues, upperValues, maxGap, secondGap } =
    detectBimodal(avgs);

  if (!bimodalClear) {
    console.warn(
      `  WARN: No clear bimodal pattern found (maxGap=${maxGap.toFixed(0)}, ` +
      `secondGap=${secondGap.toFixed(0)}, ratio=${secondGap > 0 ? (maxGap / secondGap).toFixed(2) : 'Inf'}). ` +
      `All runs will be kept.`
    );
    // Still strip zero columns but keep all runs
    const alwaysKeep = new Set(['tick', 'run']);
    const { headers: ch, rows: cr } = removeZeroColumns(headers, rows, alwaysKeep);
    fs.writeFileSync(filePath, stringifyCSV(ch, cr));
    console.log(`  Written ${cr.length} rows (${headers.length - ch.length} zero columns removed, all runs kept).`);
    return new Set(runIds);
  }

  console.log(`  Bimodal split: ${splitPoint.toFixed(0)}`);
  console.log(`  Lower cluster (${lowerValues.length} runs): ` +
              `[${Math.min(...lowerValues).toFixed(0)} – ${Math.max(...lowerValues).toFixed(0)}]`);
  console.log(`  Upper cluster (${upperValues.length} runs): ` +
              `[${Math.min(...upperValues).toFixed(0)} – ${Math.max(...upperValues).toFixed(0)}]`);

  const goodRuns = new Set(runIds.filter(r => runAvgMap[r] <= splitPoint));
  console.log(`  Keeping ${goodRuns.size} of ${runIds.length} runs (discarding ${runIds.length - goodRuns.size}).`);

  // Filter rows to good runs
  const filteredRows = rows.filter(row => goodRuns.has(row[runCol]));
  console.log(`  Row count: ${rows.length} → ${filteredRows.length}`);

  // Strip zero columns from filtered data
  const alwaysKeep = new Set(['tick', 'run']);
  const { headers: ch, rows: cr } = removeZeroColumns(headers, filteredRows, alwaysKeep);
  console.log(`  Zero columns removed: ${headers.length - ch.length}`);

  fs.writeFileSync(filePath, stringifyCSV(ch, cr));
  console.log(`  Written ${cr.length} rows to ${fileName}.`);

  return goodRuns;
}

// ---------------------------------------------------------------------------
// Generic (non-verbose) CSV processing
// ---------------------------------------------------------------------------

/**
 * Process a non-verbose CSV.
 * If goodRunsBySave is provided and the CSV has save_name + run_index columns,
 * applies the run filter before stripping zero columns.
 */
function processGenericCSV(filePath, goodRunsBySave) {
  const fileName = path.basename(filePath);
  console.log(`\n[csv]     ${fileName}`);

  const content = fs.readFileSync(filePath, 'utf8');
  const { headers, rows } = parseCSV(content);

  const saveNameCol  = headers.indexOf('save_name');
  const runIndexCol  = headers.indexOf('run_index');

  let filteredRows = rows;

  if (saveNameCol !== -1 && runIndexCol !== -1 && Object.keys(goodRunsBySave).length > 0) {
    const before = rows.length;
    filteredRows = rows.filter(row => {
      const save = row[saveNameCol];
      const run  = row[runIndexCol];
      if (goodRunsBySave[save]) {
        return goodRunsBySave[save].has(run);
      }
      return true; // unknown save — keep
    });
    if (filteredRows.length !== before) {
      console.log(`  Run filter: ${before} → ${filteredRows.length} rows`);
    }
  }

  const { headers: ch, rows: cr } = removeZeroColumns(headers, filteredRows);
  if (headers.length !== ch.length) {
    console.log(`  Zero columns removed: ${headers.length - ch.length}`);
  }
  fs.writeFileSync(filePath, stringifyCSV(ch, cr));
  console.log(`  Written ${cr.length} rows.`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

if (!fs.existsSync(targetFolder)) {
  console.error(`Target folder not found: ${targetFolder}`);
  process.exit(1);
}

const allFiles     = fs.readdirSync(targetFolder).filter(f => f.endsWith('.csv'));
const verboseFiles = allFiles.filter(f => f.endsWith('_verbose_metrics.csv'));
const otherFiles   = allFiles.filter(f => !f.endsWith('_verbose_metrics.csv'));

console.log(`Target: ${targetFolder}`);
console.log(`Files : ${allFiles.length} CSVs (${verboseFiles.length} verbose metrics, ${otherFiles.length} others)`);

// goodRunsBySave: { saveName (without _verbose_metrics suffix) -> Set<runIndex string> }
const goodRunsBySave = {};

// --- Phase 1: verbose metrics (bimodal + run filter + zero-col strip) ------
for (const file of verboseFiles) {
  const filePath = path.join(targetFolder, file);
  const saveName = file.replace(/_verbose_metrics\.csv$/, '');
  const goodRuns = processVerboseMetrics(filePath);
  if (goodRuns !== null) {
    goodRunsBySave[saveName] = goodRuns;
  }
}

// --- Phase 2: all other CSVs (run filter if applicable + zero-col strip) ---
for (const file of otherFiles) {
  const filePath = path.join(targetFolder, file);
  processGenericCSV(filePath, goodRunsBySave);
}

console.log('\nDone.');
