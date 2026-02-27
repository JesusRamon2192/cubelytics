export const calculateAverage = (times: number[]): number => {
    if (times.length === 0) return 0;
    return times.reduce((a, b) => a + b, 0) / times.length;
};

export const calculateAoX = (times: number[], x: number): number | null => {
    if (times.length < x) return null;
    const recent = [...times].slice(-x); // Get last x elements
    recent.sort((a, b) => a - b);
    // Remove best and worst
    const trimmed = recent.slice(1, -1);
    return calculateAverage(trimmed);
};

export const calculateStandardDeviation = (times: number[]): number => {
    if (times.length === 0) return 0;
    const average = calculateAverage(times);
    const squareDiffs = times.map((value) => Math.pow(value - average, 2));
    const avgSquareDiff = calculateAverage(squareDiffs);
    return Math.sqrt(avgSquareDiff);
};

export const calculateVariance = (times: number[]): number => {
    if (times.length === 0) return 0;
    const average = calculateAverage(times);
    const squareDiffs = times.map((value) => Math.pow(value - average, 2));
    return calculateAverage(squareDiffs);
};

export const calculateMovingAverage = (times: number[], windowSize: number): (number | null)[] => {
    const result: (number | null)[] = [];
    for (let i = 0; i < times.length; i++) {
        if (i < windowSize - 1) {
            result.push(null);
        } else {
            const windowData = times.slice(i - windowSize + 1, i + 1);
            result.push(calculateAverage(windowData));
        }
    }
    return result;
};
