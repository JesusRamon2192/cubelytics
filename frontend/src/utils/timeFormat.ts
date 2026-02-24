export const formatTime = (timeMillis: number | null | undefined): string => {
    if (timeMillis === null || timeMillis === undefined) return "--";
    if (timeMillis >= 2147483647) return "DNF"; // MAX_INT

    const minutes = Math.floor(timeMillis / 60000);
    const seconds = Math.floor((timeMillis % 60000) / 1000);
    const centiseconds = Math.floor((timeMillis % 1000) / 10);

    const css = centiseconds.toString().padStart(2, '0');
    const ss = seconds.toString().padStart(2, '0');

    if (minutes > 0) {
        return `${minutes}:${ss}.${css}`;
    }
    return `${seconds}.${css}`;
};
