import React from 'react';
import { Filter } from 'lucide-react';

interface NewsFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const NewsFilter = ({ searchTerm, onSearchChange }: NewsFilterProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar notícias..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-64 bg-[#2A2A2A] text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50914]"
      />
      <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    </div>
  );
};

export default NewsFilter;