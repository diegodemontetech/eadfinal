import { supabase } from './config';
import { handleError, handleResponse } from './config';

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

  async createQuiz(lessonId: string, questions: any[], passingScore: number = 70) {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .insert([{
          lesson_id: lessonId,
          questions: JSON.stringify(questions),
          passing_score: passingScore
        }])
        .select()
        .single();

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  },

  async updateQuiz(id: string, questions: any[], passingScore?: number) {
    try {
      const updateData: any = { questions: JSON.stringify(questions) };
      if (passingScore !== undefined) {
        updateData.passing_score = passingScore;
      }

      const { data, error } = await supabase
        .from('quizzes')
        .update(updateData)
        .eq('id', id)
        .select()
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

      // Update course progress if passed
      if (passed) {
        const { data: lesson, error: lessonError } = await supabase
          .from('lessons')
          .select('course_id')
          .eq('id', quiz.lesson_id)
          .single();

        if (lessonError) throw lessonError;

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user found');

        await supabase.from('course_progress').upsert({
          user_id: user.id,
          course_id: lesson.course_id,
          grade,
          status: 'completed',
          completed_at: new Date().toISOString()
        });
      }

      return { grade, passed };
    } catch (error) {
      return handleError(error);
    }
  }
};