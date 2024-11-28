import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Search, Filter, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { newsService, categoryService } from '../../services/api';
import { useApi } from '../../hooks/useApi';
import { useToast } from '../../hooks/useToast';
import { News } from '../../types';
import NewsCard from './components/NewsCard';
import NewsFilter from './components/NewsFilter';
import CategoryFilter from '../../components/CategoryFilter';

const Blog = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [news, setNews] = useState<News[]>([]);
  const [categories, setCategories] = useState<string[]>(['Todos']);
  const [featuredNews, setFeaturedNews] = useState<News | null>(null);
  const [trendingNews, setTrendingNews] = useState<News[]>([]);

  const { loading } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesData = await categoryService.getAllCategories();
        setCategories(['Todos', ...categoriesData.map((cat: any) => cat.name)]);

        // Fetch news
        const newsData = await newsService.getAllNews();
        
        // Set featured news (first highlighted news)
        const featured = newsData.find((item: News) => item.isHighlighted);
        setFeaturedNews(featured || null);

        // Set trending news (top 5 by views/likes)
        setTrendingNews(newsData.slice(0, 5));

        // Set regular news
        setNews(newsData);
      } catch (error) {
        console.error('Error fetching news:', error);
        showToast('error', 'Erro ao carregar notícias');
      }
    };

    fetchData();
  }, [showToast]);

  const filteredNews = news.filter(item => {
    const matchesCategory = activeCategory === 'Todos' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNewsClick = (newsId: string) => {
    navigate(`/blog/${newsId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-[1800px] mx-auto">
        {/* Featured News */}
        {featuredNews && (
          <div className="relative h-[600px] mb-16">
            <img
              src={featuredNews.thumbnail}
              alt="Featured"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-3xl cursor-pointer"
                  onClick={() => handleNewsClick(featuredNews.id)}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-[#E50914] text-white px-3 py-1 rounded-full text-sm font-medium">
                      Destaque
                    </span>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredNews.date}</span>
                    </div>
                  </div>

                  <h1 className="font-ubuntu text-7xl font-bold text-white mb-6 leading-tight">
                    {featuredNews.title}
                  </h1>
                  
                  <p className="text-xl text-gray-300 mb-8 line-clamp-3">
                    {featuredNews.description}
                  </p>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={featuredNews.author.avatar}
                        alt={featuredNews.author.name}
                        className="h-12 w-12 rounded-full"
                      />
                      <div>
                        <p className="text-white font-medium">{featuredNews.author.name}</p>
                        <p className="text-sm text-gray-400">{featuredNews.author.role}</p>
                      </div>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNewsClick(featuredNews.id);
                      }}
                      className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      <span>Ler artigo completo</span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}

        <div className="px-16">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-ubuntu text-4xl font-bold text-white mb-2">
                Últimas Notícias
              </h2>
              <p className="text-gray-400">
                Acompanhe as principais novidades do setor
              </p>
            </div>

            <NewsFilter 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>

          <CategoryFilter 
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />

          <div className="grid grid-cols-12 gap-12">
            {/* Main News Grid */}
            <div className="col-span-8">
              <div className="grid grid-cols-2 gap-8">
                {filteredNews.map((item) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <NewsCard 
                      news={item} 
                      onClick={() => handleNewsClick(item.id)}
                    />
                  </motion.article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-span-4 space-y-8">
              {/* Trending News */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#1E1E1E] rounded-xl p-8"
              >
                <h3 className="text-xl font-bold text-white mb-6">Mais Lidas</h3>
                <div className="space-y-6">
                  {trendingNews.map((item, index) => (
                    <article 
                      key={item.id} 
                      className="flex gap-6 group cursor-pointer"
                      onClick={() => handleNewsClick(item.id)}
                    >
                      <span className="text-4xl font-bold text-gray-700 group-hover:text-[#E50914] transition-colors">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      <div className="space-y-2">
                        <h4 className="text-white font-medium group-hover:text-[#E50914] transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="h-4 w-4" />
                          <span>{item.readTime}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[#1E1E1E] rounded-xl p-8"
              >
                <h3 className="text-xl font-bold text-white mb-6">Newsletter</h3>
                <p className="text-gray-400 mb-6">
                  Receba as últimas notícias e atualizações diretamente no seu e-mail.
                </p>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    className="w-full bg-[#2A2A2A] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                  />
                  <button className="w-full bg-[#E50914] text-white py-3 rounded-lg hover:bg-[#b8070f] transition-colors">
                    Inscrever-se
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;