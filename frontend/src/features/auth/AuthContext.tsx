import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthState } from '../../types/auth';
import { apiClient } from '../../api/apiClient';

export interface AuthContextType extends AuthState {
  login: (token: string, user: User) => void;
  logout: () => void;
  register: (token: string, user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    window.location.href = '/';
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const userData = await apiClient.get('/api/v1/auth/me');
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          logout();
        }
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = async (newToken: string, newUser: User) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(newUser);

    // Sync guest solves
    try {
      const cache = localStorage.getItem('guest_solves_cache');
      if (cache && cache !== '[]') {
        const solves = JSON.parse(cache);
        if (solves.length > 0) {
          // Format them according to the DTO if needed
          const dto = solves.map((s: { scramble: string; totalTimeMillis: number; crossTimeMillis?: number; f2lTimeMillis?: number; ollTimeMillis?: number; pllTimeMillis?: number; }) => ({
             scramble: s.scramble,
             totalTimeMillis: s.totalTimeMillis,
             crossTimeMillis: s.crossTimeMillis,
             f2lTimeMillis: s.f2lTimeMillis,
             ollTimeMillis: s.ollTimeMillis,
             pllTimeMillis: s.pllTimeMillis
          }));
          await apiClient.post('/api/v1/solves/batch', dto);
          localStorage.removeItem('guest_solves_cache');
        }
      }
    } catch (e) {
      console.error("Failed to migrate guest solves", e);
    }
  };

  const register = async (newToken: string, newUser: User) => {
    await login(newToken, newUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
