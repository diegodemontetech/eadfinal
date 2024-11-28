import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useToast } from './useToast';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authService.validateToken(token);
          setUser(response.user);
        } catch (error) {
          console.error('Token validation failed:', error);
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      showToast('success', 'Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      showToast('error', 'Falha no login. Verifique suas credenciais.');
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
    showToast('info', 'Você foi desconectado.');
  };

  const updateUser = (data: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...data } : null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}