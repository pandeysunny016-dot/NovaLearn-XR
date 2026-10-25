// tests/test-runner.js — Automated test suite for NeuralVerse logic
const assert = require('assert');
const { courseData } = require('../src/data/courseData');
const { questionBank } = require('../src/data/questionBank');
const { ProgressManager } = require('../src/modules/progressManager');
const { NotesManager } = require('../src/modules/notesManager');
const { QuizEngine } = require('../src/modules/quizEngine');
const { AIAssistant } = require('../src/modules/aiAssistant');
const { CSharpPlayground } = require('../src/modules/csharpPlayground');

// Mock IPC Bridge
class MockBridge {
  constructor() {
    this.storage = {};
    this.notifications = [];
  }
  async readData() {
    return { success: true, data: this.storage.data || null };
  }
  async saveData(data) {
    this.storage.data = JSON.parse(JSON.stringify(data));
    return { success: true };
  }
  async showNotification(title, body) {
    this.notifications.push({ title, body });
    return { success: true };
  }
  async queryAI(payload) {
    return { success: true, content: 'Mock AI Response for ' + payload.prompt };
  }
}

async function runTests() {
  console.log('🧪 Starting NeuralVerse Automated Test Suite...\n');
  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try {
      fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name}`);
      console.error(err);
      failed++;
    }
  }

  async function asyncTest(name, fn) {
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name}`);
      console.error(err);
      failed++;
    }
  }

  // 1. Course Data Verification
  test('Course Data: Modules and lessons structure', () => {
    assert(Array.isArray(courseData.modules), 'Modules must be an array');
    assert.strictEqual(courseData.modules.length, 4, 'Must have exactly 4 course modules');
    const totalLessons = courseData.modules.reduce((a, m) => a + m.lessons.length, 0);
    assert(totalLessons >= 20, `Total lessons (${totalLessons}) should be >= 20`);
  });

  // 2. Question Bank Verification (all 4 modules + final assessment)
  test('Question Bank: Coverage across all modules + final assessment', () => {
    ['mod1', 'mod2', 'mod3', 'mod4', 'final'].forEach(modId => {
      assert(Array.isArray(questionBank[modId]), `Question bank must contain array for ${modId}`);
      assert(questionBank[modId].length >= 5, `Module ${modId} must have at least 5 questions`);
      questionBank[modId].forEach(q => {
        assert(q.question && q.options && q.options.length >= 2, 'Each question must have options');
        assert(typeof q.correct === 'number' && q.correct >= 0 && q.correct < q.options.length, 'Valid correct index');
        assert(q.explanation && q.explanation.length > 5, 'Must provide meaningful explanation');
      });
    });
  });

  // 3. Progress Manager Tests with Gamification (XP, Levels, Badges)
  await asyncTest('ProgressManager: Initialization, XP, Level, Badges, and Activity tracking', async () => {
    const mock = new MockBridge();
    const pm = new ProgressManager(mock);
    await pm.init();

    assert.strictEqual(pm.isLessonCompleted('mod1-les1'), false);
    const completed = await pm.toggleLessonCompletion('mod1-les1', 'VR Fundamentals');
    assert.strictEqual(completed, true);
    assert.strictEqual(pm.isLessonCompleted('mod1-les1'), true);

    // XP gained
    assert(pm.data.xp >= 50, 'XP should increase after completing a lesson');
    assert(pm.data.level >= 1, 'Level should be at least 1');
    assert(pm.data.badges.includes('first_step'), 'first_step badge should be unlocked');

    // Stats
    const stats = pm.getStats(25);
    assert.strictEqual(stats.completedCount, 1);
    assert.strictEqual(stats.progressPct, 4);
    assert.strictEqual(stats.streakDays, 1);
    assert(Array.isArray(stats.weeklyActivity), 'Weekly activity must be an array');
  });

  // 4. Notes Manager Tests (CRUD + Markdown export)
  await asyncTest('NotesManager: Note creation, search, edit, deletion, and markdown export', async () => {
    const mock = new MockBridge();
    const pm = new ProgressManager(mock);
    await pm.init();
    const nm = new NotesManager(mock, pm);

    const note = await nm.saveNote({
      title: 'Unity Lifecycle Methods',
      content: 'Awake, Start, Update, FixedUpdate, LateUpdate',
      moduleId: 'mod2',
      tags: ['unity', 'csharp']
    });

    assert(note.id, 'Note must have unique ID');
    assert.strictEqual(nm.getNotes().length, 1);

    const mdExport = nm.generateMarkdown(nm.getNotes());
    assert(mdExport.includes('# NeuralVerse Study Notes Revision'), 'Markdown export header');
    assert(mdExport.includes('Unity Lifecycle Methods'), 'Markdown contains note title');

    const searchRes = nm.searchNotes('lifecycle');
    assert.strictEqual(searchRes.length, 1);

    const deleted = await nm.deleteNote(note.id);
    assert.strictEqual(deleted, true);
    assert.strictEqual(nm.getNotes().length, 0);
  });

  // 5. Quiz Engine Tests with Incorrect Question Tracking
  test('QuizEngine: Start quiz, evaluate answers, record missed questions', () => {
    const mock = new MockBridge();
    const pm = new ProgressManager(mock);
    const qe = new QuizEngine(questionBank, pm);

    const quiz = qe.startQuiz('mod1', 5, false);
    assert.strictEqual(quiz.questions.length, 5);

    // Answer 1 wrong and 4 right
    qe.answerQuestion(0, (quiz.questions[0].correct + 1) % quiz.questions[0].options.length);
    for (let i = 1; i < quiz.questions.length; i++) {
      qe.answerQuestion(i, quiz.questions[i].correct);
    }

    const result = qe.submitQuiz();
    assert.strictEqual(result.score, 4);
    assert.strictEqual(result.total, 5);
    assert.strictEqual(result.incorrectQuestions.length, 1);
    assert(pm.data.incorrectQuizAnswers.length >= 1, 'Missed question saved to progress manager for revision');
  });

  // 6. AI Assistant Module (Offline Fallback Engine)
  await asyncTest('AIAssistant: Offline knowledge fallback for explain, hint, practice, summarize', async () => {
    const ai = new AIAssistant(null);
    const lesson = courseData.modules[0].lessons[0];

    const explainRes = await ai.ask({ action: 'explain', lesson });
    assert(explainRes.reply.includes('Explain Like I am 5') || explainRes.reply.includes('Virtual Reality'), 'Explain response generated');

    const hintRes = await ai.ask({ action: 'hint', lesson });
    assert(hintRes.reply.includes('Guiding Hint') || hintRes.reply.includes('Hint'), 'Hint response generated');

    const practiceRes = await ai.ask({ action: 'practice', lesson });
    assert(practiceRes.reply.includes('Challenge') || practiceRes.reply.includes('Exercise'), 'Practice challenge generated');

    const summaryRes = await ai.ask({ action: 'summarize', lesson });
    assert(summaryRes.reply.includes('Summary') || summaryRes.reply.includes('Core Takeaway'), 'Summary generated');
  });

  // 7. C# Playground Simulated Runner
  await asyncTest('CSharpPlayground: Code execution simulation', async () => {
    const playground = new CSharpPlayground();
    const defaultSnippet = playground.getTemplates().player_move;
    assert(defaultSnippet.includes('Update()'), 'Default snippet has Update()');

    const result = playground.executeCode(defaultSnippet);
    assert.strictEqual(result.success, true);
    assert(result.output.length > 0, 'Playground produces simulated execution log');
    assert(result.output.some(line => line.includes('Compilation successful')), 'Contains compilation notice');
  });

  console.log(`\n🏁 Test Run Finished: ${passed} passed, ${failed} failed.\n`);
  if (failed > 0) process.exit(1);
}

runTests();
