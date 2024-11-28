import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { CertificateLevel } from '../../../types';

interface LevelProgressProps {
  currentLevel: CertificateLevel;
  nextLevel?: CertificateLevel;
  totalCertificates: number;
  progressToNextLevel: number;
}

const LevelProgress = ({ 
  currentLevel, 
  nextLevel, 
  totalCertificates, 
  progressToNextLevel 
}: LevelProgressProps) => {
  return (
    <div className="bg-[#1E1E1E] rounded-xl p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Sua Jornada</h2>
          <p className="text-gray-400">
            {currentLevel.description}
          </p>
        </div>
        <div className="text-center">
          <div className="inline-block p-4 rounded-full bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A]">
            <Trophy 
              className="h-12 w-12"
              style={{ color: currentLevel.color }}
            />
          </div>
          <p className="text-lg font-bold text-white mt-2">
            {currentLevel.name}
          </p>
        </div>
      </div>

      <div className="relative h-4 bg-[#2A2A2A] rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressToNextLevel}%` }}
          className="absolute h-full"
          style={{ backgroundColor: currentLevel.color }}
        />
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-gray-400">
          {totalCertificates} certificados
        </span>
        {nextLevel && (
          <span className="text-gray-400">
            Próximo nível: {nextLevel.name} ({nextLevel.minCertificates - totalCertificates} certificados restantes)
          </span>
        )}
      </div>
    </div>
  );
};

export default LevelProgress;