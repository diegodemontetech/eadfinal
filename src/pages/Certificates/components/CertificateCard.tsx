import React from 'react';
import { motion } from 'framer-motion';
import { Download, Star } from 'lucide-react';
import { Certificate } from '../../../types';

interface CertificateCardProps {
  certificate: Certificate;
  onDownload: (id: string) => void;
}

const CertificateCard = ({ certificate, onDownload }: CertificateCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-[#1E1E1E] rounded-xl overflow-hidden group cursor-pointer"
    >
      <div className="relative aspect-video">
        <img 
          src={certificate.course.thumbnail}
          alt={certificate.course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 left-4 right-4">
            <button 
              onClick={() => onDownload(certificate.id)}
              className="w-full flex items-center justify-center gap-2 bg-[#E50914] text-white px-4 py-2 rounded-lg hover:bg-[#b8070f] transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-white">{certificate.course.title}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
            <span className="text-white font-medium">{certificate.grade}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>Concluído em {new Date(certificate.issuedAt).toLocaleDateString()}</span>
          <span>{certificate.course.instructor}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;