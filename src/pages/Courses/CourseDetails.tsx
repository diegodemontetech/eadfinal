import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star, User, Clock, ChevronDown, Share2, MoreHorizontal, Download } from 'lucide-react';
import { Course, Lesson } from '../../types';

const CourseDetails = ({ course, onClose, onStartLesson }: CourseDetailsProps) => {
  // ... existing state and handlers ...

  return (
    <div className="fixed inset-0 bg-[#121212] z-30 overflow-y-auto">
      {/* ... rest of the course details content ... */}
    </div>
  );
};

export default CourseDetails;