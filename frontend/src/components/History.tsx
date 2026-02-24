import React, { useEffect } from 'react';
import { useTimerStore } from '../store/useTimerStore';
import { formatTime } from '../utils/timeFormat';
import { Trash2 } from 'lucide-react';

export const History: React.FC = () => {
    const { solves, fetchSolves, deleteSolve, updatePenalty } = useTimerStore();

    useEffect(() => {
        fetchSolves();
    }, [fetchSolves]);

    const getDisplayTime = (solve: any) => {
        if (solve.penalty === 'DNF') return 'DNF';
        if (solve.penalty === 'PLUS_TWO') return formatTime(solve.totalTimeMillis) + '+';
        return formatTime(solve.totalTimeMillis);
    };

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 className="card-title">Session History</h2>
            {solves.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No solves yet.</p>
            ) : (
                <div className="history-list">
                    {solves.map((solve, idx) => (
                        <div key={solve.id} className="history-item" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.5rem', padding: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <span className="history-index" style={{ marginRight: '0.5rem', color: 'var(--text-muted)' }}>{solves.length - idx}.</span>
                                    <span className="history-time" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{getDisplayTime(solve)}</span>
                                    <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        ({(solve.totalTimeMillis / 1000).toFixed(2)}s)
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    {new Date(solve.timestamp || Date.now()).toLocaleString()}
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                <button
                                    className={`btn penalty-btn ${solve.penalty === 'PLUS_TWO' ? 'active' : ''}`}
                                    onClick={() => updatePenalty(solve.id, solve.penalty === 'PLUS_TWO' ? 'NONE' : 'PLUS_TWO')}
                                    title="+2 Penalty"
                                >
                                    +2
                                </button>
                                <button
                                    className={`btn penalty-btn ${solve.penalty === 'DNF' ? 'active' : ''}`}
                                    onClick={() => updatePenalty(solve.id, solve.penalty === 'DNF' ? 'NONE' : 'DNF')}
                                    title="DNF Penalty"
                                >
                                    DNF
                                </button>
                                <button className="btn penalty-btn" onClick={() => deleteSolve(solve.id)} title="Delete Solve">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
