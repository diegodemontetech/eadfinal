import React, { useState } from 'react';
import { Plus, Upload, Save, Trash, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';

const NewsManagement = () => {
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [newsData, setNewsData] = useState({
    title: '',
    content: '',
    category: '',
    isHomepageCarousel: false,
    isMainHighlight: false,
    thumbnail: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('News data:', newsData);
    setIsAddingNews(false);
  };

  return (
    <div className="bg-[#1E1E1E] rounded-lg p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">Notícias</h2>
        <button 
          onClick={() => setIsAddingNews(true)}
          className="flex items-center gap-2 bg-[#E50914] text-white px-4 py-2 rounded-md hover:bg-[#b8070f] transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nova Notícia</span>
        </button>
      </div>

      <Dialog.Root open={isAddingNews} onOpenChange={setIsAddingNews}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80" />
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#1E1E1E] p-8 rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1E1E1E] pb-6 mb-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <Dialog.Title className="text-2xl font-bold text-white">
                  Nova Notícia
                </Dialog.Title>
                <button 
                  onClick={() => setIsAddingNews(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={newsData.title}
                  onChange={(e) => setNewsData({ ...newsData, title: e.target.value })}
                  className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Conteúdo
                </label>
                <textarea
                  value={newsData.content}
                  onChange={(e) => setNewsData({ ...newsData, content: e.target.value })}
                  className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914] h-48"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Categoria
                </label>
                <select
                  value={newsData.category}
                  onChange={(e) => setNewsData({ ...newsData, category: e.target.value })}
                  className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                >
                  <option value="">Selecione...</option>
                  <option value="tecnologia">Tecnologia</option>
                  <option value="sustentabilidade">Sustentabilidade</option>
                  <option value="inovacao">Inovação</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <Checkbox.Root
                    checked={newsData.isHomepageCarousel}
                    onCheckedChange={(checked) => 
                      setNewsData({ ...newsData, isHomepageCarousel: checked as boolean })
                    }
                    className="h-5 w-5 bg-[#2A2A2A] rounded flex items-center justify-center"
                  >
                    <Checkbox.Indicator>
                      <div className="h-4 w-4 bg-[#E50914] rounded-sm" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span className="text-gray-300">Destaque Carrossel (Homepage)</span>
                </label>

                <label className="flex items-center gap-3">
                  <Checkbox.Root
                    checked={newsData.isMainHighlight}
                    onCheckedChange={(checked) => 
                      setNewsData({ ...newsData, isMainHighlight: checked as boolean })
                    }
                    className="h-5 w-5 bg-[#2A2A2A] rounded flex items-center justify-center"
                  >
                    <Checkbox.Indicator>
                      <div className="h-4 w-4 bg-[#E50914] rounded-sm" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span className="text-gray-300">Destaque Principal (Página de Notícias)</span>
                </label>
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
                </div>
              </div>

              <div className="sticky bottom-0 bg-[#1E1E1E] pt-6 mt-6 border-t border-gray-800">
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsAddingNews(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#E50914] text-white px-6 py-2 rounded-md hover:bg-[#b8070f] transition-colors"
                  >
                    <Save className="h-5 w-5" />
                    <span>Publicar Notícia</span>
                  </button>
                </div>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default NewsManagement;