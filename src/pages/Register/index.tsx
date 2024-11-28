import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';
import { useToast } from '../../hooks/useToast';

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      showToast('error', 'As senhas não coincidem');
      return;
    }

    try {
      setLoading(true);
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      showToast('success', 'Registro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      showToast('error', 'Falha no registro. Tente novamente.');
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
          Criar Nova Conta
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#2A2A2A] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E50914]"
              placeholder="Seu nome"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#2A2A2A] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E50914]"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirmar Senha
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
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
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <UserPlus className="h-5 w-5" />
                <span>Criar Conta</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-[#E50914] hover:text-[#b8070f] transition-colors">
              Faça login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;