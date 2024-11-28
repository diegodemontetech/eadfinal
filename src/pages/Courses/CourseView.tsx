import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, User, Play } from 'lucide-react';
import { Course } from '../../types';

const CourseView = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Mock course data - replace with actual data fetching
  const course: Course = {
    id: courseId || '1',
    title: 'Gestão Avançada de Pastagens',
    thumbnail: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800',
    description: 'Aprenda técnicas modernas de gestão de pastagens para maximizar a produtividade do seu rebanho. Este curso abrange desde conceitos básicos até estratégias avançadas de manejo.',
    duration: '4h 30min',
    rating: 9.2,
    instructor: 'Dr. João Silva',
    lessons: [
      {
        id: 'l1',
        title: 'Introdução ao Manejo de Pastagens',
        description: 'Fundamentos essenciais para compreender o manejo eficiente de pastagens.',
        duration: '45min',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        completed: false,
        attachments: [
          { name: 'Slides da Aula', url: '#' },
          { name: 'Material Complementar', url: '#' }
        ]
      },
      {
        id: 'l2',
        title: 'Técnicas de Rotação',
        description: 'Aprenda as melhores práticas para rotação de pastagens.',
        duration: '1h',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        completed: false,
        attachments: [
          { name: 'Guia Prático', url: '#' }
        ]
      }
    ],
    category: 'Gestão',
    status: 'in_progress',
    progress: 75
  };

  const handleStartLesson = (lessonId: string) => {
    navigate(`/courses/${courseId}/lessons/${lessonId}`);
  };

  return (
    <div className="min-h-screen bg-[#121212] p-8">
      <div className="max-w-[1200px] mx-auto">
        <button
          onClick={() => navigate('/courses')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Voltar para Cursos</span>
        </button>

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
                    <span>{course.instructor}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleStartLesson(course.lessons[0].id)}
                  className="flex items-center gap-3 bg-[#E50914] text-white px-8 py-4 rounded-lg hover:bg-[#b8070f] transition-colors"
                >
                  <Play className="h-5 w-5" fill="currentColor" />
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
                  <button
                    key={lesson.id}
                    onClick={() => handleStartLesson(lesson.id)}
                    className="w-full flex items-center gap-4 p-4 bg-[#2A2A2A] rounded-lg text-left hover:bg-[#3A3A3A] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full border-2 border-gray-600 flex items-center justify-center text-gray-400">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{lesson.title}</h3>
                      <p className="text-sm text-gray-400">{lesson.duration}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#1E1E1E] rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Instrutor</h3>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  alt={course.instructor}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="text-white font-medium">{course.instructor}</p>
                  <p className="text-sm text-gray-400">Especialista em Pastagens</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1E1E1E] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Progresso</h3>
                  <p className="text-sm text-gray-400">{course.progress}% concluído</p>
                </div>
                <div className="h-16 w-16 rounded-full border-4 border-[#E50914] flex items-center justify-center">
                  <span className="text-white font-bold">{course.progress}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;