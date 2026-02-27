import React, { useEffect, useState } from 'react';
import { useTimerStore } from '../../store/useTimerStore';
import { formatTime } from '../../utils/timeFormat';
import { Trash2, X } from 'lucide-react';
import type { Solve } from '../../types';
import './HistoricView.css';

export const HistoricView: React.FC = () => {
    const { solves, fetchSolves, deleteSolve, updatePenalty } = useTimerStore();
    const [selectedSolve, setSelectedSolve] = useState<Solve | null>(null);

    useEffect(() => {
        fetchSolves();
    }, [fetchSolves]);

    const getDisplayTime = (solve: Solve) => {
        if (solve.penalty === 'DNF') return 'DNF';
        if (solve.penalty === 'PLUS_TWO') return formatTime(solve.totalTimeMillis) + '+';
        return formatTime(solve.totalTimeMillis);
    };

    const formatDateShort = (timestamp: string | number | undefined) => {
        if (!timestamp) return '---';
        const d = new Date(timestamp);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        return `${day}/${month}`;
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setSelectedSolve(null);
        }
    };

    return (
        <div className="historic-page">
            <h2 className="historic-page-title">Session History</h2>
            {solves.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No solves yet.</p>
            ) : (
                <div className="historic-grid">
                    {solves.map((solve) => (
                        <div key={solve.id} className="historic-card glass-panel" onClick={() => setSelectedSolve(solve)}>
                            <div className="hc-date">{formatDateShort(solve.timestamp)}</div>
                            <div className="hc-time">{getDisplayTime(solve)}</div>
                        </div>
                    ))}
                </div>
            )}

            {selectedSolve && (
                <div className="historic-modal-overlay" onClick={handleBackdropClick}>
                    <div className="historic-modal-content glass-panel" onClick={e => e.stopPropagation()}>
                        <button className="historic-modal-close" onClick={() => setSelectedSolve(null)}>
                            <X size={20} />
                        </button>
                        <h3 className="historic-modal-title">Solve Details</h3>
                        
                        <div className="historic-modal-main-time">
                            {getDisplayTime(selectedSolve)}
                            <span className="historic-modal-raw-time">
                                ({(selectedSolve.totalTimeMillis / 1000).toFixed(2)}s)
                            </span>
                        </div>
                        
                        <div className="historic-modal-date">
                            {selectedSolve.timestamp ? new Date(selectedSolve.timestamp).toLocaleString() : '---'}
                        </div>

                        {selectedSolve.scramble && (
                            <div className="historic-modal-scramble">
                                <span className="scramble-label">Scramble:</span>
                                <div>{selectedSolve.scramble}</div>
                            </div>
                        )}

                        <div className="historic-modal-actions">
                            <button
                                className={`btn penalty-btn ${selectedSolve.penalty === 'PLUS_TWO' ? 'active' : ''}`}
                                onClick={() => updatePenalty(selectedSolve.id, selectedSolve.penalty === 'PLUS_TWO' ? 'NONE' : 'PLUS_TWO')}
                                title="+2 Penalty"
                            >
                                +2
                            </button>
                            <button
                                className={`btn penalty-btn ${selectedSolve.penalty === 'DNF' ? 'active' : ''}`}
                                onClick={() => updatePenalty(selectedSolve.id, selectedSolve.penalty === 'DNF' ? 'NONE' : 'DNF')}
                                title="DNF Penalty"
                            >
                                DNF
                            </button>
                            <button 
                                className="btn penalty-btn" 
                                onClick={() => {
                                    deleteSolve(selectedSolve.id);
                                    setSelectedSolve(null);
                                }} 
                                title="Delete Solve"
                                style={{ marginLeft: 'auto', padding: '0.6rem' }}
                            >
                                <Trash2 size={16} /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
