import React, { useState } from 'react';
import type { UserDto } from '../hooks/useAdminData';
import { UserRow } from './UserRow';
import { DeleteUserModal } from './DeleteUserModal';

interface UsersTableProps {
  users: UserDto[];
  onDelete: (id: string) => void;
  currentUserId: string;
}

export const UsersTable: React.FC<UsersTableProps> = ({ users, onDelete, currentUserId }) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  
  const [userToDelete, setUserToDelete] = useState<UserDto | null>(null);

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleConfirmDelete = () => {
    if (userToDelete) {
      onDelete(userToDelete.id);
      setUserToDelete(null);
    }
  };

  return (
    <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      
      {/* Controls Bar */}
      <div style={{ padding: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ flex: 1, position: 'relative', minWidth: '220px' }}>
          <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search users..." 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            style={{
              width: '100%',
              padding: '0.9rem 1rem 0.9rem 2.5rem',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--background)',
              color: 'var(--text-primary)',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
          />
        </div>
        <select 
          value={roleFilter}
          onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
          style={{
            padding: '0.9rem 1.2rem',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            background: 'var(--background)',
            color: 'var(--text-primary)',
            outline: 'none',
            cursor: 'pointer',
            minWidth: '140px',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '850px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255, 255, 255, 0.02)' }}>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem', width: '60px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>User</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Name</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>City</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Country</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Role</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Registered</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map(user => (
              <UserRow 
                key={user.id} 
                user={user} 
                onDelete={setUserToDelete}
                currentUserId={currentUserId}
              />
            ))}
            {paginatedUsers.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" style={{ opacity: 0.5 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  No users found matching the criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} entries
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid var(--border)',
                background: page === 1 ? 'transparent' : 'var(--surface)',
                color: page === 1 ? 'var(--text-tertiary)' : 'var(--text-primary)',
                borderRadius: '6px',
                cursor: page === 1 ? 'default' : 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.background = 'var(--surface)')}
            >
              Previous
            </button>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid var(--border)',
                background: page === totalPages ? 'transparent' : 'var(--surface)',
                color: page === totalPages ? 'var(--text-tertiary)' : 'var(--text-primary)',
                borderRadius: '6px',
                cursor: page === totalPages ? 'default' : 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.background = 'var(--surface)')}
            >
              Next
            </button>
          </div>
        </div>
      )}

      <DeleteUserModal 
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleConfirmDelete}
        userName={userToDelete ? userToDelete.name : ''}
      />
    </div>
  );
};
