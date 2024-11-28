import React from 'react';
import { Play, Clock, User, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Course } from '../types';
import ProgressCircle from './ProgressCircle';

interface CourseCardProps {
  course: Course;
  layout?: 'grid' | 'carousel';
  onClick?: () => void;
}

const CourseCard = ({ course, layout = 'grid', onClick }: CourseCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`relative flex-none ${
        layout === 'grid' ? 'w-full' : 'w-[400px]'
      } bg-gradient-to-br from-[#2A2A2A] to-[#1E1E1E] rounded-lg overflow-hidden shadow-xl cursor-pointer group`}
      onClick={onClick}
    >
      <div className="relative aspect-video">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-[#E50914] text-white p-4 rounded-full shadow-lg transform -translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            >
              <Play className="h-8 w-8" fill="white" />
            </motion.button>
          </div>
        </div>
        
        {course.status === 'completed' && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full">
            Nota: {course.rating}/10
          </div>
        )}

        <div className="absolute top-2 left-2">
          <span className="bg-[#E50914]/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
            {course.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
            <span>{course.rating}/10</span>
          </div>
        </div>

        <h3 className="text-white text-lg font-bold mb-3 line-clamp-2 group-hover:text-[#E50914] transition-colors">
          {course.title}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">Dr. João Silva</span>
          </div>
        </div>

        {course.progress > 0 && course.status !== 'completed' && (
          <div className="relative flex items-center gap-4">
            <div className="flex-shrink-0">
              <ProgressCircle 
                progress={course.progress} 
                size={48} 
                strokeWidth={4} 
                showLabel={false}
                glowColor="#4ADE80"
              />
            </div>
            <span className="text-sm text-gray-400">
              {course.progress}% concluído
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CourseCard;