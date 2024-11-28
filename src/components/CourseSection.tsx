import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CourseCard from './CourseCard';
import { Course } from '../types';

interface CourseSectionProps {
  title: string;
  icon?: React.ReactNode;
  courses: Course[];
  onCourseClick?: (course: Course) => void;
}

const CourseSection = ({ title, icon, courses, onCourseClick }: CourseSectionProps) => {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  return (
    <div className="mb-12 group">
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h2 className="text-2xl text-white font-semibold">{title}</h2>
      </div>
      
      <div className="relative">
        <div 
          ref={containerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CourseCard 
                course={course} 
                layout="carousel" 
                onClick={() => onCourseClick?.(course)}
              />
            </motion.div>
          ))}
        </div>

        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
          disabled={scrollPosition <= 0}
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default CourseSection;