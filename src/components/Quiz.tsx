import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface QuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

const Quiz = ({ questions, onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    const correctAnswers = answers.reduce((acc, answer, index) => {
      return answer === questions[index].correctAnswer ? acc + 1 : acc;
    }, 0);
    const finalScore = (correctAnswers / questions.length) * 10;
    setScore(finalScore);
    setShowResults(true);
    onComplete(finalScore);
  };

  return (
    <div className="max-w-3xl mx-auto bg-[#1E1E1E] rounded-xl p-8">
      {!showResults ? (
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Avaliação da Aula</h2>
            <span className="text-gray-400">
              Questão {currentQuestion + 1} de {questions.length}
            </span>
          </div>

          <div className="bg-[#2A2A2A] rounded-lg p-6">
            <h3 className="text-lg text-white font-medium mb-6">
              {questions[currentQuestion].text}
            </h3>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left p-4 rounded-lg bg-[#3A3A3A] text-gray-300 hover:bg-[#4A4A4A] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-600 flex items-center justify-center text-sm">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E50914] transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="mb-6">
            {score >= 7 ? (
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            ) : (
              <AlertCircle className="h-16 w-16 text-[#E50914] mx-auto" />
            )}
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">
            {score >= 7 ? 'Parabéns!' : 'Continue Tentando!'}
          </h3>
          
          <p className="text-gray-400 mb-6">
            Você completou a avaliação com nota {score.toFixed(1)}/10
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => onComplete(score)}
              className="bg-[#E50914] text-white px-6 py-3 rounded-lg hover:bg-[#b8070f] transition-colors"
            >
              Continuar
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Quiz;