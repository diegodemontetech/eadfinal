import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Book, Newspaper, Award, Settings, LogOut, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: BookOpen, label: 'Cursos', path: '/courses' },
  { icon: Book, label: 'E-books', path: '/ebooks' },
  { icon: Newspaper, label: 'Notícias', path: '/blog' },
  { icon: Award, label: 'Certificados', path: '/certificates' },
  { icon: Settings, label: 'Configurações', path: '/settings' },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.aside 
      initial={false}
      animate={{ width: collapsed ? 72 : 256 }}
      className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-[#1E1E1E] text-gray-300 flex flex-col z-40 overflow-hidden transition-all duration-300"
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-[#2A2A2A] transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 pt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-6 py-3 hover:bg-[#2A2A2A] transition-colors ${
                isActive ? 'text-white bg-[#2A2A2A]' : 'text-gray-400'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className="w-full flex items-center gap-4 px-2 py-3 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-colors">
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              Sair
            </motion.span>
          )}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;