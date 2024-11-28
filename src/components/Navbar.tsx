import React, { useState, useEffect } from 'react';
import { Bell, Trophy, Clock, Award, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { certificateService, userService } from '../lib/api';
import ProfileMenu from './ProfileMenu';
import LoadingSpinner from './LoadingSpinner';

const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({
    averageGrade: 0,
    totalHours: 0,
    totalCertificates: 0,
    notifications: []
  });
  
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true);
        const [progress, profile] = await Promise.all([
          certificateService.getUserProgress(),
          userService.getProfile()
        ]);

        setUserStats({
          averageGrade: progress.averageGrade || 0,
          totalHours: progress.totalHours || 0,
          totalCertificates: progress.totalCertificates || 0,
          notifications: profile.notifications || []
        });
      } catch (error) {
        console.error('Error fetching user stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserStats();
    }
  }, [user]);

  if (!user) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#141414] h-14 flex items-center px-4 z-50">
      <div className="flex items-center gap-8">
        <img 
          src="https://vpjalimentos.com.br/wp-content/uploads/elementor/thumbs/Logo_VPJ_Pecuaria_500x500-1-px12mqh8pvyvzznziu3oe03857dsw7iucidb5ihm2o.png"
          alt="VPJ Logo"
          className="h-8"
        />
      </div>

      <div className="flex-1 flex justify-center px-32">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full bg-[#2A2A2A] text-white pl-10 pr-4 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#E50914]"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
            isSearchFocused ? 'text-white' : 'text-gray-400'
          }`} />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {loading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <>
            <motion.button
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
            >
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-xs text-gray-400 mt-0.5">
                {userStats.averageGrade.toFixed(1)}
              </span>
            </motion.button>

            <motion.button
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
            >
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-gray-400 mt-0.5">
                {userStats.totalHours}h
              </span>
            </motion.button>

            <motion.button
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate('/certificates')}
            >
              <Award className="h-4 w-4 text-green-500" />
              <span className="text-xs text-gray-400 mt-0.5">
                {userStats.totalCertificates}
              </span>
            </motion.button>

            <div className="h-6 w-px bg-gray-700" />

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5 text-gray-400" />
                {userStats.notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#E50914] text-white text-xs flex items-center justify-center rounded-full">
                    {userStats.notifications.length}
                  </span>
                )}
              </motion.button>

              {showNotifications && userStats.notifications.length > 0 && (
                <div className="absolute right-0 mt-2 w-80 bg-[#141414] border border-gray-800 rounded-md shadow-lg">
                  <div className="p-4 border-b border-gray-800">
                    <h3 className="text-white font-medium">Notificações</h3>
                  </div>
                  <div className="py-2">
                    {userStats.notifications.map((notification: any) => (
                      <div key={notification.id} className="px-4 py-3 hover:bg-[#2A2A2A] transition-colors">
                        <p className="text-sm text-gray-300">{notification.message}</p>
                        <span className="text-xs text-gray-500 mt-1">{notification.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                className="flex items-center gap-2"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <img
                  src={user.avatar || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
              </button>

              {showProfileMenu && (
                <ProfileMenu onClose={() => setShowProfileMenu(false)} />
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;