import React from 'react';
import { Save, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  categoryData: {
    name: string;
    description: string;
    isActive: boolean;
    usedIn: {
      courses: boolean;
      ebooks: boolean;
    };
  };
  onChange: (field: string, value: any) => void;
  title: string;
}

const CategoryForm = ({
  isOpen,
  onClose,
  onSubmit,
  categoryData,
  onChange,
  title
}: CategoryFormProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1E1E1E] p-8 rounded-xl w-full max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-2xl font-bold text-white">
              {title}
            </Dialog.Title>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome da Categoria
              </label>
              <input
                type="text"
                value={categoryData.name}
                onChange={(e) => onChange('name', e.target.value)}
                className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                placeholder="Ex: Gestão"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Descrição
              </label>
              <textarea
                value={categoryData.description}
                onChange={(e) => onChange('description', e.target.value)}
                className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914] h-32"
                placeholder="Descreva a categoria..."
                required
              />
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <Checkbox.Root
                  checked={categoryData.usedIn.courses}
                  onCheckedChange={(checked) => 
                    onChange('usedIn', { ...categoryData.usedIn, courses: checked as boolean })
                  }
                  className="h-5 w-5 bg-[#2A2A2A] rounded flex items-center justify-center"
                >
                  <Checkbox.Indicator>
                    <div className="h-4 w-4 bg-[#E50914] rounded-sm" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span className="text-gray-300">Usar em Cursos</span>
              </label>

              <label className="flex items-center gap-3">
                <Checkbox.Root
                  checked={categoryData.usedIn.ebooks}
                  onCheckedChange={(checked) => 
                    onChange('usedIn', { ...categoryData.usedIn, ebooks: checked as boolean })
                  }
                  className="h-5 w-5 bg-[#2A2A2A] rounded flex items-center justify-center"
                >
                  <Checkbox.Indicator>
                    <div className="h-4 w-4 bg-[#E50914] rounded-sm" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span className="text-gray-300">Usar em E-books</span>
              </label>

              <label className="flex items-center gap-3">
                <Checkbox.Root
                  checked={categoryData.isActive}
                  onCheckedChange={(checked) => 
                    onChange('isActive', checked as boolean)
                  }
                  className="h-5 w-5 bg-[#2A2A2A] rounded flex items-center justify-center"
                >
                  <Checkbox.Indicator>
                    <div className="h-4 w-4 bg-[#E50914] rounded-sm" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span className="text-gray-300">Categoria Ativa</span>
              </label>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#E50914] text-white px-6 py-2 rounded-md hover:bg-[#b8070f] transition-colors"
              >
                <Save className="h-5 w-5" />
                <span>Salvar Categoria</span>
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CategoryForm;