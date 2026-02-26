import React, { useEffect, useState, useRef } from 'react';
import { useTimerStore } from '../store/useTimerStore';
import { formatTime } from '../utils/timeFormat';

export const Timer: React.FC = () => {
    const {
        state, scramble, scrambleImage, currentTime,
        startSolve, stopSolve, markSplit, resetTimer,
        currentPhase, crossTime, f2lTime, ollTime, pllTime
    } = useTimerStore();

    // Fetch initial scramble on mount
    useEffect(() => {
        if (scramble === 'Loading...') {
            useTimerStore.getState().nextScramble();
        }
    }, [scramble]);

    const [displayTime, setDisplayTime] = useState(0);
    const lastToggleTime = useRef(0);

    useEffect(() => {
        let interval: number;
        if (state === 'SOLVING') {
            interval = setInterval(() => {
                setDisplayTime(Date.now() - useTimerStore.getState().startTime);
            }, 11);
        } else if (state === 'STOPPED') {
            setDisplayTime(currentTime);
        } else if (state === 'IDLE') {
            setDisplayTime(0);
        }

        return () => clearInterval(interval);
    }, [state, currentTime]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.repeat) return;
            if (e.code === 'Space') {
                e.preventDefault();

                const now = Date.now();
                if (now - lastToggleTime.current < 300) return; // debounce 300ms
                lastToggleTime.current = now;

                const currState = useTimerStore.getState().state;
                if (currState === 'IDLE') {
                    startSolve();
                } else if (currState === 'STOPPED') {
                    resetTimer();
                } else if (currState === 'SOLVING') {
                    stopSolve();
                }
            } else if (e.key === 'c' || e.key === 'C') {
                if (useTimerStore.getState().state === 'SOLVING') {
                    markSplit();
                }
            } else if (e.key === 'Escape') {
                resetTimer();
            }
        };

        const handleKeyUp = () => {
            // No action needed on key up anymore
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []); // remove state dependency from key listeners

    return (
        <div className="timer-section">
            <div className="scramble-display">{scramble}</div>
            
            <div className="timer-layout">
                <div className="cube-image-container">
                    {scrambleImage && (
                        <img 
                            src={scrambleImage} 
                            alt="Scramble visualization" 
                            className="cube-image"
                        />
                    )}
                </div>
                <div className={`time-display ${state === 'READY' ? 'ready' : ''}`}>
                    {formatTime(displayTime)}
                </div>
                <div className="timer-layout-spacer"></div>
            </div>

            <div className="splits-container">
                <div className="split-item" style={{ opacity: currentPhase === 'CROSS' || crossTime ? 1 : 0.5 }}>
                    <span className="split-label">Cross</span>
                    <span className="split-time">{formatTime(crossTime)}</span>
                </div>
                <div className="split-item" style={{ opacity: currentPhase === 'F2L' || f2lTime ? 1 : 0.5 }}>
                    <span className="split-label">F2L</span>
                    <span className="split-time">{formatTime(f2lTime)}</span>
                </div>
                <div className="split-item" style={{ opacity: currentPhase === 'OLL' || ollTime ? 1 : 0.5 }}>
                    <span className="split-label">OLL</span>
                    <span className="split-time">{formatTime(ollTime)}</span>
                </div>
                <div className="split-item" style={{ opacity: currentPhase === 'PLL' || pllTime ? 1 : 0.5 }}>
                    <span className="split-label">PLL</span>
                    <span className="split-time">{formatTime(pllTime)}</span>
                </div>
            </div>

            <div style={{ marginTop: '2rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                <p>Press &lt;Space&gt; to start / stop the timer.</p>
                <p>Press 'C' to mark CFOP phase split.</p>
                <p>Press &lt;Esc&gt; to reset.</p>
            </div>
        </div>
    );
};
