import { useTimerStore } from '../store/useTimerStore';

export const useSplitMode = () => {
    const splitMode = useTimerStore((state) => state.splitMode);
    const toggleSplitMode = useTimerStore((state) => state.toggleSplitMode);

    return {
        splitMode,
        toggleSplitMode,
    };
};
