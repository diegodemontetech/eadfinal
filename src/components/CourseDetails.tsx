import React from 'react';
import { Play, Star, User, Clock, X } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import { Course, Lesson } from '../types';

interface CourseDetailsProps {
  course: Course;
  onClose: () => void;
  onStartLesson: (lesson: Lesson) => void;
}

const CourseDetails = ({ course, onClose, onStartLesson }: CourseDetailsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8"
    >
      <div className="bg-[#1E1E1E] rounded-xl overflow-hidden max-w-6xl w-full">
        <div className="relative aspect-video">
          <ReactPlayer
            url={course.trailer}
            width="100%"
            height="100%"
            controls
            playing
            light={course.thumbnail}
            playIcon={
              <button className="bg-[#E50914] text-white p-4 rounded-full shadow-lg">
                <Play className="h-8 w-8" fill="white" />
              </button>
            }
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{course.title}</h2>
              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Dr. João Silva</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" fill="currentColor" className="text-yellow-500" />
                  <span>{course.rating}/10</span>
                </div>
              </div>
            </div>

            {course.status === 'not_started' ? (
              <button 
                onClick={() => course.lessons[0] && onStartLesson(course.lessons[0])}
                className="bg-[#E50914] text-white px-6 py-3 rounded-md hover:bg-[#b8070f] transition-colors"
              >
                Iniciar Curso
              </button>
            ) : course.status === 'in_progress' ? (
              <button 
                onClick={() => {
                  const currentLesson = course.lessons.find(lesson => !lesson.completed);
                  if (currentLesson) onStartLesson(currentLesson);
                }}
                className="bg-[#E50914] text-white px-6 py-3 rounded-md hover:bg-[#b8070f] transition-colors"
              >
                Continuar
              </button>
            ) : (
              <div className="bg-green-500 text-white px-4 py-2 rounded-md">
                Concluído • Nota: {course.rating}/10
              </div>
            )}
          </div>

          <p className="text-gray-300 mb-8">{course.description}</p>

          <div className="border-t border-gray-800 pt-8">
            <h3 className="text-xl font-bold text-white mb-6">Módulos do Curso</h3>
            <div className="space-y-4">
              {course.lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  onClick={() => onStartLesson(lesson)}
                  className={`w-full flex items-center gap-4 p-4 rounded-lg transition-colors ${
                    lesson.completed 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-[#2A2A2A] text-gray-300 hover:bg-[#3A3A3A]'
                  }`}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center">
                    {lesson.completed ? (
                      <span>✓</span>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-medium">{lesson.title}</h4>
                    <p className="text-sm text-gray-400">{lesson.duration}</p>
                  </div>
                  <Play className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseDetails;