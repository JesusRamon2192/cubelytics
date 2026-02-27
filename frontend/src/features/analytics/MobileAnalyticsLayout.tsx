import React from 'react';
import { GeneralProgressChart } from './components/GeneralProgressChart';
import { MobileAveragesChart } from './components/MobileAveragesChart';
import { MobileCfopBars } from './components/MobileCfopBars';
import { ConsistencyHistogram } from './components/ConsistencyHistogram';
import './MobileAnalyticsLayout.css';

interface MobileAnalyticsLayoutProps {
    validSolvesCount: number;
    stats: any;
    generalProgress: any;
    averagesProgress: any;
    cfopPhases: any;
    consistency: any;
}

export const MobileAnalyticsLayout: React.FC<MobileAnalyticsLayoutProps> = ({
    validSolvesCount,
    stats,
    generalProgress,
    averagesProgress,
    cfopPhases,
    consistency
}) => {
    if (validSolvesCount === 0) {
        return (
            <div className="mobile-analytics-container empty-state">
                <h2 className="empty-text">Not enough data. Do some solves first!</h2>
            </div>
        );
    }

    return (
        <div className="mobile-analytics-container">
            <div className="mobile-analytics-header">
                <h2 className="mobile-analytics-title">Analytics</h2>
            </div>

            <div className="mobile-kpi-grid">
                <div className="mobile-kpi-card glass-panel">
                    <span className="mobile-kpi-label">Solves</span>
                    <span className="mobile-kpi-value">{validSolvesCount}</span>
                </div>
                <div className="mobile-kpi-card glass-panel">
                    <span className="mobile-kpi-label">Mean</span>
                    <span className="mobile-kpi-value">
                        {stats?.sessionMean ? (stats.sessionMean / 1000).toFixed(2) : '-'}
                    </span>
                </div>
                <div className="mobile-kpi-card glass-panel">
                    <span className="mobile-kpi-label">Best</span>
                    <span className="mobile-kpi-value highlight-success">
                        {stats?.bestTime ? (stats.bestTime / 1000).toFixed(2) : '-'}
                    </span>
                </div>
                <div className="mobile-kpi-card glass-panel">
                    <span className="mobile-kpi-label">Ao12</span>
                    <span className="mobile-kpi-value">
                        {stats?.currentAo12 ? (stats.currentAo12 / 1000).toFixed(2) : '-'}
                    </span>
                </div>
            </div>

            <div className="mobile-charts-flex">
                <div className="mobile-chart-card glass-panel">
                    <GeneralProgressChart data={generalProgress} isMobile={true} />
                </div>
                <div className="mobile-chart-card glass-panel">
                    <MobileAveragesChart data={averagesProgress} />
                </div>
                <div className="mobile-chart-card glass-panel">
                    <MobileCfopBars data={cfopPhases} />
                </div>
                <div className="mobile-chart-card glass-panel">
                    <ConsistencyHistogram data={consistency} isMobile={true} />
                </div>
            </div>
        </div>
    );
};
