import { useState, useEffect } from 'react';
import { apiClient } from '../../../api/apiClient';

export interface UserDto {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  city?: string;
  country?: string;
  solvesCount?: number;
}

export const useAdminData = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
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

  const deleteUser = async (id: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/api/v1/admin/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
      return true;
    } catch {
      setError('Failed to delete user');
      return false;
    }
  };

  const totalUsers = users.length;
  // Mock active users based on simplistic heuristic for now
  const activeUsers = Math.floor(users.length * 0.8) || 0; 
  const totalSolves = users.reduce((acc, current) => acc + (current.solvesCount || 0), 0);
  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const newUsers = users.filter(u => new Date(u.createdAt) >= sevenDaysAgo).length;

  return {
    users,
    isLoading,
    error,
    deleteUser,
    stats: {
      totalUsers,
      activeUsers,
      totalSolves: totalSolves > 0 ? totalSolves : '--',
      newUsers
    }
  };
};
