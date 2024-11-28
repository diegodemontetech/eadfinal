import React from 'react';
import { Play, Clock, Star, User, BookOpen } from 'lucide-react';
import { Course } from '../types';

interface CourseOverviewProps {
  course: Course;
  onStartCourse: () => void;
}

const CourseOverview = ({ course, onStartCourse }: CourseOverviewProps) => {
  return (
    <div>
      <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-12">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold text-white mb-4">{course.title}</h1>
              <div className="flex items-center gap-6 text-gray-300 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                  <span>{course.rating}/10</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>Dr. João Silva</span>
                </div>
              </div>
              <button
                onClick={onStartCourse}
                className="flex items-center gap-3 bg-[#E50914] text-white px-8 py-4 rounded-lg hover:bg-[#b8070f] transition-colors"
              >
                <Play className="h-6 w-6" fill="white" />
                <span className="text-lg font-medium">Iniciar Curso</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
        <div className="space-y-8">
          <div className="bg-[#1E1E1E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Sobre o Curso</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {course.description}
            </p>
          </div>

          <div className="bg-[#1E1E1E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Conteúdo do Curso</h2>
            <div className="space-y-4">
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="flex items-center gap-4 p-4 bg-[#2A2A2A] rounded-lg"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-gray-600 flex items-center justify-center text-gray-400">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{lesson.title}</h3>
                    <p className="text-sm text-gray-400">{lesson.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#1E1E1E] rounded-xl p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#2A2A2A] rounded-lg p-4 text-center">
                <BookOpen className="h-6 w-6 text-[#E50914] mx-auto mb-2" />
                <p className="text-sm text-gray-400">Aulas</p>
                <p className="text-xl font-bold text-white">{course.lessons.length}</p>
              </div>
              <div className="bg-[#2A2A2A] rounded-lg p-4 text-center">
                <Clock className="h-6 w-6 text-[#E50914] mx-auto mb-2" />
                <p className="text-sm text-gray-400">Duração</p>
                <p className="text-xl font-bold text-white">{course.duration}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1E1E1E] rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Instrutor</h3>
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="Instrutor"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="text-white font-medium">Dr. João Silva</p>
                <p className="text-sm text-gray-400">Especialista em Pastagens</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;