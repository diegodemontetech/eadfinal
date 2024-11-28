import React, { useState } from 'react';
import { Plus, Save, Trash, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: string;
  courseId: string;
  lessonId: string;
  title: string;
  description: string;
  questions: Question[];
  passingScore: number;
}

const QuizManagement = () => {
  const [isAddingQuiz, setIsAddingQuiz] = useState(false);
  const [quizData, setQuizData] = useState<Quiz>({
    id: '',
    courseId: '',
    lessonId: '',
    title: '',
    description: '',
    questions: [{ id: '1', text: '', options: ['', '', '', ''], correctAnswer: 0 }],
    passingScore: 70
  });

  const handleAddQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          id: (quizData.questions.length + 1).toString(),
          text: '',
          options: ['', '', '', ''],
          correctAnswer: 0
        }
      ]
    });
  };

  const handleQuestionChange = (index: number, field: keyof Question, value: any) => {
    const newQuestions = [...quizData.questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...quizData.questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quiz data:', quizData);
    setIsAddingQuiz(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Quiz</h2>
        <button
          onClick={() => setIsAddingQuiz(true)}
          className="flex items-center gap-2 bg-[#E50914] text-white px-4 py-2 rounded-md hover:bg-[#b8070f] transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Novo Quiz</span>
        </button>
      </div>

      <Dialog.Root open={isAddingQuiz} onOpenChange={setIsAddingQuiz}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1E1E1E] p-8 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-2xl font-bold text-white">
                Novo Quiz
              </Dialog.Title>
              <button 
                onClick={() => setIsAddingQuiz(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Curso
                </label>
                <select
                  value={quizData.courseId}
                  onChange={(e) => setQuizData({ ...quizData, courseId: e.target.value })}
                  className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                >
                  <option value="">Selecione o curso...</option>
                  <option value="1">Gestão Avançada de Pastagens</option>
                  <option value="2">Nutrição Animal Avançada</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Aula
                </label>
                <select
                  value={quizData.lessonId}
                  onChange={(e) => setQuizData({ ...quizData, lessonId: e.target.value })}
                  className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                >
                  <option value="">Selecione a aula...</option>
                  <option value="1">Introdução ao Manejo de Pastagens</option>
                  <option value="2">Técnicas de Rotação</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Título do Quiz
                </label>
                <input
                  type="text"
                  value={quizData.title}
                  onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                  className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                  placeholder="Ex: Avaliação Final - Manejo de Pastagens"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descrição
                </label>
                <textarea
                  value={quizData.description}
                  onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
                  className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914] h-24"
                  placeholder="Instruções ou descrição do quiz..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nota Mínima para Aprovação (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={quizData.passingScore}
                  onChange={(e) => setQuizData({ ...quizData, passingScore: parseInt(e.target.value) })}
                  className="w-32 bg-[#2A2A2A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                />
              </div>

              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Questões</h3>
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="flex items-center gap-2 text-[#E50914] hover:text-[#b8070f] transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Adicionar Questão</span>
                  </button>
                </div>

                {quizData.questions.map((question, questionIndex) => (
                  <div
                    key={question.id}
                    className="bg-[#2A2A2A] rounded-lg p-6 space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-medium">Questão {questionIndex + 1}</h4>
                      {questionIndex > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newQuestions = quizData.questions.filter((_, i) => i !== questionIndex);
                            setQuizData({ ...quizData, questions: newQuestions });
                          }}
                          className="text-gray-400 hover:text-[#E50914] transition-colors"
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Pergunta
                      </label>
                      <input
                        type="text"
                        value={question.text}
                        onChange={(e) => handleQuestionChange(questionIndex, 'text', e.target.value)}
                        className="w-full bg-[#3A3A3A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                        placeholder="Digite a pergunta..."
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-300">
                        Alternativas
                      </label>
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-4">
                          <input
                            type="radio"
                            name={`correct-${question.id}`}
                            checked={question.correctAnswer === optionIndex}
                            onChange={() => handleQuestionChange(questionIndex, 'correctAnswer', optionIndex)}
                            className="h-4 w-4 text-[#E50914] focus:ring-[#E50914]"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                            className="flex-1 bg-[#3A3A3A] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                            placeholder={`Alternativa ${optionIndex + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsAddingQuiz(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#E50914] text-white px-6 py-2 rounded-md hover:bg-[#b8070f] transition-colors"
                >
                  <Save className="h-5 w-5" />
                  <span>Salvar Quiz</span>
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div className="space-y-4">
        {[
          { title: 'Avaliação - Manejo de Pastagens', questions: 5 },
          { title: 'Quiz - Técnicas de Rotação', questions: 3 }
        ].map((quiz, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#3A3A3A] flex items-center justify-center text-gray-400">
                {index + 1}
              </div>
              <div>
                <h3 className="text-white font-medium">{quiz.title}</h3>
                <p className="text-gray-400 text-sm">{quiz.questions} questões</p>
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

export default QuizManagement;