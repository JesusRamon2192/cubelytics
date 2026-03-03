import React from 'react';

interface AdminStatsCardsProps {
  totalUsers: number;
  activeUsers: number;
  totalSolves: string | number;
  newUsers: number;
}

export const AdminStatsCards: React.FC<AdminStatsCardsProps> = ({
  totalUsers,
  activeUsers,
  totalSolves,
  newUsers
}) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    }}>
      <StatCard title="Total Users" value={totalUsers} />
      <StatCard title="Active Users" value={activeUsers} />
      <StatCard title="Total Solves Global" value={totalSolves} />
      <StatCard title="New Users (7 days)" value={newUsers} subtitle="Recently registered" />
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: number | string; subtitle?: string }> = ({ title, value, subtitle }) => (
  <div style={{
    background: 'var(--surface)',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.2s',
  }}
  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
  >
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '600', letterSpacing: '0.5px' }}>{title}</div>
    <div style={{ fontSize: '2.4rem', fontWeight: 'bold', color: 'var(--text-primary)', lineHeight: 1 }}>{value}</div>
    {subtitle && <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{subtitle}</div>}
  </div>
);
