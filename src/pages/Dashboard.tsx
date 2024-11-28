import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { courseService, newsService, categoryService } from '../lib/api';
import { Course, News } from '../types';
import CourseSection from '../components/CourseSection';
import NewsCard from '../components/NewsCard';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import { useToast } from '../hooks/useToast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [categories, setCategories] = useState<string[]>(['Todos']);
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [latestNews, setLatestNews] = useState<News[]>([]);
  const [mainFeaturedCourse, setMainFeaturedCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories
        const categoriesData = await categoryService.getAllCategories();
        setCategories(['Todos', ...categoriesData.map(cat => cat.name)]);

        // Fetch featured courses
        const featured = await courseService.getFeaturedCourses();
        setFeaturedCourses(featured);

        // Get main featured course
        const mainFeatured = await courseService.getMainFeaturedCourse();
        setMainFeaturedCourse(mainFeatured);

        // Fetch latest news
        const news = await newsService.getLatestNews(3);
        setLatestNews(news);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        showToast('error', 'Erro ao carregar dados do dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showToast]);

  const handleStartCourse = () => {
    if (mainFeaturedCourse) {
      navigate(`/courses/${mainFeaturedCourse.id}`);
    }
  };

  const handleMoreInfo = () => {
    navigate('/courses');
  };

  const handleCourseClick = (course: Course) => {
    navigate(`/courses/${course.id}`);
  };

  const handleNewsClick = (newsItem: News) => {
    navigate(`/blog/${newsItem.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col">
      <div className="flex-1 px-8 pb-16">
        {mainFeaturedCourse && (
          <motion.div 
            className="relative h-[500px] rounded-xl overflow-hidden mb-16 mt-6 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={mainFeaturedCourse.thumbnail}
              alt={mainFeaturedCourse.title}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-12">
                <div className="max-w-2xl">
                  <span className="inline-block px-3 py-1 bg-[#E50914] text-white text-sm font-medium rounded-md mb-4">
                    Em Destaque
                  </span>
                  <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                    {mainFeaturedCourse.title}
                  </h1>
                  <p className="text-gray-300 text-lg mb-8 line-clamp-2">
                    {mainFeaturedCourse.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={handleStartCourse}
                      className="bg-[#E50914] text-white px-8 py-4 rounded-md hover:bg-[#b8070f] transition-colors text-lg font-medium"
                    >
                      Começar Agora
                    </button>
                    <button 
                      onClick={handleMoreInfo}
                      className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-md hover:bg-white/30 transition-colors text-lg font-medium"
                    >
                      Mais Informações
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <CourseSection 
          title="Destaques" 
          icon={<TrendingUp className="h-6 w-6 text-[#E50914]" />}
          courses={featuredCourses.filter(course => 
            activeCategory === 'Todos' || course.category === activeCategory
          )}
          onCourseClick={handleCourseClick}
        />

        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl text-white font-semibold">Últimas Notícias</h2>
            <button 
              onClick={() => navigate('/blog')}
              className="flex items-center gap-2 text-[#E50914] hover:text-[#b8070f] transition-colors"
            >
              <span>Ver todas</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {latestNews.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleNewsClick(item)}
                className="cursor-pointer"
              >
                <NewsCard news={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;