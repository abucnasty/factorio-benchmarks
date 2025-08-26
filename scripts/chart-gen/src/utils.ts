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
  return Math.max(...array)
}

export function min(array: number[]): number {
  return Math.min(...array)
}

export function percentDecrease(startingValue: number, endingValue: number): number {
  return (startingValue - endingValue) / Math.abs(startingValue) * 100
}

export function percentDifference(startingValue: number, endingValue: number): number {
  return Math.abs(endingValue - startingValue) / (Math.abs(endingValue + startingValue) / 2) * 100
}