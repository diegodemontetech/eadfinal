import React, { useState } from 'react';
import { LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProfileView from './ProfileView';

interface ProfileMenuProps {
  onClose: () => void;
}

const ProfileMenu = ({ onClose }: ProfileMenuProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  if (!user) return null;

  const handleSignOut = () => {
    signOut();
    onClose();
  };

  const handleSettings = () => {
    navigate('/settings');
    onClose();
  };

  return (
    <>
      <div 
        className="absolute right-0 top-full mt-2 w-80 bg-[#141414] border border-gray-800 rounded-md shadow-lg overflow-hidden z-50"
        onMouseLeave={onClose}
      >
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
            <div>
              <h3 className="text-white font-medium">{user.name}</h3>
              <p className="text-sm text-gray-400">Nota: {user.stats.averageGrade}/10</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800">
          <button 
            onClick={() => setShowProfile(true)}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#2A2A2A] transition-colors"
          >
            <User className="h-4 w-4" />
            <span>Gerenciar Perfil</span>
          </button>
          <button 
            onClick={handleSettings}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#2A2A2A] transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Configurações</span>
          </button>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#2A2A2A] transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {showProfile && <ProfileView onClose={() => setShowProfile(false)} />}
    </>
  );
};

export default ProfileMenu;