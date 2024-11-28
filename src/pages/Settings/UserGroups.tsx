import React, { useState } from 'react';
import { Plus, Save, Trash } from 'lucide-react';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';

interface Course {
  id: string;
  title: string;
  category: string;
}

interface UserGroup {
  id: string;
  name: string;
  permissions: string[];
  courses: string[];
}

const mockCourses: Course[] = [
  { id: '1', title: 'Gestão Avançada de Pastagens', category: 'Gestão' },
  { id: '2', title: 'Nutrição Animal Avançada', category: 'Nutrição' },
  { id: '3', title: 'Manejo Sanitário', category: 'Sanidade' }
];

const UserGroups = () => {
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const handleSaveGroup = () => {
    const newGroup = {
      name: groupName,
      permissions: selectedPermissions,
      courses: selectedCourses
    };
    console.log('Saving group:', newGroup);
    setIsAddingGroup(false);
    resetForm();
  };

  const resetForm = () => {
    setGroupName('');
    setSelectedPermissions([]);
    setSelectedCourses([]);
  };

  return (
    <div className="bg-[#1E1E1E] rounded-lg p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Grupos de Usuários</h2>
          <button
            onClick={() => setIsAddingGroup(true)}
            className="flex items-center gap-2 bg-[#E50914] text-white px-4 py-2 rounded-md hover:bg-[#b8070f] transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Novo Grupo</span>
          </button>
        </div>

        <Dialog.Root open={isAddingGroup} onOpenChange={setIsAddingGroup}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/80" />
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1E1E1E] p-8 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <Dialog.Title className="text-2xl font-bold text-white mb-6">
                Novo Grupo de Usuários
              </Dialog.Title>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome do Grupo
                  </label>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                    placeholder="Ex: Administradores"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Permissões do Sistema</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'dashboard', label: 'Dashboard' },
                      { id: 'courses', label: 'Cursos' },
                      { id: 'ebooks', label: 'E-books' },
                      { id: 'news', label: 'Notícias' },
                      { id: 'certificates', label: 'Certificados' },
                      { id: 'settings', label: 'Configurações' }
                    ].map((permission) => (
                      <label
                        key={permission.id}
                        className="flex items-center gap-3 p-4 bg-[#2A2A2A] rounded-lg cursor-pointer group"
                      >
                        <Checkbox.Root
                          className="h-5 w-5 bg-gray-700 rounded flex items-center justify-center group-hover:bg-gray-600"
                          checked={selectedPermissions.includes(permission.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedPermissions([...selectedPermissions, permission.id]);
                            } else {
                              setSelectedPermissions(selectedPermissions.filter(id => id !== permission.id));
                            }
                          }}
                        >
                          <Checkbox.Indicator>
                            <div className="h-4 w-4 bg-[#E50914] rounded-sm" />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <span className="text-gray-300">{permission.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Acesso aos Cursos</h3>
                  <div className="space-y-4">
                    {Object.entries(
                      mockCourses.reduce((acc, course) => {
                        if (!acc[course.category]) {
                          acc[course.category] = [];
                        }
                        acc[course.category].push(course);
                        return acc;
                      }, {} as Record<string, Course[]>)
                    ).map(([category, courses]) => (
                      <div key={category} className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-400">{category}</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {courses.map((course) => (
                            <label
                              key={course.id}
                              className="flex items-center gap-3 p-4 bg-[#2A2A2A] rounded-lg cursor-pointer group"
                            >
                              <Checkbox.Root
                                className="h-5 w-5 bg-gray-700 rounded flex items-center justify-center group-hover:bg-gray-600"
                                checked={selectedCourses.includes(course.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedCourses([...selectedCourses, course.id]);
                                  } else {
                                    setSelectedCourses(selectedCourses.filter(id => id !== course.id));
                                  }
                                }}
                              >
                                <Checkbox.Indicator>
                                  <div className="h-4 w-4 bg-[#E50914] rounded-sm" />
                                </Checkbox.Indicator>
                              </Checkbox.Root>
                              <span className="text-gray-300">{course.title}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={() => {
                    setIsAddingGroup(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveGroup}
                  className="flex items-center gap-2 bg-[#E50914] text-white px-6 py-2 rounded-md hover:bg-[#b8070f] transition-colors"
                >
                  <Save className="h-5 w-5" />
                  <span>Salvar Grupo</span>
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <div className="space-y-4 mt-8">
          {['Administradores', 'Instrutores', 'Alunos'].map((group) => (
            <div
              key={group}
              className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg"
            >
              <span className="text-gray-300">{group}</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setGroupName(group);
                    setIsAddingGroup(true);
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Editar
                </button>
                <button className="text-gray-400 hover:text-[#E50914] transition-colors">
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserGroups;