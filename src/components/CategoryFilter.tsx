import React from 'react';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex items-center gap-4 mb-8 overflow-x-auto no-scrollbar py-2">
      {categories.map((category, index) => (
        <motion.button
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
            ${activeCategory === category 
              ? 'bg-[#E50914] text-white' 
              : 'bg-[#2A2A2A] text-gray-300 hover:bg-[#3A3A3A]'
            }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;