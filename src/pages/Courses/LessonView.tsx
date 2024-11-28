import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import VideoPlayer from '../../components/VideoPlayer';
import LessonSidebar from '../../components/LessonSidebar';
import LessonInfo from '../../components/LessonInfo';
import CommentSection from '../../components/CommentSection';
import { Course } from '../../types';

const LessonView = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Mock course data - replace with actual data fetching
  const course: Course = {
    id: courseId || '1',
    title: 'Gestão Avançada de Pastagens',
    thumbnail: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800',
    description: 'Aprenda técnicas modernas de gestão de pastagens para maximizar a produtividade.',
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

  const currentLesson = course.lessons.find(lesson => lesson.id === lessonId);

  if (!currentLesson) {
    return null;
  }

  const handleProgress = ({ played }: { played: number }) => {
    if (played >= 0.9 && !isVideoCompleted) {
      setIsVideoCompleted(true);
    }
  };

  const handleVote = (type: 'like' | 'dislike') => {
    if (userVote === type) {
      setUserVote(null);
      if (type === 'like') setLikes(prev => prev - 1);
      else setDislikes(prev => prev - 1);
    } else {
      if (userVote) {
        if (userVote === 'like') setLikes(prev => prev - 1);
        else setDislikes(prev => prev - 1);
      }
      setUserVote(type);
      if (type === 'like') setLikes(prev => prev + 1);
      else setDislikes(prev => prev + 1);
    }
  };

  const handleLessonSelect = (newLessonId: string) => {
    if (newLessonId !== lessonId) {
      navigate(`/courses/${courseId}/lessons/${newLessonId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <header className="fixed top-0 left-0 right-0 bg-[#141414] h-14 flex items-center px-4 z-10">
        <button 
          onClick={() => navigate(`/courses/${courseId}`)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Voltar para o curso</span>
        </button>
      </header>

      <div className="pt-14 flex">
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-white mb-4">
            {currentLesson.title}
          </h1>

          <VideoPlayer
            url={currentLesson.videoUrl}
            onProgress={handleProgress}
          />

          <div className="mt-8">
            <LessonInfo
              lesson={currentLesson}
              instructor={course.instructor}
              likes={likes}
              dislikes={dislikes}
              userVote={userVote}
              onVote={handleVote}
              onToggleComments={() => setShowComments(!showComments)}
            />

            {showComments && (
              <div className="mt-8">
                <CommentSection lessonId={currentLesson.id} />
              </div>
            )}
          </div>
        </main>

        <LessonSidebar
          lessons={course.lessons}
          currentLessonId={currentLesson.id}
          onLessonSelect={handleLessonSelect}
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>
    </div>
  );
};

export default LessonView;