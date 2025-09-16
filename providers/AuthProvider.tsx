import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  role: 'worker' | 'supervisor' | 'manager';
  employeeId: string;
  companyId: string;
  language: string;
  skillLevel: number;
  xp: number;
  level: number;
  badges: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: any) => Promise<boolean>;
  logout: () => void;
  updateUserProgress: (xp: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('saitap_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    }
  };

  const login = async (credentials: { employeeId: string; companyCode: string; biometric?: boolean }) => {
    try {
      // Simulate API call - replace with actual authentication
      if (credentials.employeeId && credentials.companyCode) {
        const mockUser: User = {
          id: '1',
          name: 'John Smith',
          role: credentials.employeeId.includes('mgr') ? 'manager' : 'worker',
          employeeId: credentials.employeeId,
          companyId: credentials.companyCode,
          language: 'en',
          skillLevel: 3,
          xp: 2450,
          level: 7,
          badges: ['Safety First', 'Quick Learner', 'Team Player'],
        };

        await AsyncStorage.setItem('saitap_user', JSON.stringify(mockUser));
        setUser(mockUser);
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    return false;
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('saitap_user');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUserProgress = async (xpGained: number) => {
    if (!user) return;

    const newXp = user.xp + xpGained;
    const newLevel = Math.floor(newXp / 500) + 1;
    
    const updatedUser = {
      ...user,
      xp: newXp,
      level: newLevel,
    };

    setUser(updatedUser);
    await AsyncStorage.setItem('saitap_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      updateUserProgress,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};