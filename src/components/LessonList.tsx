import React, { useState } from 'react';
import { Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { Course, Lesson } from '../types';

interface LessonListProps {
  course: Course;
  currentLesson: Lesson;
  onLessonSelect: (lesson: Lesson) => void;
}

const LessonList = ({ course, currentLesson, onLessonSelect }: LessonListProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div 
      className={`bg-[#1E1E1E] rounded-xl transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-full lg:w-[400px]'
      }`}
    >
      <div className="p-6 relative">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -left-3 top-8 bg-[#2A2A2A] p-1.5 rounded-full text-gray-400 hover:text-white transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>

        {isCollapsed ? (
          <div className="space-y-2">
            {course.lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => onLessonSelect(lesson)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  currentLesson?.id === lesson.id
                    ? 'bg-[#E50914] text-white'
                    : 'bg-[#2A2A2A] text-gray-300 hover:bg-[#3A3A3A]'
                }`}
              >
                {lesson.completed ? '✓' : index + 1}
              </button>
            ))}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Aulas do Curso</h2>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                <span className="text-white font-medium">{course.rating}</span>
              </div>
            </div>

            <div className="space-y-2">
              {course.lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  onClick={() => onLessonSelect(lesson)}
                  className={`w-full flex items-center gap-4 p-4 rounded-lg transition-colors ${
                    currentLesson?.id === lesson.id
                      ? 'bg-[#E50914] text-white'
                      : 'bg-[#2A2A2A] text-gray-300 hover:bg-[#3A3A3A]'
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    currentLesson?.id === lesson.id ? 'border-white' : 'border-gray-600'
                  }`}>
                    {lesson.completed ? '✓' : index + 1}
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-medium line-clamp-1">{lesson.title}</h4>
                    <p className="text-sm text-gray-400">{lesson.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LessonList;