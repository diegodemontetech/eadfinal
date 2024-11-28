import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Lesson } from '../types';

interface CoursePlayerProps {
  lesson: Lesson;
}

const CoursePlayer = ({ lesson }: CoursePlayerProps) => {
  const [rating, setRating] = useState(0);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);

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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">{lesson.title}</h1>
      
      <div className="aspect-video rounded-xl overflow-hidden bg-black w-full max-w-[1200px] mx-auto">
        <ReactPlayer
          url={lesson.videoUrl}
          width="100%"
          height="100%"
          controls
          playing
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-b border-gray-800 py-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`p-1 transition-colors ${
                  rating >= star ? 'text-yellow-500' : 'text-gray-600'
                }`}
              >
                <Star className="h-6 w-6" fill={rating >= star ? 'currentColor' : 'none'} />
              </button>
            ))}
            <span className="text-sm text-gray-400 ml-2">
              {rating > 0 ? `${rating}/5` : 'Avalie esta aula'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleVote('like')}
              className={`flex items-center gap-2 ${
                userVote === 'like' ? 'text-green-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <ThumbsUp className="h-5 w-5" />
              <span>{likes}</span>
            </button>
            <button
              onClick={() => handleVote('dislike')}
              className={`flex items-center gap-2 ${
                userVote === 'dislike' ? 'text-red-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <ThumbsDown className="h-5 w-5" />
              <span>{dislikes}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;