import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../hooks/useToast';
import LoadingSpinner from '../../components/LoadingSpinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        // Create or update user profile
        const { error: profileError } = await supabase
          .from('users')
          .upsert({
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata.name || email.split('@')[0],
            role: 'admin', // For the first user
            avatar_url: data.user.user_metadata.avatar_url
          });

        if (profileError) {
          console.error('Error updating profile:', profileError);
        }
      }

      showToast('success', 'Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      showToast('error', error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1E1E1E] p-8 rounded-xl w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <img 
            src="https://vpjalimentos.com.br/wp-content/uploads/elementor/thumbs/Logo_VPJ_Pecuaria_500x500-1-px12mqh8pvyvzznziu3oe03857dsw7iucidb5ihm2o.png"
            alt="VPJ Logo"
            className="h-16"
          />
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-8">
          Plataforma de Aprendizado VPJ
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#2A2A2A] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E50914]"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#2A2A2A] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E50914]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#E50914] text-white py-3 rounded-lg hover:bg-[#b8070f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <LogIn className="h-5 w-5" />
                <span>Entrar</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-[#E50914] hover:text-[#b8070f] transition-colors">
              Registre-se
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;