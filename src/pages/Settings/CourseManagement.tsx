import React, { useState } from 'react';
import { Plus, Upload, Save, Trash, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Course, Lesson } from '../../types';

const CourseManagement = () => {
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [courseData, setCourseData] = useState<Partial<Course>>({
    title: '',
    description: '',
    thumbnail: '',
    duration: '',
    category: '',
    rating: 0,
    progress: 0,
    status: 'not_started',
    lessons: []
  });

  const [lessons, setLessons] = useState<Partial<Lesson>[]>([{
    title: '',
    duration: '',
    videoUrl: '',
    description: '',
    completed: false
  }]);

  const handleAddLesson = () => {
    setLessons([...lessons, {
      title: '',
      duration: '',
      videoUrl: '',
      description: '',
      completed: false
    }]);
  };

  const handleLessonChange = (index: number, field: keyof Lesson, value: any) => {
    const newLessons = [...lessons];
    newLessons[index] = { ...newLessons[index], [field]: value };
    setLessons(newLessons);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Course data:', { ...courseData, lessons });
    setIsAddingCourse(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Cursos</h2>
        <button
          onClick={() => setIsAddingCourse(true)}
          className="flex items-center gap-2 bg-[#E50914] text-white px-4 py-2 rounded-md hover:bg-[#b8070f] transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Novo Curso</span>
        </button>
      </div>

      <Dialog.Root open={isAddingCourse} onOpenChange={setIsAddingCourse}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1E1E1E] p-8 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-2xl font-bold text-white">
                Novo Curso
              </Dialog.Title>
              <button 
                onClick={() => setIsAddingCourse(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white">Informações do Curso</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Título do Curso
                  </label>
                  <input
                    type="text"
                    value={courseData.title}
                    onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                    className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                    placeholder="Ex: Gestão Avançada de Pastagens"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={courseData.description}
                    onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                    className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914] h-32"
                    placeholder="Descreva o conteúdo do curso..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Categoria
                    </label>
                    <select
                      value={courseData.category}
                      onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
                      className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                    >
                      <option value="">Selecione...</option>
                      <option value="Gestão">Gestão</option>
                      <option value="Nutrição">Nutrição</option>
                      <option value="Reprodução">Reprodução</option>
                      <option value="Sanidade">Sanidade</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Duração Total
                    </label>
                    <input
                      type="text"
                      value={courseData.duration}
                      onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                      className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                      placeholder="Ex: 4h 30min"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Imagem de Capa
                  </label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400">
                      Arraste uma imagem ou clique para fazer upload
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      PNG, JPG (max. 2MB)
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Aulas do Curso</h3>
                  <button
                    type="button"
                    onClick={handleAddLesson}
                    className="flex items-center gap-2 text-[#E50914] hover:text-[#b8070f] transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Adicionar Aula</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {lessons.map((lesson, index) => (
                    <div key={index} className="bg-[#2A2A2A] rounded-lg p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-medium">Aula {index + 1}</h4>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => setLessons(lessons.filter((_, i) => i !== index))}
                            className="text-gray-400 hover:text-[#E50914] transition-colors"
                          >
                            <Trash className="h-5 w-5" />
                          </button>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Título da Aula
                        </label>
                        <input
                          type="text"
                          value={lesson.title}
                          onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
                          className="w-full bg-[#3A3A3A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                          placeholder="Ex: Introdução ao Manejo de Pastagens"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Descrição da Aula
                        </label>
                        <textarea
                          value={lesson.description}
                          onChange={(e) => handleLessonChange(index, 'description', e.target.value)}
                          className="w-full bg-[#3A3A3A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914] h-24"
                          placeholder="Descreva o conteúdo da aula..."
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Duração
                          </label>
                          <input
                            type="text"
                            value={lesson.duration}
                            onChange={(e) => handleLessonChange(index, 'duration', e.target.value)}
                            className="w-full bg-[#3A3A3A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                            placeholder="Ex: 45min"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            URL do Vídeo
                          </label>
                          <input
                            type="text"
                            value={lesson.videoUrl}
                            onChange={(e) => handleLessonChange(index, 'videoUrl', e.target.value)}
                            className="w-full bg-[#3A3A3A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                            placeholder="Ex: https://youtube.com/..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsAddingCourse(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#E50914] text-white px-6 py-2 rounded-md hover:bg-[#b8070f] transition-colors"
                >
                  <Save className="h-5 w-5" />
                  <span>Salvar Curso</span>
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div className="space-y-4">
        {[
          { title: 'Gestão Avançada de Pastagens', lessons: 8, duration: '4h 30min' },
          { title: 'Nutrição Animal Avançada', lessons: 6, duration: '3h 15min' }
        ].map((course, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-6 bg-[#2A2A2A] rounded-lg"
          >
            <div>
              <h3 className="text-white font-medium mb-1">{course.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{course.lessons} aulas</span>
                <span>{course.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-[#E50914] transition-colors">
                <Trash className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseManagement;