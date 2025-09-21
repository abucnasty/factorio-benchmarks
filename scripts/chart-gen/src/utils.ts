import { MetricValue } from "./data/BenchmarkTickResult";

export function average(array: number[]): number {
  return array.reduce((sum, val) => sum + val, 0) / array.length;
}

export function nanoToMicro(nano: number): number {
  return nano / 1000; // convert nanoseconds to microseconds
}

export function standardDeviation(array: number[]): number {
  const n = array.length
  const mean = array.reduce((a, b) => a + b) / n
  return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}

export function max(array: number[]): number {
  const sorted = [...array].sort((a, b) => a - b)
  return sorted[sorted.length - 1]
}

export function min(array: number[]): number {
  const sorted = [...array].sort((a, b) => a - b)
  return sorted[0]
}

export function median(array: number[]): number {
  if (array.length === 0) {
    return null; // Or throw an error, depending on desired behavior
  }

  const sortedArr = [...array].sort((a, b) => a - b);
  const mid = Math.floor(sortedArr.length / 2);

  if (sortedArr.length % 2 === 0) {
    // even length
    return (sortedArr[mid - 1] + sortedArr[mid]) / 2;
  } else {
    // odd length
    return sortedArr[mid];
  }
}

export function percentDecrease(startingValue: number, endingValue: number): number {
  return (startingValue - endingValue) / Math.abs(startingValue) * 100
}

export function percentDifference(startingValue: number, endingValue: number): number {
  return Math.abs(endingValue - startingValue) / (Math.abs(endingValue + startingValue) / 2) * 100
}

/**
 * Computes a time-weighted average over a tick-based window.
 * 
 * @param data - Array of { tick, value } points. Assumed sorted by tick ascending.
 * @param window - Number of ticks to look back from the last tick.
 * @returns Time-weighted average value within the window.
 */
export function timeWeightedAverage(data: MetricValue[], window: number): number {
  if (data.length === 0) return 0;

  // Ensure sorted by tick
  const sorted = [...data].sort((a, b) => a.tick - b.tick);

  const endTick = sorted[sorted.length - 1].tick;
  const startTick = endTick - window;

  let weightedSum = 0;
  let totalDuration = 0;

  for (let i = sorted.length - 1; i >= 0; i--) {
    const current = sorted[i];
    const prev = i > 0 ? sorted[i - 1] : null;

    // Segment boundaries
    const segStart = Math.max(startTick, prev ? prev.tick : -Infinity);
    const segEnd = Math.min(endTick, current.tick);

    if (segEnd <= startTick) break; // Out of window
    if (segStart >= endTick) continue; // Too new

    const duration = segEnd - segStart;
    if (duration > 0) {
      weightedSum += current.value * duration;
      totalDuration += duration;
    }
  }

  return totalDuration > 0 ? weightedSum / totalDuration : 0;
}

/**
 * Splits the timeline into fixed-size windows and computes
 * the time-weighted average per window.
 *
 * @param data - Array of { tick, value } points. Assumed sorted ascending by tick.
 * @param window - Size of each window in ticks.
 * @returns Array of { windowStart, windowEnd, twa }.
 */
export function timeWeightedAverageByChunks(
  data: MetricValue[],
  window: number
): { tick: number; tickEnd: number; value: number }[] {
  if (data.length === 0) return [];

  // Ensure sorted by tick
  const sorted = [...data].sort((a, b) => a.tick - b.tick);

  const results: { tick: number; tickEnd: number; value: number }[] = [];

  const minTick = sorted[0].tick;
  const maxTick = sorted[sorted.length - 1].tick;
  const firstWindowStart = Math.floor(minTick / window) * window;

  for (let wStart = firstWindowStart; wStart <= maxTick; wStart += window) {
    const wEnd = wStart + window;
    let weightedSum = 0;
    let totalDuration = 0;

    for (let i = 0; i < sorted.length; i++) {
      const current = sorted[i];
      const next = i + 1 < sorted.length ? sorted[i + 1] : null;

      const segStart = Math.max(wStart, current.tick);
      const segEnd = Math.min(wEnd, next ? next.tick : wEnd);

      if (segEnd <= wStart) continue; // before window
      if (segStart >= wEnd) break;    // after window

      const duration = segEnd - segStart;
      if (duration > 0) {
        weightedSum += current.value * duration;
        totalDuration += duration;
      }
    }

    results.push({
      tick: wStart,
      tickEnd: wEnd,
      value: totalDuration > 0 ? weightedSum / totalDuration : 0,
    });
  }

  return results;
}