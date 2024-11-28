import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { News } from '../../../types';

interface NewsCardProps {
  news: News;
  onClick: () => void;
}

const NewsCard = ({ news, onClick }: NewsCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3">
        <img 
          src={news.thumbnail} 
          alt={news.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-[#E50914] font-medium">
            {news.category}
          </span>
          <span className="text-gray-400">{news.date}</span>
        </div>
        
        <h3 className="text-xl font-medium text-white group-hover:text-[#E50914] transition-colors line-clamp-2">
          {news.title}
        </h3>
        
        <p className="text-gray-400 line-clamp-2">
          {news.description}
        </p>
        
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">
              {news.readTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;