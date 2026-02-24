export type Penalty = 'NONE' | 'PLUS_TWO' | 'DNF';

export interface Solve {
    id: string;
    scramble: string;
    totalTimeMillis: number;
    penalty: Penalty;
    crossTimeMillis?: number | null;
    f2lTimeMillis?: number | null;
    ollTimeMillis?: number | null;
    pllTimeMillis?: number | null;
    timestamp: string;
}

export interface CreateSolveDto {
    scramble: string;
    totalTimeMillis: number;
    penalty?: Penalty;
    crossTimeMillis?: number;
    f2lTimeMillis?: number;
    ollTimeMillis?: number;
    pllTimeMillis?: number;
}

export interface Stats {
    totalSolves: number;
    bestTime: number | null;
    currentAo5: number | null;
    currentAo12: number | null;
    currentAo50: number | null;
    currentAo100: number | null;
    sessionMean: number | null;
    standardDeviation: number | null;
    avgCrossTime: number | null;
    avgF2lTime: number | null;
    avgOllTime: number | null;
    avgPllTime: number | null;
    crossPercentage: number | null;
    f2lPercentage: number | null;
    ollPercentage: number | null;
    pllPercentage: number | null;
    slowestPhase: string | null;
}
