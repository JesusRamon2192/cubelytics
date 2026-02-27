import React from 'react';
import type { CfopPhaseData } from './CfopPhasesChart';

interface Props {
    data: CfopPhaseData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const MobileCfopBars: React.FC<Props> = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div style={{ padding: '0 0.25rem' }}>
                <div className="mobile-chart-header">
                    <h3 className="mobile-chart-title">CFOP Breakdown</h3>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No phase data available.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '0 0.25rem' }}>
            <div className="mobile-chart-header">
                <h3 className="mobile-chart-title">CFOP Breakdown</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                {data.map((phase, index) => (
                    <div key={phase.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{phase.name}</span>
                            <span style={{ color: 'var(--text-muted)' }}>{phase.percentage.toFixed(1)}% <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>({phase.average}s)</span></span>
                        </div>
                        <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div 
                                style={{ 
                                    height: '100%', 
                                    width: `${phase.percentage}%`, 
                                    backgroundColor: COLORS[index % COLORS.length],
                                    borderRadius: '4px'
                                }} 
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
