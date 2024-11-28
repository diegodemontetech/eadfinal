import React from 'react';
import { motion } from 'framer-motion';

interface ProgressCircleProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  glowColor?: string;
}

const ProgressCircle = ({ 
  progress, 
  size = 120, 
  strokeWidth = 8, 
  showLabel = true,
  glowColor = '#4ADE80'
}: ProgressCircleProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg className="absolute inset-0 transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2A2A2A"
          strokeWidth={strokeWidth}
        />
      </svg>

      {/* Progress circle */}
      <motion.svg 
        className="absolute inset-0 transform -rotate-90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={glowColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            filter: `drop-shadow(0 0 8px ${glowColor}80)`
          }}
          strokeLinecap="round"
        />
      </motion.svg>

      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            {progress}%
          </motion.span>
        </div>
      )}
    </div>
  );
};

export default ProgressCircle;