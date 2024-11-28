import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { certificateService } from '../../services/api';
import { useApi } from '../../hooks/useApi';
import { useToast } from '../../hooks/useToast';
import { Certificate, CertificateLevel } from '../../types';
import { certificateLevels } from '../../data/certificateLevels';
import CertificateCard from './components/CertificateCard';
import LevelProgress from './components/LevelProgress';

const CertificatesPage = () => {
  const { showToast } = useToast();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [userProgress, setUserProgress] = useState({
    totalCertificates: 0,
    currentLevel: certificateLevels[0],
    nextLevel: certificateLevels[1],
    progressToNextLevel: 0
  });

  const { loading } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch certificates
        const certificatesData = await certificateService.getUserCertificates();
        setCertificates(Array.isArray(certificatesData) ? certificatesData : []);

        // Fetch user progress
        const progressData = await certificateService.getUserProgress();
        if (progressData) {
          setUserProgress(progressData);
        }
      } catch (error) {
        console.error('Error fetching certificates:', error);
        showToast('error', 'Erro ao carregar certificados');
      }
    };

    fetchData();
  }, [showToast]);

  const handleDownload = async (id: string) => {
    try {
      const certificateData = await certificateService.downloadCertificate(id);
      const blob = new Blob([certificateData], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `certificate-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading certificate:', error);
      showToast('error', 'Erro ao baixar certificado');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <LevelProgress {...userProgress} />

      {/* Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {certificateLevels.map((level) => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1E1E1E] rounded-xl p-6 relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{level.name}</h3>
                <p className="text-sm text-gray-400">
                  {level.minCertificates}-{level.maxCertificates === Infinity ? '+' : level.maxCertificates} certificados
                </p>
              </div>
              <Award 
                className="h-8 w-8"
                style={{ color: level.color }}
              />
            </div>
            <p className="text-gray-300 text-sm">{level.description}</p>
            
            {userProgress.currentLevel.id === level.id && (
              <div className="absolute top-2 right-2">
                <span className="inline-block px-2 py-1 text-xs font-medium text-white rounded-full" style={{ backgroundColor: level.color }}>
                  Nível Atual
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Certificates Grid */}
      <h2 className="text-2xl font-bold text-white mb-6">Seus Certificados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(certificates) && certificates.map((certificate) => (
          <CertificateCard
            key={certificate.id}
            certificate={certificate}
            onDownload={handleDownload}
          />
        ))}
      </div>
    </div>
  );
};

export default CertificatesPage;