export function powerset<T>(array: T[], maxSize: number, includeEmpty: boolean = false): T[][] {
  const result: T[][] = [[]];

  for (const item of array) {
    const newSubsets = result
      .filter(subset => subset.length < maxSize)
      .map(subset => [...subset, item]);

    result.push(...newSubsets);
  }

  return includeEmpty ? result : result.filter(subset => subset.length > 0);
}