// tests/test-runner.js — Automated test suite for NeuralVerse logic
const assert = require('assert');
const { courseData } = require('../src/data/courseData');
const { questionBank } = require('../src/data/questionBank');
const { ProgressManager } = require('../src/modules/progressManager');
const { NotesManager } = require('../src/modules/notesManager');
const { QuizEngine } = require('../src/modules/quizEngine');

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

  // 2. Question Bank Verification
  test('Question Bank: Coverage across all 4 modules', () => {
    ['mod1', 'mod2', 'mod3', 'mod4'].forEach(modId => {
      assert(Array.isArray(questionBank[modId]), `Question bank must contain array for ${modId}`);
      assert(questionBank[modId].length >= 10, `Module ${modId} must have at least 10 questions`);
      questionBank[modId].forEach(q => {
        assert(q.question && q.options && q.options.length === 4, 'Each question must have 4 options');
        assert(typeof q.correct === 'number' && q.correct >= 0 && q.correct < 4, 'Valid correct index');
        assert(q.explanation && q.explanation.length > 5, 'Must provide meaningful explanation');
      });
    });
  });

  // 3. Progress Manager Tests
  await asyncTest('ProgressManager: Initialization, completion, and streak calculation', async () => {
    const mock = new MockBridge();
    const pm = new ProgressManager(mock);
    await pm.init();

    assert.strictEqual(pm.isLessonCompleted('mod1-les1'), false);
    const completed = await pm.toggleLessonCompletion('mod1-les1', 'Intro');
    assert.strictEqual(completed, true);
    assert.strictEqual(pm.isLessonCompleted('mod1-les1'), true);

    const stats = pm.getStats(25);
    assert.strictEqual(stats.completedCount, 1);
    assert.strictEqual(stats.progressPct, 4);
    assert.strictEqual(stats.streakDays, 1);
  });

  // 4. Notes Manager Tests
  await asyncTest('NotesManager: Note creation, search, edit, and deletion', async () => {
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

    const searchRes = nm.searchNotes('lifecycle');
    assert.strictEqual(searchRes.length, 1);

    const deleted = await nm.deleteNote(note.id);
    assert.strictEqual(deleted, true);
    assert.strictEqual(nm.getNotes().length, 0);
  });

  // 5. Quiz Engine Tests
  test('QuizEngine: Start quiz, evaluate answers, calculate percentage', () => {
    const mock = new MockBridge();
    const pm = new ProgressManager(mock);
    const qe = new QuizEngine(questionBank, pm);

    const quiz = qe.startQuiz('mod1', 5, false);
    assert.strictEqual(quiz.questions.length, 5);

    // Answer questions
    quiz.questions.forEach((q, idx) => {
      qe.answerQuestion(idx, q.correct); // all correct
    });

    const result = qe.submitQuiz();
    assert.strictEqual(result.score, 5);
    assert.strictEqual(result.percentage, 100);
  });

  console.log(`\n🏁 Test Run Finished: ${passed} passed, ${failed} failed.\n`);
  if (failed > 0) process.exit(1);
}

runTests();
