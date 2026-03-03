import React, { useEffect, useState } from 'react';
import { apiClient } from '../../api/apiClient';

interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<BaseUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient.get('/api/v1/admin/users');
      setUsers(data);
    } catch {
      setError('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    
    try {
      await apiClient.delete(`/api/v1/admin/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch {
      setError('Failed to delete user');
    }
  };

  if (isLoading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading users...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', background: 'var(--surface)', borderRadius: '12px' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Admin Panel - Users</h2>
      {error && <div style={{ color: '#ff6b6b', marginBottom: '1rem', background: 'rgba(255, 107, 107, 0.1)', padding: '0.8rem', borderRadius: '4px' }}>{error}</div>}
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '1rem 0', fontWeight: 'bold' }}>Name</th>
              <th style={{ padding: '1rem 0', fontWeight: 'bold' }}>Email</th>
              <th style={{ padding: '1rem 0', fontWeight: 'bold' }}>Role</th>
              <th style={{ padding: '1rem 0', fontWeight: 'bold' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem 0' }}>{user.name}</td>
                <td style={{ padding: '1rem 0' }}>{user.email}</td>
                <td style={{ padding: '1rem 0' }}>
                  <span style={{ 
                    background: user.role === 'ADMIN' ? 'rgba(255, 107, 107, 0.2)' : 'rgba(74, 144, 226, 0.2)',
                    color: user.role === 'ADMIN' ? '#ff6b6b' : '#4a90e2',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '1rem 0' }}>
                  {user.role !== 'ADMIN' && (
                    <button 
                      onClick={() => handleDelete(user.id)}
                      style={{ 
                        background: 'transparent', 
                        border: '1px solid #ff6b6b', 
                        color: '#ff6b6b', 
                        padding: '0.4rem 0.8rem', 
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
