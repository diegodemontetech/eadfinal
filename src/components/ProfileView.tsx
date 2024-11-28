import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Award, Trophy, BookOpen, GraduationCap, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ProfileViewProps {
  onClose: () => void;
}

const ProfileView = ({ onClose }: ProfileViewProps) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1E1E1E] rounded-xl w-full max-w-4xl overflow-hidden relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-6 mb-8">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{user.name}</h2>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            {[
              { icon: Trophy, label: 'Nota Média', value: `${user.stats.averageGrade}/10` },
              { icon: Clock, label: 'Horas Estudadas', value: `${user.stats.totalHours}h` },
              { icon: BookOpen, label: 'Cursos em Andamento', value: user.stats.inProgressCourses },
              { icon: Award, label: 'Cursos Concluídos', value: user.stats.completedCourses }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-[#2A2A2A] rounded-lg p-6 text-center"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-[#E50914]" />
                <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {user.certificates.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-[#E50914]" />
                <span>Certificados</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {user.certificates.map((cert) => (
                  <div 
                    key={cert.id}
                    className="bg-[#2A2A2A] rounded-lg p-4"
                  >
                    <h4 className="text-white font-medium mb-2">{cert.course.title}</h4>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">
                        Concluído em {new Date(cert.issuedAt).toLocaleDateString()}
                      </span>
                      <span className="text-[#E50914] font-medium">
                        Nota: {cert.grade}/10
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileView;