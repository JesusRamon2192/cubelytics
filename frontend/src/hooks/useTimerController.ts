import { useEffect, useState } from 'react';
import { useTimerStore } from '../store/useTimerStore';

export const useTimerController = () => {
    const { state, currentTime, startSolve, stopSolve, resetTimer, markSplit } = useTimerStore();
    const [displayTime, setDisplayTime] = useState(0);

    // Sync display time with store state
    useEffect(() => {
        let interval: number;
        if (state === 'SOLVING') {
            interval = window.setInterval(() => {
                setDisplayTime(Date.now() - useTimerStore.getState().startTime);
            }, 11);
        } else if (state === 'STOPPED') {
            setDisplayTime(currentTime);
        } else if (state === 'IDLE') {
            setDisplayTime(0);
        }

        return () => clearInterval(interval);
    }, [state, currentTime]);

    const handleTriggerStart = () => {
        const currState = useTimerStore.getState().state;
        if (currState === 'IDLE' || currState === 'STOPPED') {
            if (currState === 'STOPPED') resetTimer();
            useTimerStore.getState().setState('READY');
        } else if (currState === 'SOLVING') {
            stopSolve();
        }
    };

    const handleTriggerEnd = () => {
        const currState = useTimerStore.getState().state;
        if (currState === 'READY') {
            startSolve();
        }
    };

    // Global keyboard listeners (Spacebar, Escape, C for splits)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return; // Ignore if user is typing in an input
            }
            if (e.repeat) return;
            
            if (e.code === 'Space') {
                e.preventDefault();
                handleTriggerStart();
            } else if (e.key === 'c' || e.key === 'C') {
                if (useTimerStore.getState().state === 'SOLVING') {
                    markSplit();
                }
            } else if (e.key === 'Escape') {
                resetTimer();
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }
            if (e.code === 'Space') {
                e.preventDefault();
                handleTriggerEnd();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return {
        displayTime,
        handleTriggerStart,
        handleTriggerEnd
    };
};
