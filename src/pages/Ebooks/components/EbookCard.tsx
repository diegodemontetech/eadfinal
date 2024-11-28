import React from 'react';
import { Star, Download, Clock, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Ebook } from '../../../types';

interface EbookCardProps {
  ebook: Ebook;
  onDownload: (id: string) => void;
}

const EbookCard = ({ ebook, onDownload }: EbookCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-[#1E1E1E] rounded-xl overflow-hidden shadow-lg"
    >
      <div className="flex">
        <div className="w-1/3 relative">
          <img 
            src={ebook.thumbnail}
            alt={ebook.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="bg-[#E50914] text-white text-xs font-medium px-2 py-1 rounded">
              {ebook.category}
            </span>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
              <span className="text-white font-medium">{ebook.rating}</span>
              <span className="text-gray-400">({ebook.totalRatings})</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{ebook.pages} págs</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{ebook.readTime}</span>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
            {ebook.title}
          </h3>

          <p className="text-gray-400 text-sm mb-2">
            por <span className="text-white">{ebook.author}</span>
          </p>

          <p className="text-gray-300 text-sm mb-6 line-clamp-2">
            {ebook.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              Publicado em {new Date(ebook.publishDate).toLocaleDateString('pt-BR')}
            </span>
            <button 
              onClick={() => onDownload(ebook.id)}
              className="flex items-center gap-2 bg-[#E50914] text-white px-4 py-2 rounded-md hover:bg-[#b8070f] transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EbookCard;