import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseView from './pages/Courses/CourseView';
import LessonView from './pages/Courses/LessonView';
import Ebooks from './pages/Ebooks';
import Blog from './pages/Blog';
import BlogPost from './pages/Blog/BlogPost';
import Settings from './pages/Settings';
import Certificates from './pages/Certificates';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:courseId" element={<CourseView />} />
        <Route path="courses/:courseId/lessons/:lessonId" element={<LessonView />} />
        <Route path="ebooks" element={<Ebooks />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:postId" element={<BlogPost />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="settings/*" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default App;