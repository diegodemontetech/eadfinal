import React, { useState } from 'react';
import { Plus, Upload, Save, Play, Clock, FileText, Trash, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoFile: File | null;
  attachments: File[];
  courseId: string;
}

const LessonManagement = () => {
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [lessonData, setLessonData] = useState<Lesson>({
    id: '',
    title: '',
    description: '',
    duration: '',
    videoFile: null,
    attachments: [],
    courseId: ''
  });

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLessonData({ ...lessonData, videoFile: file });
    }
  };

  const handleAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setLessonData({ ...lessonData, attachments: [...lessonData.attachments, ...files] });
  };

  const handleRemoveAttachment = (index: number) => {
    const newAttachments = [...lessonData.attachments];
    newAttachments.splice(index, 1);
    setLessonData({ ...lessonData, attachments: newAttachments });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Lesson data:', lessonData);
    setIsAddingLesson(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Aulas</h2>
        <button
          onClick={() => setIsAddingLesson(true)}
          className="flex items-center gap-2 bg-[#E50914] text-white px-4 py-2 rounded-md hover:bg-[#b8070f] transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nova Aula</span>
        </button>
      </div>

      <Dialog.Root open={isAddingLesson} onOpenChange={setIsAddingLesson}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1E1E1E] p-8 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-2xl font-bold text-white">
                Nova Aula
              </Dialog.Title>
              <button 
                onClick={() => setIsAddingLesson(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Curso
                </label>
                <select
                  value={lessonData.courseId}
                  onChange={(e) => setLessonData({ ...lessonData, courseId: e.target.value })}
                  className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                >
                  <option value="">Selecione o curso...</option>
                  <option value="1">Gestão Avançada de Pastagens</option>
                  <option value="2">Nutrição Animal Avançada</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Título da Aula
                </label>
                <input
                  type="text"
                  value={lessonData.title}
                  onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
                  className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                  placeholder="Ex: Introdução ao Manejo de Pastagens"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descrição
                </label>
                <textarea
                  value={lessonData.description}
                  onChange={(e) => setLessonData({ ...lessonData, description: e.target.value })}
                  className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914] h-32"
                  placeholder="Descreva o conteúdo da aula..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Duração
                </label>
                <input
                  type="text"
                  value={lessonData.duration}
                  onChange={(e) => setLessonData({ ...lessonData, duration: e.target.value })}
                  className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                  placeholder="Ex: 45min"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Vídeo da Aula
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Play className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-400 text-center mb-2">
                      {lessonData.videoFile
                        ? `Arquivo selecionado: ${lessonData.videoFile.name}`
                        : 'Clique para fazer upload do vídeo'}
                    </p>
                    <p className="text-sm text-gray-500">
                      MP4, WebM (máx. 2GB)
                    </p>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Material de Apoio
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    onChange={handleAttachmentUpload}
                    className="hidden"
                    id="attachment-upload"
                    multiple
                  />
                  <label
                    htmlFor="attachment-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <FileText className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-400 text-center mb-2">
                      Clique para adicionar materiais de apoio
                    </p>
                    <p className="text-sm text-gray-500">
                      PDF, DOCX, PPTX (máx. 50MB por arquivo)
                    </p>
                  </label>
                </div>

                {lessonData.attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium text-gray-300">
                      Arquivos Selecionados:
                    </h4>
                    {lessonData.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-[#2A2A2A] rounded-lg"
                      >
                        <span className="text-sm text-gray-300">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveAttachment(index)}
                          className="text-gray-400 hover:text-[#E50914] transition-colors"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsAddingLesson(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#E50914] text-white px-6 py-2 rounded-md hover:bg-[#b8070f] transition-colors"
                >
                  <Save className="h-5 w-5" />
                  <span>Salvar Aula</span>
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div className="space-y-4">
        {[
          { title: 'Introdução ao Manejo de Pastagens', duration: '45min' },
          { title: 'Técnicas de Rotação', duration: '1h' }
        ].map((lesson, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#3A3A3A] flex items-center justify-center text-gray-400">
                {index + 1}
              </div>
              <div>
                <h3 className="text-white font-medium">{lesson.title}</h3>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{lesson.duration}</span>
                </div>
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

export default LessonManagement;