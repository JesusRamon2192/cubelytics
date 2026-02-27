import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { AveragesDataPoint } from './AveragesChart';

interface Props {
    data: AveragesDataPoint[];
}

export const MobileAveragesChart: React.FC<Props> = ({ data }) => {
    return (
        <div style={{ padding: '0 0.25rem' }}>
            <div className="mobile-chart-header">
                <h3 className="mobile-chart-title">Averages</h3>
            </div>
            <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                    <LineChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                        <XAxis dataKey="index" stroke="var(--text-muted)" tick={{fontSize: 10}} minTickGap={20} />
                        <YAxis stroke="var(--text-muted)" tick={{fontSize: 10}} width={30} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: 'var(--surface-color)', border: 'none', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '12px', padding: '8px' }}
                            labelStyle={{ color: 'var(--text-muted)', marginBottom: '4px' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '10px' }} iconSize={8} />
                        <Line type="monotone" dataKey="ao5" name="Ao5" stroke="#8884d8" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="ao12" name="Ao12" stroke="#82ca9d" strokeWidth={2} dot={false} />
                        {/* Ao50 and Ao100 are omitted on mobile to avoid clutter */}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
