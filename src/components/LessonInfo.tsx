import React from 'react';
import { Clock, User, Download, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import { Lesson } from '../types';

interface LessonInfoProps {
  lesson: Lesson;
  instructor: string;
  likes: number;
  dislikes: number;
  userVote: 'like' | 'dislike' | null;
  onVote: (type: 'like' | 'dislike') => void;
  onToggleComments: () => void;
}

const LessonInfo = ({
  lesson,
  instructor,
  likes,
  dislikes,
  userVote,
  onVote,
  onToggleComments
}: LessonInfoProps) => {
  return (
    <div className="space-y-8">
      <div className="bg-[#1E1E1E] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="h-4 w-4" />
              <span>{lesson.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <User className="h-4 w-4" />
              <span>{instructor}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onVote('like')}
              className={`flex items-center gap-2 ${
                userVote === 'like' ? 'text-green-500' : 'text-gray-400 hover:text-white'
              } transition-colors`}
            >
              <ThumbsUp className="h-5 w-5" />
              <span>{likes}</span>
            </button>
            <button
              onClick={() => onVote('dislike')}
              className={`flex items-center gap-2 ${
                userVote === 'dislike' ? 'text-red-500' : 'text-gray-400 hover:text-white'
              } transition-colors`}
            >
              <ThumbsDown className="h-5 w-5" />
              <span>{dislikes}</span>
            </button>
            <button
              onClick={onToggleComments}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Comentários</span>
            </button>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-4">Sobre esta aula</h2>
        <p className="text-gray-300">{lesson.description}</p>
      </div>

      {lesson.attachments && lesson.attachments.length > 0 && (
        <div className="bg-[#1E1E1E] rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Material de Apoio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lesson.attachments.map((attachment, index) => (
              <a
                key={index}
                href={attachment.url}
                className="flex items-center gap-3 p-4 bg-[#2A2A2A] rounded-lg text-gray-300 hover:bg-[#3A3A3A] transition-colors group"
              >
                <Download className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <p className="font-medium">{attachment.name}</p>
                  <p className="text-sm text-gray-400">PDF • 2.3 MB</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonInfo;