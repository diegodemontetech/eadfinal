import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { userService } from '../../services/api';
import { useToast } from '../../hooks/useToast';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import LoadingSpinner from '../../components/LoadingSpinner';

const UserManagement = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      showToast('error', 'Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (userData: any) => {
    try {
      if (editingUser) {
        await userService.updateUser(editingUser.id, userData);
        showToast('success', 'Usuário atualizado com sucesso');
      } else {
        await userService.createUser(userData);
        showToast('success', 'Usuário criado com sucesso');
      }
      fetchUsers();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving user:', error);
      showToast('error', 'Erro ao salvar usuário');
    }
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setIsAddingUser(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) {
      return;
    }

    try {
      await userService.deleteUser(id);
      showToast('success', 'Usuário excluído com sucesso');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      showToast('error', 'Erro ao excluir usuário');
    }
  };

  const handleCloseForm = () => {
    setIsAddingUser(false);
    setEditingUser(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Usuários</h2>
        <button
          onClick={() => setIsAddingUser(true)}
          className="flex items-center gap-2 bg-[#E50914] text-white px-4 py-2 rounded-md hover:bg-[#b8070f] transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Novo Usuário</span>
        </button>
      </div>

      <UserForm
        isOpen={isAddingUser}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        user={editingUser}
      />

      <UserList
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UserManagement;