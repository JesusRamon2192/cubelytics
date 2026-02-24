import React, { useEffect } from 'react';
import { useTimerStore } from '../store/useTimerStore';
import { formatTime } from '../utils/timeFormat';

export const Stats: React.FC = () => {
    const { stats, fetchStats } = useTimerStore();

    useEffect(() => {
        fetchStats();
    }, []);

    if (!stats || stats.totalSolves === 0) {
        return (
            <div className="card">
                <h2 className="card-title">Statistics</h2>
                <p style={{ color: 'var(--text-muted)' }}>No solves yet.</p>
            </div>
        );
    }

    return (
        <div className="card">
            <h2 className="card-title">Statistics ({stats.totalSolves} solves)</h2>
            <div className="stats-grid">
                <div className="stat-item">
                    <span className="stat-label">Best</span>
                    <span className="stat-value">{formatTime(stats.bestTime)}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Ao5</span>
                    <span className="stat-value">{formatTime(stats.currentAo5)}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Ao12</span>
                    <span className="stat-value">{formatTime(stats.currentAo12)}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Mean</span>
                    <span className="stat-value">{formatTime(stats.sessionMean)}</span>
                </div>
            </div>

            <h3 className="card-title" style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>CFOP Splits Analysis</h3>
            <div className="stats-grid">
                <div className="stat-item">
                    <span className="stat-label">Cross</span>
                    <span className="stat-value">{stats.crossPercentage?.toFixed(1) || 0}%</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">F2L</span>
                    <span className="stat-value">{stats.f2lPercentage?.toFixed(1) || 0}%</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">OLL</span>
                    <span className="stat-value">{stats.ollPercentage?.toFixed(1) || 0}%</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">PLL</span>
                    <span className="stat-value">{stats.pllPercentage?.toFixed(1) || 0}%</span>
                </div>
            </div>
            {stats.slowestPhase && stats.slowestPhase !== 'NONE' && (
                <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Needs improvement: <strong style={{ color: 'var(--error-color)' }}>{stats.slowestPhase}</strong>
                </div>
            )}
        </div>
    );
};
