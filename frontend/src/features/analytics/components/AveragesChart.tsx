import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface AveragesDataPoint {
    index: number;
    ao5: number | null;
    ao12: number | null;
    ao50: number | null;
    ao100: number | null;
}

interface Props {
    data: AveragesDataPoint[];
}

export const AveragesChart: React.FC<Props> = ({ data }) => {
    return (
        <div style={{ padding: '0 0.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Averages Over Time</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                        <XAxis dataKey="index" stroke="var(--text-muted)" />
                        <YAxis stroke="var(--text-muted)" unit="s" width={40} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: 'var(--surface-color)', border: 'none', borderRadius: '8px', color: 'var(--text-primary)' }}
                            labelStyle={{ color: 'var(--text-muted)' }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="ao5" name="Ao5" stroke="#8884d8" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="ao12" name="Ao12" stroke="#82ca9d" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="ao50" name="Ao50" stroke="#ffc658" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="ao100" name="Ao100" stroke="#ff7300" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
