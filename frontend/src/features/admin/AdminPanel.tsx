import React from 'react';
import { useAdminData } from './hooks/useAdminData';
import { AdminStatsCards } from './components/AdminStatsCards';
import { UsersTable } from './components/UsersTable';
import { useAuth } from '../auth/AuthContext';

export const AdminPanel: React.FC = () => {
  const { users, isLoading, error, deleteUser, stats } = useAdminData();
  const { user } = useAuth();

  const currentUserId = user?.id || '';

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Loading Admin Dashboard...</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1.5rem', animation: 'fadeIn 0.3s ease-out' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h1 style={{ margin: 0, fontSize: '2rem', color: 'var(--text-primary)' }}>Admin Dashboard</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Manage platform users, view system metrics and activity.</p>
      </header>

      {error && (
        <div style={{ 
          color: '#ff6b6b', 
          marginBottom: '2rem', 
          background: 'rgba(255, 107, 107, 0.1)', 
          padding: '1rem 1.5rem', 
          borderRadius: '8px',
          border: '1px solid rgba(255, 107, 107, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem'
        }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {error}
        </div>
      )}

      {/* Top Metrics Cards */}
      <AdminStatsCards 
        totalUsers={stats.totalUsers} 
        activeUsers={stats.activeUsers} 
        totalSolves={stats.totalSolves} 
        newUsers={stats.newUsers} 
      />

      {/* Main Table Area */}
      <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>System Users</h2>
      <UsersTable 
        users={users} 
        onDelete={deleteUser} 
        currentUserId={currentUserId}
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
