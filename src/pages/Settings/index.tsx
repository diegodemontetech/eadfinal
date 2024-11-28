import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { Users, BookOpen, Book, Newspaper, Tag } from 'lucide-react';
import UserGroups from './UserGroups';
import UserManagement from './UserManagement';
import CourseManagement from './CourseManagement';
import LessonManagement from './LessonManagement';
import QuizManagement from './QuizManagement';
import EbookManagement from './EbookManagement';
import NewsManagement from './NewsManagement';
import CategoryManagement from './CategoryManagement';

const Settings = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Configurações</h1>

      <Tabs.Root defaultValue="users" className="flex gap-8">
        <Tabs.List className="flex flex-col gap-2 w-64">
          {[
            { id: 'users', label: 'Usuários', icon: Users },
            { id: 'courses', label: 'Cursos', icon: BookOpen },
            { id: 'lessons', label: 'Aulas', icon: BookOpen },
            { id: 'quiz', label: 'Quiz', icon: BookOpen },
            { id: 'categories', label: 'Categorias', icon: Tag },
            { id: 'ebooks', label: 'E-books', icon: Book },
            { id: 'news', label: 'Notícias', icon: Newspaper },
          ].map((tab) => (
            <Tabs.Trigger
              key={tab.id}
              value={tab.id}
              className="flex items-center gap-3 px-4 py-3 text-left text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-colors data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white"
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <div className="flex-1">
          <Tabs.Content value="users">
            <Tabs.Root defaultValue="list">
              <Tabs.List className="flex gap-4 mb-8">
                <Tabs.Trigger
                  value="list"
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#E50914]"
                >
                  Lista de Usuários
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="groups"
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#E50914]"
                >
                  Grupos
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="list">
                <UserManagement />
              </Tabs.Content>
              
              <Tabs.Content value="groups">
                <UserGroups />
              </Tabs.Content>
            </Tabs.Root>
          </Tabs.Content>
          
          <Tabs.Content value="courses">
            <CourseManagement />
          </Tabs.Content>

          <Tabs.Content value="lessons">
            <LessonManagement />
          </Tabs.Content>

          <Tabs.Content value="quiz">
            <QuizManagement />
          </Tabs.Content>

          <Tabs.Content value="categories">
            <CategoryManagement />
          </Tabs.Content>
          
          <Tabs.Content value="ebooks">
            <EbookManagement />
          </Tabs.Content>
          
          <Tabs.Content value="news">
            <NewsManagement />
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
};

export default Settings;