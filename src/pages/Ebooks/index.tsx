import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ebookService, categoryService } from '../../services/api';
import { useApi } from '../../hooks/useApi';
import { useToast } from '../../hooks/useToast';
import { Ebook } from '../../types';
import EbookCard from './components/EbookCard';
import EbookFilter from './components/EbookFilter';
import CategoryFilter from '../../components/CategoryFilter';

const Ebooks = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [categories, setCategories] = useState<string[]>(['Todos']);

  const { loading } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesData = await categoryService.getAllCategories();
        setCategories(['Todos', ...categoriesData.map((cat: any) => cat.name)]);

        // Fetch ebooks
        const ebooksData = await ebookService.getAllEbooks();
        setEbooks(ebooksData);
      } catch (error) {
        console.error('Error fetching ebooks:', error);
        showToast('error', 'Erro ao carregar e-books');
      }
    };

    fetchData();
  }, [showToast]);

  const filteredEbooks = ebooks.filter(ebook => {
    const matchesCategory = activeCategory === 'Todos' || ebook.category === activeCategory;
    const matchesSearch = ebook.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = async (id: string) => {
    try {
      const response = await ebookService.getEbookById(id);
      window.open(response.fileUrl, '_blank');
    } catch (error) {
      console.error('Error downloading ebook:', error);
      showToast('error', 'Erro ao baixar e-book');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">E-books</h1>
          <p className="text-gray-400">Biblioteca digital especializada</p>
        </div>

        <EbookFilter 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      <CategoryFilter 
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      <motion.div 
        className="grid grid-cols-1 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {filteredEbooks.map((ebook) => (
          <EbookCard
            key={ebook.id}
            ebook={ebook}
            onDownload={handleDownload}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Ebooks;