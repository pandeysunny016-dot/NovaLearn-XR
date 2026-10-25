// src/modules/quizEngine.js — Dynamic quiz assessment engine with scoring, review, and shuffling

class QuizEngine {
  constructor(questionBank, progressManager) {
    this.questionBank = questionBank;
    this.progressManager = progressManager;
    this.currentQuiz = null;
  }

  startQuiz(moduleId, numQuestions = 6, shuffle = true) {
    const pool = this.questionBank[moduleId] || [];
    if (pool.length === 0) return null;

    let selected = [...pool];
    if (shuffle) {
      selected = selected.sort(() => Math.random() - 0.5);
    }
    selected = selected.slice(0, Math.min(numQuestions, pool.length));

    this.currentQuiz = {
      moduleId,
      startedAt: new Date().toISOString(),
      questions: selected.map(q => ({
        id: q.id,
        question: q.question,
        options: [...q.options],
        correct: q.correct,
        explanation: q.explanation,
        userSelection: null
      })),
      currentIndex: 0,
      isSubmitted: false,
      score: 0,
      total: selected.length
    };

    return this.currentQuiz;
  }

  answerQuestion(questionIndex, optionIndex) {
    if (!this.currentQuiz || this.currentQuiz.isSubmitted) return;
    if (questionIndex >= 0 && questionIndex < this.currentQuiz.questions.length) {
      this.currentQuiz.questions[questionIndex].userSelection = optionIndex;
    }
  }

  submitQuiz() {
    if (!this.currentQuiz || this.currentQuiz.isSubmitted) return null;

    const incorrectQuestions = [];
    let score = 0;
    this.currentQuiz.questions.forEach(q => {
      if (q.userSelection !== null && q.userSelection === q.correct) {
        score++;
      } else {
        incorrectQuestions.push({
          id: q.id,
          question: q.question,
          options: q.options,
          correct: q.correct,
          userSelection: q.userSelection,
          explanation: q.explanation,
          moduleId: this.currentQuiz.moduleId
        });
      }
    });

    this.currentQuiz.score = score;
    this.currentQuiz.isSubmitted = true;
    this.currentQuiz.submittedAt = new Date().toISOString();
    this.currentQuiz.incorrectQuestions = incorrectQuestions;

    // Save incorrect questions into progress data for Revision
    if (!this.progressManager.data.incorrectQuizAnswers) {
      this.progressManager.data.incorrectQuizAnswers = [];
    }
    incorrectQuestions.forEach(iq => {
      const exists = this.progressManager.data.incorrectQuizAnswers.find(x => x.id === iq.id);
      if (!exists) this.progressManager.data.incorrectQuizAnswers.push(iq);
    });

    const attempt = this.progressManager.recordQuizAttempt(
      this.currentQuiz.moduleId,
      score,
      this.currentQuiz.total,
      {
        questionsCount: this.currentQuiz.total,
        score,
        incorrectCount: incorrectQuestions.length
      }
    );

    return {
      score,
      total: this.currentQuiz.total,
      percentage: Math.round((score / this.currentQuiz.total) * 100),
      questions: this.currentQuiz.questions,
      incorrectQuestions,
      attempt
    };
  }

  getIncorrectQuestions() {
    return (this.currentQuiz && this.currentQuiz.incorrectQuestions) || [];
  }

  getCurrentState() {
    return this.currentQuiz;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QuizEngine };
}
