import React from 'react';
import { Edit2, Trash } from 'lucide-react';
import { motion } from 'framer-motion';

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

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

const CategoryList = ({ categories, onEdit, onDelete }: CategoryListProps) => {
  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-white font-medium">{category.name}</h3>
              {!category.isActive && (
                <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                  Inativa
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm">{category.description}</p>
            <div className="flex items-center gap-4 mt-2">
              {category.usedIn.courses && (
                <span className="text-xs text-[#E50914]">Cursos</span>
              )}
              {category.usedIn.ebooks && (
                <span className="text-xs text-[#E50914]">E-books</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onEdit(category)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button 
              onClick={() => onDelete(category.id)}
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

export default CategoryList;