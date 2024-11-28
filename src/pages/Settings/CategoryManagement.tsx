import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { categoryService } from '../../services/api';
import { useToast } from '../../hooks/useToast';
import CategoryForm from './components/CategoryForm';
import CategoryList from './components/CategoryList';
import LoadingSpinner from '../../components/LoadingSpinner';

interface Category {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  usedIn: {
    courses: boolean;
    ebooks: boolean;
  };
}

const CategoryManagement = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryData, setCategoryData] = useState<Omit<Category, 'id'>>({
    name: '',
    description: '',
    isActive: true,
    usedIn: {
      courses: true,
      ebooks: true
    }
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      showToast('error', 'Erro ao carregar categorias');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory.id, categoryData);
        showToast('success', 'Categoria atualizada com sucesso');
      } else {
        await categoryService.createCategory(categoryData);
        showToast('success', 'Categoria criada com sucesso');
      }
      fetchCategories();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving category:', error);
      showToast('error', 'Erro ao salvar categoria');
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setCategoryData({
      name: category.name,
      description: category.description,
      isActive: category.isActive,
      usedIn: category.usedIn
    });
    setIsAddingCategory(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      return;
    }

    try {
      await categoryService.deleteCategory(id);
      showToast('success', 'Categoria excluída com sucesso');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      showToast('error', 'Erro ao excluir categoria');
    }
  };

  const handleCloseForm = () => {
    setIsAddingCategory(false);
    setEditingCategory(null);
    setCategoryData({
      name: '',
      description: '',
      isActive: true,
      usedIn: {
        courses: true,
        ebooks: true
      }
    });
  };

  const handleChange = (field: string, value: any) => {
    setCategoryData(prev => ({
      ...prev,
      [field]: value
    }));
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
        <h2 className="text-2xl font-bold text-white">Categorias</h2>
        <button
          onClick={() => setIsAddingCategory(true)}
          className="flex items-center gap-2 bg-[#E50914] text-white px-4 py-2 rounded-md hover:bg-[#b8070f] transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nova Categoria</span>
        </button>
      </div>

      <CategoryForm
        isOpen={isAddingCategory}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        categoryData={categoryData}
        onChange={handleChange}
        title={editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
      />

      <CategoryList
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CategoryManagement;