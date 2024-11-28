import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../../components/CourseCard';
import CategoryFilter from '../../components/CategoryFilter';
import { Course } from '../../types';
import { courseService, categoryService } from '../../services/api';
import { useApi } from '../../hooks/useApi';

const Courses = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>(['Todos']);

  const { loading } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesData = await categoryService.getAllCategories();
        setCategories(['Todos', ...categoriesData.map((cat: any) => cat.name)]);

        // Fetch courses
        const coursesData = await courseService.getAllCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchData();
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'Todos' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCourseClick = (course: Course) => {
    navigate(`/courses/${course.id}`);
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
          <h1 className="text-4xl font-bold text-white mb-2">Cursos</h1>
          <p className="text-gray-400">Explore nossa biblioteca de conhecimento</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-[#2A2A2A] text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50914]"
            />
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      <CategoryFilter 
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      <motion.div 
        className="grid grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onClick={() => handleCourseClick(course)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Courses;