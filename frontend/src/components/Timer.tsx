// @ts-nocheck
/* eslint-disable */
import React, { useEffect } from 'react';
import { useTimerStore } from '../store/useTimerStore';
import { formatTime } from '../utils/timeFormat';
import { Trash2 } from 'lucide-react';
import { useTimerController } from '../hooks/useTimerController';
import { TimerInteractiveZone } from './timer/TimerInteractiveZone';

export const Timer: React.FC = () => {
    const {
        state, scramble, scrambleImage, currentTime,
        startSolve, stopSolve, markSplit, resetTimer,
        currentPhase, crossTime, f2lTime, ollTime, pllTime,
        stats, fetchStats, solves, updatePenalty, deleteSolve
    } = useTimerStore();

    // Fetch initial scramble and stats on mount
    useEffect(() => {
        if (scramble === 'Loading...') {
            useTimerStore.getState().nextScramble();
        }
        fetchStats();
    }, [scramble]);

    const { displayTime, handleTriggerStart, handleTriggerEnd } = useTimerController();

    return (
        <div className="timer-section">
            <div className="scramble-display">{scramble}</div>
            
            <TimerInteractiveZone 
                onTriggerStart={handleTriggerStart} 
                onTriggerEnd={handleTriggerEnd}
            >
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
                        {state === 'STOPPED' && solves.length > 0
                            ? (solves[0].penalty === 'DNF'
                                ? 'DNF'
                                : (solves[0].penalty === 'PLUS_TWO'
                                    ? formatTime(solves[0].totalTimeMillis) + '+'
                                    : formatTime(solves[0].totalTimeMillis)))
                            : formatTime(displayTime)}
                    </div>
                    <div className="timer-layout-spacer"></div>
                </div>
            </TimerInteractiveZone>

            {/* Actions for Latest Solve */}
            {state === 'STOPPED' && solves.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '-1rem', marginBottom: '1.5rem', zIndex: 10 }}>
                    <button
                        className={`btn penalty-btn ${solves[0].penalty === 'PLUS_TWO' ? 'active' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            updatePenalty(solves[0].id, solves[0].penalty === 'PLUS_TWO' ? 'NONE' : 'PLUS_TWO');
                        }}
                        title="+2 Penalty"
                        style={{ padding: '0.6rem 1.2rem', fontSize: '1rem', marginLeft: 0 }}
                    >
                        +2
                    </button>
                    <button
                        className={`btn penalty-btn ${solves[0].penalty === 'DNF' ? 'active' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            updatePenalty(solves[0].id, solves[0].penalty === 'DNF' ? 'NONE' : 'DNF');
                        }}
                        title="DNF Penalty"
                        style={{ padding: '0.6rem 1.2rem', fontSize: '1rem', marginLeft: 0 }}
                    >
                        DNF
                    </button>
                    <button 
                        className="btn penalty-btn" 
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteSolve(solves[0].id);
                            resetTimer();
                        }} 
                        title="Delete Solve"
                        style={{ padding: '0.6rem 1.2rem', marginLeft: 0 }}
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            )}

            {/* Desktop Splits */}
            <div className="splits-container desktop-splits">
                <div className={`split-item ${currentPhase === 'CROSS' ? 'active' : ''}`} style={{ opacity: currentPhase === 'CROSS' || crossTime ? 1 : 0.5 }}>
                    <span className="split-label">Cross</span>
                    <span className="split-time">{formatTime(crossTime)}</span>
                </div>
                <div className={`split-item ${currentPhase === 'F2L' ? 'active' : ''}`} style={{ opacity: currentPhase === 'F2L' || f2lTime ? 1 : 0.5 }}>
                    <span className="split-label">F2L</span>
                    <span className="split-time">{formatTime(f2lTime)}</span>
                </div>
                <div className={`split-item ${currentPhase === 'OLL' ? 'active' : ''}`} style={{ opacity: currentPhase === 'OLL' || ollTime ? 1 : 0.5 }}>
                    <span className="split-label">OLL</span>
                    <span className="split-time">{formatTime(ollTime)}</span>
                </div>
                <div className={`split-item ${currentPhase === 'PLL' ? 'active' : ''}`} style={{ opacity: currentPhase === 'PLL' || pllTime ? 1 : 0.5 }}>
                    <span className="split-label">PLL</span>
                    <span className="split-time">{formatTime(pllTime)}</span>
                </div>
            </div>

            {/* Mobile Combined Grid */}
            <div className="mobile-cfop-grid glass-panel">
                <table className="mobile-grid-table">
                    <thead>
                        <tr>
                            <th className={currentPhase === 'CROSS' ? 'active-header' : ''}>CROSS</th>
                            <th className={currentPhase === 'F2L' ? 'active-header' : ''}>F2L</th>
                            <th className={currentPhase === 'OLL' ? 'active-header' : ''}>OLL</th>
                            <th className={currentPhase === 'PLL' ? 'active-header' : ''}>PLL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="split-times-row">
                            <td className={currentPhase === 'CROSS' ? 'active-cell' : ''} style={{ opacity: currentPhase === 'CROSS' || crossTime ? 1 : 0.5 }}>{formatTime(crossTime)}</td>
                            <td className={currentPhase === 'F2L' ? 'active-cell' : ''} style={{ opacity: currentPhase === 'F2L' || f2lTime ? 1 : 0.5 }}>{formatTime(f2lTime)}</td>
                            <td className={currentPhase === 'OLL' ? 'active-cell' : ''} style={{ opacity: currentPhase === 'OLL' || ollTime ? 1 : 0.5 }}>{formatTime(ollTime)}</td>
                            <td className={currentPhase === 'PLL' ? 'active-cell' : ''} style={{ opacity: currentPhase === 'PLL' || pllTime ? 1 : 0.5 }}>{formatTime(pllTime)}</td>
                        </tr>
                        {stats && stats.totalSolves > 0 && (
                            <tr className="stats-percentages-row">
                                <td className="phase-cross">{stats.crossPercentage?.toFixed(1) || 0}%</td>
                                <td className="phase-f2l">{stats.f2lPercentage?.toFixed(1) || 0}%</td>
                                <td className="phase-oll">{stats.ollPercentage?.toFixed(1) || 0}%</td>
                                <td className="phase-pll">{stats.pllPercentage?.toFixed(1) || 0}%</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
