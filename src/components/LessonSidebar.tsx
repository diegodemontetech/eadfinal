import React from 'react';
import { Lesson } from '../types';

interface LessonSidebarProps {
  lessons: Lesson[];
  currentLessonId: string;
  onLessonSelect: (lessonId: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

const LessonSidebar = ({
  lessons,
  currentLessonId,
  onLessonSelect,
  isCollapsed,
  onToggle
}: LessonSidebarProps) => {
  return (
    <div className={`bg-[#1E1E1E] transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-[400px]'
    }`}>
      <div className="p-6">
        <button
          onClick={onToggle}
          className="mb-6 text-gray-400 hover:text-white transition-colors"
        >
          {isCollapsed ? 'Expandir' : 'Recolher'}
        </button>

        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <button
              key={lesson.id}
              onClick={() => onLessonSelect(lesson.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg transition-colors ${
                lesson.id === currentLessonId
                  ? 'bg-[#E50914] text-white'
                  : 'bg-[#2A2A2A] text-gray-300 hover:bg-[#3A3A3A]'
              }`}
            >
              {isCollapsed ? (
                <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center">
                  {index + 1}
                </div>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center">
                    {lesson.completed ? '✓' : index + 1}
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-medium line-clamp-1">{lesson.title}</h4>
                    <p className="text-sm opacity-80">{lesson.duration}</p>
                  </div>
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonSidebar;