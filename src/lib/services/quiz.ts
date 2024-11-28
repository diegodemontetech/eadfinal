import { supabase, handleError, handleResponse } from '../api';

export const quizService = {
  async getQuizByLessonId(lessonId: string) {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('lesson_id', lessonId)
        .single();

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  },

  async submitQuiz(quizId: string, answers: number[]) {
    try {
      const { data: quiz, error: quizError } = await supabase
        .from('quizzes')
        .select('*')
        .eq('id', quizId)
        .single();

      if (quizError) throw quizError;

      const questions = JSON.parse(quiz.questions);
      const correctAnswers = answers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0);
      }, 0);

      const grade = (correctAnswers / questions.length) * 100;
      const passed = grade >= quiz.passing_score;

      return { grade, passed };
    } catch (error) {
      return handleError(error);
    }
  }
};