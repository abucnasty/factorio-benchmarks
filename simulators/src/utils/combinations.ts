export const combinationsWithRepeats = <T>(items: T[], size: number): T[][] => {
    const result: T[][] = [];

    const helper = (
        start: number,
        combo: T[]
    ): void => {
        if (combo.length === size) {
            result.push([...combo]);
            return;
        }

        for (let i = start; i < items.length; i++) {
            combo.push(items[i]);
            helper(i, combo); // allow repeats
            combo.pop();
        }
    };

    helper(0, []);
    return result;
};