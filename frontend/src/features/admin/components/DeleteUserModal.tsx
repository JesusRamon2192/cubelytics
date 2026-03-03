import React from 'react';

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ isOpen, onClose, onConfirm, userName }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(6px)',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        background: 'var(--background)',
        padding: '2.5rem',
        borderRadius: '16px',
        maxWidth: '420px',
        width: '90%',
        border: '1px solid var(--border)',
        boxShadow: '0 12px 48px rgba(0, 0, 0, 0.5)',
        animation: 'slideUp 0.3s ease-out'
      }}>
        <h3 style={{ marginTop: 0, color: '#ff6b6b', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Delete User
        </h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.05rem', margin: '1.5rem 0' }}>
          Are you sure you want to delete <strong>{userName}</strong>? This action is permanent and cannot be undone.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2.5rem' }}>
          <button 
            onClick={onClose}
            style={{
              padding: '0.8rem 1.4rem',
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            style={{
              padding: '0.8rem 1.4rem',
              background: '#ff6b6b',
              border: 'none',
              color: '#fff',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)',
              transition: 'transform 0.1s, box-shadow 0.2s'
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.96)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Confirm Delete
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};
