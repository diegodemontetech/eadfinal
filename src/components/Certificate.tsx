import React from 'react';
import { motion } from 'framer-motion';

interface CertificateProps {
  studentName: string;
  courseName: string;
  completionDate: string;
  instructorName: string;
  instructorSignature: string;
}

const Certificate = ({ 
  studentName, 
  courseName, 
  completionDate, 
  instructorName,
  instructorSignature 
}: CertificateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-[1000px] h-[700px] bg-white relative p-12 shadow-2xl mx-auto"
    >
      {/* Border Design */}
      <div className="absolute inset-0 border-[20px] border-[#f0f4ff]" />
      
      {/* VPJ Logo */}
      <div className="absolute top-8 left-8">
        <img 
          src="https://vpjalimentos.com.br/wp-content/uploads/elementor/thumbs/Logo_VPJ_Pecuaria_500x500-1-px12mqh8pvyvzznziu3oe03857dsw7iucidb5ihm2o.png"
          alt="VPJ Logo"
          className="h-16"
        />
      </div>

      {/* Certificate Content */}
      <div className="text-center pt-16">
        <h1 className="text-5xl font-serif text-gray-800 mb-8">CERTIFICADO</h1>
        
        <p className="text-xl text-gray-600 mb-12">
          Este certificado é concedido a
        </p>
        
        <h2 className="text-3xl font-serif text-gray-800 mb-8 font-bold">
          {studentName}
        </h2>
        
        <p className="text-xl text-gray-600 mb-4">
          pela conclusão com êxito do curso
        </p>
        
        <h3 className="text-2xl font-serif text-gray-800 mb-12 font-bold">
          {courseName}
        </h3>

        <div className="flex justify-center gap-32 mt-24">
          <div className="text-center">
            <div className="w-48 border-b border-gray-400 mb-2">
              {completionDate}
            </div>
            <p className="text-gray-600">Data</p>
          </div>

          <div className="text-center">
            <div className="w-48 border-b border-gray-400 mb-2">
              <span className="font-handwriting text-xl">{instructorName}</span>
            </div>
            <p className="text-gray-600">Instrutor</p>
          </div>
        </div>
      </div>

      {/* Gold Seal */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
        <div className="w-24 h-24 rounded-full bg-[#FFD700] flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center">
            <span className="text-white text-2xl font-bold">VPJ</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Certificate;