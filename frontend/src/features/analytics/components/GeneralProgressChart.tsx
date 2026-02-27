import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface ProgressDataPoint {
    index: number;
    time: number;
    movingAverage: number | null;
    date: string;
}

interface Props {
    data: ProgressDataPoint[];
    isMobile?: boolean;
}

export const GeneralProgressChart: React.FC<Props> = ({ data, isMobile = false }) => {
    const [filter, setFilter] = useState<'50' | '100' | 'ALL'>('ALL');

    const filteredData = React.useMemo(() => {
        if (filter === '50') return data.slice(-50);
        if (filter === '100') return data.slice(-100);
        return data; // ALL
    }, [data, filter]);

    return (
        <div style={{ padding: '0 0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 className={isMobile ? "mobile-chart-title" : ""}>General Progress</h3>
                <select 
                    value={filter} 
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e) => setFilter(e.target.value as any)}
                    style={{ padding: '0.4rem', borderRadius: '4px', background: 'var(--surface-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)'}}
                >
                    <option value="50">Last 50</option>
                    <option value="100">Last 100</option>
                    <option value="ALL">All Time</option>
                </select>
            </div>
            <div style={{ width: '100%', height: isMobile ? 220 : 300 }}>
                <ResponsiveContainer>
                    <LineChart data={filteredData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                        <XAxis dataKey="index" stroke="var(--text-muted)" tick={isMobile ? {fontSize: 10} : undefined} minTickGap={isMobile ? 20 : 5} />
                        <YAxis stroke="var(--text-muted)" unit="s" width={isMobile ? 30 : 40} tick={isMobile ? {fontSize: 10} : undefined} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: 'var(--surface-color)', border: 'none', borderRadius: '8px', color: 'var(--text-primary)', fontSize: isMobile ? '12px' : undefined, padding: isMobile ? '8px' : undefined }}
                            labelStyle={{ color: 'var(--text-muted)', marginBottom: isMobile ? '4px' : undefined }}
                        />
                        {!isMobile && <Legend />}
                        <Line type="monotone" dataKey="time" name="Time" stroke="var(--accent-color)" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="movingAverage" name="Ao12 (Moving)" stroke="#ff7300" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
