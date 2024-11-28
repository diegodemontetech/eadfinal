import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <img 
              src="https://vpjalimentos.com.br/wp-content/uploads/elementor/thumbs/Logo_VPJ_Pecuaria_500x500-1-px12mqh8pvyvzznziu3oe03857dsw7iucidb5ihm2o.png"
              alt="VPJ Logo"
              className="h-8"
            />
            <span className="text-gray-400">© {new Date().getFullYear()} VPJ. Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contato</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;