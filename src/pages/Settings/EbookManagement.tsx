import React, { useState } from 'react';
import { Plus, Upload, Save, Trash, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

const EbookManagement = () => {
  const [isAddingEbook, setIsAddingEbook] = useState(false);

  return (
    <div className="bg-[#1E1E1E] rounded-lg p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">E-books</h2>
        <button 
          onClick={() => setIsAddingEbook(true)}
          className="flex items-center gap-2 bg-[#E50914] text-white px-4 py-2 rounded-md hover:bg-[#b8070f] transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Novo E-book</span>
        </button>
      </div>

      <Dialog.Root open={isAddingEbook} onOpenChange={setIsAddingEbook}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80" />
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#1E1E1E] p-8 rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1E1E1E] pb-6 mb-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <Dialog.Title className="text-2xl font-bold text-white">
                  Novo E-book
                </Dialog.Title>
                <button 
                  onClick={() => setIsAddingEbook(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                  placeholder="Ex: Manual de Gestão de Pastagens"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Autor
                </label>
                <input
                  type="text"
                  className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                  placeholder="Ex: Dr. João Silva"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descrição
                </label>
                <textarea
                  className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914] h-32"
                  placeholder="Descreva o e-book..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Categoria
                </label>
                <select className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]">
                  <option value="">Selecione...</option>
                  <option value="gestao">Gestão</option>
                  <option value="nutricao">Nutrição</option>
                  <option value="reproducao">Reprodução</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Capa
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">
                    Arraste uma imagem ou clique para fazer upload
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Arquivo PDF
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">
                    Arraste o PDF ou clique para fazer upload
                  </p>
                </div>
              </div>

              <div className="sticky bottom-0 bg-[#1E1E1E] pt-6 mt-6 border-t border-gray-800">
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsAddingEbook(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#E50914] text-white px-6 py-2 rounded-md hover:bg-[#b8070f] transition-colors"
                  >
                    <Save className="h-5 w-5" />
                    <span>Salvar E-book</span>
                  </button>
                </div>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div className="space-y-4">
        {['Manual de Gestão de Pastagens', 'Nutrição Animal: Guia Prático'].map((ebook) => (
          <div
            key={ebook}
            className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg"
          >
            <span className="text-gray-300">{ebook}</span>
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

export default EbookManagement;