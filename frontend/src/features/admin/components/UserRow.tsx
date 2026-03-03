import React, { useState } from 'react';
import type { UserDto } from '../hooks/useAdminData';

interface UserRowProps {
  user: UserDto;
  onDelete: (user: UserDto) => void;
  currentUserId: string;
}

export const UserRow: React.FC<UserRowProps> = ({ user, onDelete, currentUserId }) => {
  const [isHovered, setIsHovered] = useState(false);

  const initial = user.name.charAt(0).toUpperCase();
  const isSelf = user.id === currentUserId;

  return (
    <tr 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        borderBottom: '1px solid var(--border)',
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
        transition: 'background-color 0.2s ease',
      }}
    >
      <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '36px', height: '36px', 
          borderRadius: '50%', 
          background: 'var(--primary)', 
          color: '#fff', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 'bold', fontSize: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          {initial}
        </div>
      </td>
      <td style={{ padding: '1rem', fontWeight: '500' }}>
        {user.name} {isSelf && <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', marginLeft: '0.4rem' }}>(You)</span>}
      </td>
      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{user.email}</td>
      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{user.city || '-'}</td>
      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{user.country || '-'}</td>
      <td style={{ padding: '1rem' }}>
        <span style={{ 
          background: user.role === 'ADMIN' ? 'rgba(255, 107, 107, 0.15)' : 'rgba(74, 144, 226, 0.15)',
          color: user.role === 'ADMIN' ? '#ff6b6b' : '#4a90e2',
          padding: '0.3rem 0.6rem',
          borderRadius: '6px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          letterSpacing: '0.5px'
        }}>
          {user.role}
        </span>
      </td>
      <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
      </td>
      <td style={{ padding: '1rem' }}>
        {user.role !== 'ADMIN' && !isSelf && (
          <button 
            onClick={() => onDelete(user)}
            style={{ 
              background: 'rgba(255, 107, 107, 0.1)', 
              border: '1px solid rgba(255, 107, 107, 0.3)', 
              color: '#ff6b6b', 
              padding: '0.4rem 0.8rem', 
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              transition: 'all 0.2s',
              opacity: isHovered ? 1 : 0.6
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 107, 107, 0.2)';
              e.currentTarget.style.opacity = '1';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 107, 107, 0.1)';
              e.currentTarget.style.opacity = isHovered ? '1' : '0.6';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            Delete
          </button>
        )}
      </td>
    </tr>
  );
};
