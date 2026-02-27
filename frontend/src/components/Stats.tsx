import React, { useEffect } from 'react';
import { useTimerStore } from '../store/useTimerStore';
import { formatTime } from '../utils/timeFormat';

export const Stats: React.FC = () => {
    const { stats, fetchStats } = useTimerStore();

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    if (!stats || stats.totalSolves === 0) {
        return (
            <div className="card compact-stats-card">
                <h2 className="card-title">Statistics</h2>
                <p style={{ color: 'var(--text-muted)' }}>No solves yet.</p>
            </div>
        );
    }

    return (
        <div className="card compact-stats-card">
            <h2 className="card-title" style={{ marginBottom: '1rem', justifyContent: 'space-between', width: '100%' }}>
                <span className="title-text">Statistics</span>
                <span className="title-badge">{stats.totalSolves} solves</span>
            </h2>

            <div className="compact-stats-grid">
                <div className="compact-stat">
                    <span className="compact-label">Best</span>
                    <span className="compact-value">{formatTime(stats.bestTime)}</span>
                </div>
                <div className="compact-stat">
                    <span className="compact-label">Ao5</span>
                    <span className="compact-value">{formatTime(stats.currentAo5)}</span>
                </div>
                <div className="compact-stat">
                    <span className="compact-label">Ao12</span>
                    <span className="compact-value">{formatTime(stats.currentAo12)}</span>
                </div>
                <div className="compact-stat">
                    <span className="compact-label">Mean</span>
                    <span className="compact-value">{formatTime(stats.sessionMean)}</span>
                </div>
            </div>

            <div className="stats-divider"></div>

            <div className="cfop-distribution">
                <div className="cfop-title">CFOP Distribution</div>
                <div className="cfop-splits-row">
                    <div className="cfop-split-item">
                        <span className="phase-label">Cross</span>
                        <span className="phase-value phase-cross">{stats.crossPercentage?.toFixed(1) || 0}%</span>
                    </div>
                    <div className="cfop-split-divider"></div>
                    <div className="cfop-split-item">
                        <span className="phase-label">F2L</span>
                        <span className="phase-value phase-f2l">{stats.f2lPercentage?.toFixed(1) || 0}%</span>
                    </div>
                </div>
                <div className="cfop-splits-row" style={{ marginTop: '0.4rem' }}>
                    <div className="cfop-split-item">
                        <span className="phase-label">OLL</span>
                        <span className="phase-value phase-oll">{stats.ollPercentage?.toFixed(1) || 0}%</span>
                    </div>
                    <div className="cfop-split-divider"></div>
                    <div className="cfop-split-item">
                        <span className="phase-label">PLL</span>
                        <span className="phase-value phase-pll">{stats.pllPercentage?.toFixed(1) || 0}%</span>
                    </div>
                </div>
            </div>

            {stats.slowestPhase && stats.slowestPhase !== 'NONE' && (
                <div className="needs-improvement">
                    Needs improvement: <strong className={`phase-${stats.slowestPhase.toLowerCase()}`}>{stats.slowestPhase}</strong>
                </div>
            )}
        </div>
    );
};
