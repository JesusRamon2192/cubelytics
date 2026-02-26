import { create } from 'zustand';
import type { Solve, Stats, CreateSolveDto, Penalty } from '../types';
import { apiClient } from '../api/apiClient';
import { fetchScramble } from '../api/scrambleService';

export type TimerState = 'IDLE' | 'INSPECTING' | 'READY' | 'SOLVING' | 'STOPPED';
export type Phase = 'CROSS' | 'F2L' | 'OLL' | 'PLL' | 'DONE';

interface TimerStore {
    state: TimerState;
    scramble: string;
    scrambleImage: string;
    solves: Solve[];
    stats: Stats | null;

    // Timer specific
    startTime: number;
    inspectionStart: number;
    currentTime: number;

    // Splits
    currentPhase: Phase;
    crossTime: number | null;
    f2lTime: number | null;
    ollTime: number | null;
    pllTime: number | null;

    // Actions
    setState: (s: TimerState) => void;
    nextScramble: () => void;
    startInspection: () => void;
    startSolve: () => void;
    markSplit: () => void;
    stopSolve: () => void;
    resetTimer: () => void;

    // API Actions
    fetchSolves: () => Promise<void>;
    fetchStats: () => Promise<void>;
    deleteSolve: (id: string) => Promise<void>;
    updatePenalty: (id: string, penalty: Penalty) => Promise<void>;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
    state: 'IDLE',
    scramble: 'Loading...',
    scrambleImage: '',
    solves: [],
    stats: null,

    startTime: 0,
    inspectionStart: 0,
    currentTime: 0,

    currentPhase: 'CROSS',
    crossTime: null,
    f2lTime: null,
    ollTime: null,
    pllTime: null,

    setState: (s) => set({ state: s }),

    nextScramble: async () => {
        const data = await fetchScramble();
        set({ scramble: data.scramble, scrambleImage: data.imagen });
    },

    startInspection: () => {
        set({
            state: 'INSPECTING',
            inspectionStart: Date.now(),
            currentTime: 0,
            currentPhase: 'CROSS',
            crossTime: null,
            f2lTime: null,
            ollTime: null,
            pllTime: null,
        });
    },

    startSolve: () => {
        set({
            state: 'SOLVING',
            startTime: Date.now(),
            currentTime: 0,
            currentPhase: 'CROSS',
        });
    },

    markSplit: () => {
        const { state, currentPhase, startTime } = get();
        if (state !== 'SOLVING') return;

        const now = Date.now();
        const elapsed = now - startTime;

        switch (currentPhase) {
            case 'CROSS':
                set({ crossTime: elapsed, currentPhase: 'F2L' });
                break;
            case 'F2L':
                set({ f2lTime: elapsed - (get().crossTime || 0), currentPhase: 'OLL' });
                break;
            case 'OLL':
                set({ ollTime: elapsed - (get().crossTime || 0) - (get().f2lTime || 0), currentPhase: 'PLL' });
                break;
            case 'PLL':
                set({ pllTime: elapsed - (get().crossTime || 0) - (get().f2lTime || 0) - (get().ollTime || 0), currentPhase: 'DONE' });
                get().stopSolve();
                break;
            case 'DONE':
                break;
        }
    },

    stopSolve: async () => {
        const { state, startTime, scramble, crossTime, f2lTime, ollTime, pllTime } = get();
        if (state !== 'SOLVING') return;

        const totalTimeMillis = Date.now() - startTime;
        set({ state: 'STOPPED', currentTime: totalTimeMillis });

        // Save solve
        const dto: CreateSolveDto = {
            scramble,
            totalTimeMillis,
            crossTimeMillis: crossTime || undefined,
            f2lTimeMillis: f2lTime || undefined,
            ollTimeMillis: ollTime || undefined,
            pllTimeMillis: pllTime || undefined,
        };

        // Optimistic local save
        const tempSolve: Solve = {
            id: `temp-${Date.now()}`,
            scramble,
            totalTimeMillis,
            penalty: 'NONE',
            crossTimeMillis: crossTime || null,
            f2lTimeMillis: f2lTime || null,
            ollTimeMillis: ollTime || null,
            pllTimeMillis: pllTime || null,
            timestamp: new Date().toISOString()
        };

        set((state) => ({ solves: [tempSolve, ...state.solves] }));

        try {
            await apiClient.post('/api/v1/solves', dto);
            await get().fetchSolves();
            await get().fetchStats();
        } catch (e) {
            console.error("Failed to save solve", e);
            // Revert optimistic save on failure
            set((state) => ({ solves: state.solves.filter(s => s.id !== tempSolve.id) }));
        }
    },

    resetTimer: () => {
        get().nextScramble();
        set({
            state: 'IDLE',
            currentTime: 0,
            crossTime: null,
            f2lTime: null,
            ollTime: null,
            pllTime: null,
            currentPhase: 'CROSS'
        });
    },

    fetchSolves: async () => {
        try {
            const data = await apiClient.get('/api/v1/solves?size=50');
            set({ solves: data.content });
        } catch (e) {
            console.error("Failed to fetch solves", e);
        }
    },

    fetchStats: async () => {
        try {
            const data = await apiClient.get('/api/v1/stats');
            set({ stats: data });
        } catch (e) {
            console.error("Failed to fetch stats", e);
        }
    },

    deleteSolve: async (id: string) => {
        // Optimistic UI update
        const previousSolves = get().solves;
        set({ solves: previousSolves.filter(s => s.id !== id) });

        try {
            if (!id.startsWith('temp-')) {
                await apiClient.delete(`/api/v1/solves/${id}`);
            }
            await get().fetchSolves();
            await get().fetchStats();
        } catch (e) {
            console.error("Failed to delete solve", e);
            // Revert on failure
            set({ solves: previousSolves });
        }
    },

    updatePenalty: async (id: string, penalty: Penalty) => {
        try {
            await apiClient.patch(`/api/v1/solves/${id}/penalty?penalty=${penalty}`);
            await get().fetchSolves();
            await get().fetchStats();
        } catch (e) {
            console.error("Failed to update penalty", e);
        }
    }

}));
