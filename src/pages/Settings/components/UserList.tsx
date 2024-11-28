import React from 'react';
import { Edit2, Trash } from 'lucide-react';
import { motion } from 'framer-motion';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  group?: {
    name: string;
  };
}

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'instructor':
        return 'Instrutor';
      default:
        return 'Usuário';
    }
  };

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg"
        >
          <div>
            <h3 className="text-white font-medium">{user.name}</h3>
            <p className="text-gray-400 text-sm">{user.email}</p>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-xs text-[#E50914]">
                {getRoleLabel(user.role)}
              </span>
              {user.group && (
                <span className="text-xs text-gray-400">
                  Grupo: {user.group.name}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onEdit(user)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button 
              onClick={() => onDelete(user.id)}
              className="text-gray-400 hover:text-[#E50914] transition-colors"
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default UserList;