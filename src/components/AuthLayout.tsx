import React from 'react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AuthLayout = ({ children, title }: AuthLayoutProps) => {
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
          {title}
        </h1>

        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;