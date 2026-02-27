import React from 'react';
import { GeneralProgressChart } from './components/GeneralProgressChart';
import { AveragesChart } from './components/AveragesChart';
import { CfopPhasesChart } from './components/CfopPhasesChart';
import { ConsistencyHistogram } from './components/ConsistencyHistogram';

interface DesktopAnalyticsLayoutProps {
    validSolvesCount: number;
    stats: any;
    generalProgress: any;
    averagesProgress: any;
    cfopPhases: any;
    consistency: any;
}

export const DesktopAnalyticsLayout: React.FC<DesktopAnalyticsLayoutProps> = ({
    validSolvesCount,
    stats,
    generalProgress,
    averagesProgress,
    cfopPhases,
    consistency
}) => {
    if (validSolvesCount === 0) {
        return (
            <div className="analytics-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <h2 style={{ color: 'var(--text-muted)' }}>Not enough data for analytics. Do some solves first!</h2>
            </div>
        );
    }

    return (
        <div className="analytics-container">
            <div className="analytics-header">
                <div>
                    <h2 className="analytics-title">Analytics Dashboard</h2>
                    <p className="analytics-subtitle">Analyze your CFOP performance over time</p>
                </div>
            </div>

            <div className="kpi-grid">
                <div className="kpi-card glass-panel">
                    <span className="kpi-label">Total Solves</span>
                    <span className="kpi-value">{validSolvesCount}</span>
                </div>
                <div className="kpi-card glass-panel">
                    <span className="kpi-label">Session Mean</span>
                    <span className="kpi-value">
                        {stats?.sessionMean ? (stats.sessionMean / 1000).toFixed(2) + 's' : '-'}
                    </span>
                </div>
                <div className="kpi-card glass-panel">
                    <span className="kpi-label">Best Time</span>
                    <span className="kpi-value" style={{ color: 'var(--success-color)' }}>
                        {stats?.bestTime ? (stats.bestTime / 1000).toFixed(2) + 's' : '-'}
                    </span>
                </div>
                <div className="kpi-card glass-panel">
                    <span className="kpi-label">Current Ao12</span>
                    <span className="kpi-value">
                        {stats?.currentAo12 ? (stats.currentAo12 / 1000).toFixed(2) + 's' : '-'}
                    </span>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-card glass-panel"><GeneralProgressChart data={generalProgress} /></div>
                <div className="chart-card glass-panel"><AveragesChart data={averagesProgress} /></div>
                <div className="chart-card glass-panel"><CfopPhasesChart data={cfopPhases} /></div>
                <div className="chart-card glass-panel"><ConsistencyHistogram data={consistency} /></div>
            </div>
        </div>
    );
};
