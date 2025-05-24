
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin user for demonstration
const MOCK_ADMIN_USER: User = {
  id: 'mock-admin-id',
  email: 'admin@example.com',
  role: 'admin'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(MOCK_ADMIN_USER);
  const [loading, setLoading] = useState(false);

  // Simulate immediate login on mount
  useEffect(() => {
    setUser(MOCK_ADMIN_USER);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(MOCK_ADMIN_USER);
      toast.success('Logged in successfully (demo mode)');
    } catch (error: any) {
      toast.error('Login simulation completed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      // Simulate logout delay
      await new Promise(resolve => setTimeout(resolve, 300));
      setUser(null);
      toast.success('Logged out successfully (demo mode)');
    } catch (error: any) {
      toast.error('Logout simulation completed');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
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
