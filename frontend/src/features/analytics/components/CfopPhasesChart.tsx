import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface CfopPhaseData {
    name: string;
    average: number;
    stdDev: number;
    percentage: number;
}

interface Props {
    data: CfopPhaseData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                <p style={{ margin: 0, fontWeight: 'bold', color: payload[0].color }}>{`${data.name} Phase`}</p>
                <p style={{ margin: '5px 0 0 0', color: 'var(--text-primary)' }}>{`Average: ${data.average}s`}</p>
                <p style={{ margin: '5px 0 0 0', color: 'var(--text-muted)' }}>{`Std Dev: ±${data.stdDev}s`}</p>
                <p style={{ margin: '5px 0 0 0', color: 'var(--text-primary)' }}>{`Percentage: ${data.percentage}%`}</p>
            </div>
        );
    }
    return null;
};

export const CfopPhasesChart: React.FC<Props> = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div style={{ padding: '0 0.5rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>CFOP Phases</h3>
                <p style={{ color: 'var(--text-muted)' }}>No phase data available.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '0 0.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>CFOP Phases Distribution</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="percentage"
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
