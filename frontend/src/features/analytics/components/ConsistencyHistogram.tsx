import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export interface ConsistencyBucket {
    range: string;
    count: number;
}

export interface ConsistencyData {
    buckets: ConsistencyBucket[];
    variance: number;
    stdDev: number;
}

interface Props {
    data: ConsistencyData;
    isMobile?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                <p style={{ margin: 0, color: 'var(--text-primary)' }}>{`Range: ${label}`}</p>
                <p style={{ margin: '5px 0 0 0', color: 'var(--primary-color)' }}>{`Count: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

export const ConsistencyHistogram: React.FC<Props> = ({ data, isMobile = false }) => {
    return (
        <div style={{ padding: '0 0.5rem', gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 className={isMobile ? "mobile-chart-title" : ""}>Consistency (Time Distribution)</h3>
                <div style={{ display: 'flex', gap: '1rem', fontSize: isMobile ? '0.75rem' : '0.9rem', color: 'var(--text-muted)' }}>
                    <span>Std Dev: ±{data.stdDev}s</span>
                    <span>Var: {data.variance}s²</span>
                </div>
            </div>
            <div style={{ width: '100%', height: isMobile ? 150 : 300 }}>
                <ResponsiveContainer>
                    <BarChart data={data.buckets} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                        <XAxis 
                            dataKey="range" 
                            stroke="var(--text-muted)" 
                            tick={{ fontSize: isMobile ? 10 : 12 }} 
                            angle={-45} 
                            textAnchor="end"
                            interval={isMobile ? "preserveStartEnd" : 0}
                        />
                        {!isMobile && <YAxis stroke="var(--text-muted)" allowDecimals={false} width={40} />}
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-hover)' }} />
                        <Bar dataKey="count" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
