// renderer.js — NeuralVerse Frontend Application Controller
// Orchestrates views, UI events, simulations, quizzes, notes, and IPC bridging

class AppController {
  constructor() {
    this.bridge = window.neuralverse || null;
    this.progressManager = new ProgressManager(this.bridge);
    this.notesManager = new NotesManager(this.bridge, this.progressManager);
    this.quizEngine = new QuizEngine(questionBank, this.progressManager);

    this.currentView = 'dashboard';
    this.currentModuleId = 'mod1';
    this.currentLessonId = 'mod1-les1';
    this.activeSim = null;

    this.init();
  }

  async init() {
    await this.progressManager.init();
    this.setupNavigation();
    this.setupSidebar();
    this.setupTopBar();
    this.setupCourseView();
    this.setupLessonView();
    this.setupQuizView();
    this.setupNotesView();
    this.updateDashboard();

    // Listen for progress updates
    this.progressManager.subscribe(() => {
      this.updateDashboard();
      this.renderNotesList();
    });

    console.log('NeuralVerse Studio initialized.');
  }

  // ─── Navigation ─────────────────────────────────────────────────────────

  setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const view = item.getAttribute('data-view');
        this.switchView(view);
      });
    });
  }

  switchView(viewName, params = {}) {
    this.currentView = viewName;
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-view') === viewName);
    });

    document.querySelectorAll('.view-section').forEach(el => {
      el.classList.remove('active');
    });

    const targetSection = document.getElementById(`view-${viewName}`);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    if (viewName === 'simulations') {
      const sim = params.sim || 'cube';
      this.loadSimulation(sim);
    } else if (this.activeSim && typeof this.activeSim.destroy === 'function') {
      this.activeSim.destroy();
      this.activeSim = null;
    }

    if (viewName === 'dashboard') {
      this.updateDashboard();
    }
  }

  // ─── Sidebar & Topbar ────────────────────────────────────────────────────

  setupSidebar() {
    const toggleBtn = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        toggleBtn.querySelector('span').textContent = sidebar.classList.contains('collapsed') ? '▶' : '◀';
      });
    }
  }

  setupTopBar() {
    const btnSettings = document.getElementById('btn-settings');
    const btnAbout = document.getElementById('btn-about');

    if (btnSettings && this.bridge) {
      btnSettings.addEventListener('click', () => this.bridge.openSettings());
    }
    if (btnAbout && this.bridge) {
      btnAbout.addEventListener('click', () => this.bridge.openAbout());
    }

    // Global Search
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length > 1) {
          this.handleGlobalSearch(query);
        }
      });
    }
  }

  handleGlobalSearch(query) {
    let matchedLesson = null;
    for (const mod of courseData.modules) {
      for (const les of mod.lessons) {
        if (
          les.title.toLowerCase().includes(query) ||
          les.content.toLowerCase().includes(query) ||
          (les.terms && les.terms.some(t => t.toLowerCase().includes(query)))
        ) {
          matchedLesson = { mod, les };
          break;
        }
      }
      if (matchedLesson) break;
    }

    if (matchedLesson) {
      this.currentModuleId = matchedLesson.mod.id;
      this.currentLessonId = matchedLesson.les.id;
      this.switchView('lessons');
      this.renderLessonsList();
      this.loadLesson(matchedLesson.les);
    }
  }

  // ─── Dashboard ──────────────────────────────────────────────────────────

  updateDashboard() {
    const totalLessons = courseData.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const stats = this.progressManager.getStats(totalLessons);

    const elTotalMod = document.getElementById('dash-total-modules');
    const elCompleted = document.getElementById('dash-completed-lessons');
    const elProgress = document.getElementById('dash-progress-pct');
    const elQuizAvg = document.getElementById('dash-quiz-avg');
    const elStreak = document.getElementById('streak-count');

    if (elTotalMod) elTotalMod.textContent = courseData.modules.length;
    if (elCompleted) elCompleted.textContent = `${stats.completedCount} / ${totalLessons}`;
    if (elProgress) elProgress.textContent = `${stats.progressPct}%`;
    if (elQuizAvg) elQuizAvg.textContent = `${stats.avgQuizScore}%`;
    if (elStreak) elStreak.textContent = `${stats.streakDays} Day Streak`;

    // Activity List
    const actListEl = document.getElementById('dash-activities-list');
    if (actListEl) {
      if (stats.recentActivities.length === 0) {
        actListEl.innerHTML = `<p style="color: var(--text-sub); font-size: 12px;">No activity recorded yet. Pick a lesson to begin!</p>`;
      } else {
        actListEl.innerHTML = stats.recentActivities.map(a => {
          const time = new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return `
            <div style="display: flex; justify-content: space-between; font-size: 12px; border-bottom: 1px solid var(--border-color); padding-bottom: 6px;">
              <span style="color: var(--text-main);">${a.title}</span>
              <span style="color: var(--text-sub);">${time}</span>
            </div>
          `;
        }).join('');
      }
    }

    // Recommended Next Topic
    let nextLesson = null;
    for (const mod of courseData.modules) {
      for (const les of mod.lessons) {
        if (!this.progressManager.isLessonCompleted(les.id)) {
          nextLesson = les;
          break;
        }
      }
      if (nextLesson) break;
    }

    const recTitleEl = document.getElementById('rec-title');
    const recDescEl = document.getElementById('rec-desc');
    const btnCont = document.getElementById('btn-continue-learning');

    if (nextLesson) {
      if (recTitleEl) recTitleEl.textContent = nextLesson.title;
      if (recDescEl) recDescEl.textContent = (nextLesson.objectives && nextLesson.objectives[0]) || 'Continue your learning journey.';
      if (btnCont) {
        btnCont.onclick = () => {
          this.currentLessonId = nextLesson.id;
          this.switchView('lessons');
          this.renderLessonsList();
          this.loadLesson(nextLesson);
        };
      }
    } else {
      if (recTitleEl) recTitleEl.textContent = '🎉 All Lessons Completed!';
      if (recDescEl) recDescEl.textContent = 'You have mastered all modules. Test your knowledge in the Assessments tab!';
    }
  }

  // ─── Course Library ─────────────────────────────────────────────────────

  setupCourseView() {
    const container = document.getElementById('course-module-cards');
    if (!container) return;

    container.innerHTML = courseData.modules.map(mod => {
      const completed = mod.lessons.filter(l => this.progressManager.isLessonCompleted(l.id)).length;
      const total = mod.lessons.length;
      const pct = Math.round((completed / total) * 100);

      return `
        <div class="module-card" onclick="appController.selectModule('${mod.id}')">
          <div>
            <div class="module-header">
              <span class="module-icon">${mod.icon}</span>
              <h3 class="module-title">${mod.title}</h3>
            </div>
            <p class="module-desc">${mod.description}</p>
          </div>
          <div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: ${pct}%;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-sub);">
              <span>${completed}/${total} Lessons</span>
              <span>${pct}%</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  selectModule(modId) {
    this.currentModuleId = modId;
    const mod = courseData.modules.find(m => m.id === modId);
    if (mod && mod.lessons.length > 0) {
      this.currentLessonId = mod.lessons[0].id;
    }
    this.switchView('lessons');
    this.renderLessonsList();
  }

  // ─── Lessons View ───────────────────────────────────────────────────────

  setupLessonView() {
    const modSelect = document.getElementById('lesson-module-select');
    if (modSelect) {
      modSelect.innerHTML = courseData.modules.map(m => `<option value="${m.id}">${m.title}</option>`).join('');
      modSelect.addEventListener('change', (e) => {
        this.currentModuleId = e.target.value;
        const mod = courseData.modules.find(m => m.id === this.currentModuleId);
        if (mod && mod.lessons.length > 0) {
          this.currentLessonId = mod.lessons[0].id;
        }
        this.renderLessonsList();
      });
    }

    const btnComplete = document.getElementById('btn-complete-lesson');
    if (btnComplete) {
      btnComplete.addEventListener('click', async () => {
        const curLesson = this.getActiveLesson();
        if (!curLesson) return;
        const done = await this.progressManager.toggleLessonCompletion(curLesson.id, curLesson.title);
        btnComplete.textContent = done ? 'Completed ✓' : 'Mark Complete ✓';
        btnComplete.className = done ? 'btn btn-primary' : 'btn btn-emerald';
        this.renderLessonsList();
        this.updateDashboard();
      });
    }

    const btnBookmark = document.getElementById('btn-toggle-bookmark');
    if (btnBookmark) {
      btnBookmark.addEventListener('click', async () => {
        const curLesson = this.getActiveLesson();
        if (!curLesson) return;
        const bm = await this.progressManager.toggleBookmark(curLesson.id, curLesson.title);
        btnBookmark.textContent = bm ? '★ Bookmarked' : '⭐ Bookmark';
      });
    }

    const btnPrev = document.getElementById('btn-prev-lesson');
    const btnNext = document.getElementById('btn-next-lesson');
    if (btnPrev) btnPrev.addEventListener('click', () => this.navigateLesson(-1));
    if (btnNext) btnNext.addEventListener('click', () => this.navigateLesson(1));

    const btnNotes = document.getElementById('btn-take-notes');
    if (btnNotes) {
      btnNotes.addEventListener('click', () => {
        const curLesson = this.getActiveLesson();
        this.switchView('notes');
        const titleInput = document.getElementById('note-edit-title');
        const modSelectNotes = document.getElementById('note-edit-module');
        if (titleInput && curLesson) titleInput.value = `Notes on: ${curLesson.title}`;
        if (modSelectNotes) modSelectNotes.value = this.currentModuleId;
      });
    }

    this.renderLessonsList();
  }

  getActiveLesson() {
    const mod = courseData.modules.find(m => m.id === this.currentModuleId);
    if (!mod) return null;
    return mod.lessons.find(l => l.id === this.currentLessonId) || mod.lessons[0];
  }

  renderLessonsList() {
    const modSelect = document.getElementById('lesson-module-select');
    if (modSelect) modSelect.value = this.currentModuleId;

    const mod = courseData.modules.find(m => m.id === this.currentModuleId);
    if (!mod) return;

    const listContainer = document.getElementById('lesson-items-container');
    if (!listContainer) return;

    listContainer.innerHTML = mod.lessons.map(les => {
      const isCompleted = this.progressManager.isLessonCompleted(les.id);
      const isActive = les.id === this.currentLessonId;
      return `
        <li class="lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" 
            onclick="appController.loadLessonById('${les.id}')">
          <span>${les.title}</span>
          ${isCompleted ? '<span>✓</span>' : ''}
        </li>
      `;
    }).join('');

    const cur = this.getActiveLesson();
    if (cur) this.loadLesson(cur);
  }

  loadLessonById(lessonId) {
    this.currentLessonId = lessonId;
    const cur = this.getActiveLesson();
    if (cur) {
      this.renderLessonsList();
      this.loadLesson(cur);
    }
  }

  loadLesson(lesson) {
    const titleEl = document.getElementById('lesson-view-title');
    const badgesEl = document.getElementById('lesson-badges');
    const contentEl = document.getElementById('lesson-text-content');
    const btnComplete = document.getElementById('btn-complete-lesson');
    const btnBookmark = document.getElementById('btn-toggle-bookmark');

    if (titleEl) titleEl.textContent = lesson.title;

    if (btnComplete) {
      const done = this.progressManager.isLessonCompleted(lesson.id);
      btnComplete.textContent = done ? 'Completed ✓' : 'Mark Complete ✓';
      btnComplete.className = done ? 'btn btn-primary' : 'btn btn-emerald';
    }

    if (btnBookmark) {
      const bm = this.progressManager.isBookmarked(lesson.id);
      btnBookmark.textContent = bm ? '★ Bookmarked' : '⭐ Bookmark';
    }

    if (badgesEl) {
      badgesEl.innerHTML = `
        <span class="badge badge-cyan">${lesson.id}</span>
        ${lesson.hasSimulation ? `<span class="badge badge-violet">Interactive Lab Available</span>` : ''}
      `;
    }

    if (contentEl) {
      // Basic markdown styling for lesson body
      let html = lesson.content
        .replace(/### (.*)/g, '<h3 style="color:#00d4ff; margin-top:16px;">$1</h3>')
        .replace(/## (.*)/g, '<h2 style="color:#fff; margin-top:20px;">$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code style="background:rgba(0,212,255,0.1); color:#00d4ff; padding:2px 4px; border-radius:3px;">$1</code>')
        .replace(/```csharp([\s\S]*?)```/g, '<pre><code class="language-csharp">$1</code></pre>')
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/\n\n/g, '<br><br>');

      // Practical Activity Box
      if (lesson.activity) {
        html += `
          <div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid var(--accent-emerald); padding: 14px; border-radius: 4px; margin-top: 24px;">
            <h4 style="color: var(--accent-emerald); margin-bottom: 6px;">🛠️ Practical Learning Activity</h4>
            <p style="font-size: 13px; color: #f1f5f9;">${lesson.activity}</p>
          </div>
        `;
      }

      if (lesson.hasSimulation) {
        html += `
          <div style="margin-top: 20px;">
            <button class="btn btn-primary" onclick="appController.switchView('simulations', { sim: '${lesson.hasSimulation === 'cubeDemo' ? 'cube' : lesson.hasSimulation === 'movementDemo' ? 'movement' : lesson.hasSimulation === 'qLearning' ? 'ql' : lesson.hasSimulation === 'whackAMole' ? 'wam' : 'vr'}' })">
              🚀 Launch Associated Interactive Simulation
            </button>
          </div>
        `;
      }

      contentEl.innerHTML = html;
    }
  }

  navigateLesson(direction) {
    const mod = courseData.modules.find(m => m.id === this.currentModuleId);
    if (!mod) return;
    const idx = mod.lessons.findIndex(l => l.id === this.currentLessonId);
    const targetIdx = idx + direction;
    if (targetIdx >= 0 && targetIdx < mod.lessons.length) {
      this.currentLessonId = mod.lessons[targetIdx].id;
      this.renderLessonsList();
    }
  }

  // ─── Simulations ────────────────────────────────────────────────────────

  loadSimulation(type) {
    const container = document.getElementById('active-sim-panel');
    if (!container) return;

    if (this.activeSim && typeof this.activeSim.destroy === 'function') {
      this.activeSim.destroy();
    }

    if (type === 'cube') {
      container.innerHTML = `
        <h3 style="font-size: 18px; color: var(--accent-cyan); margin-bottom: 6px;">3D Transform & Lighting Lab (Unity Concept)</h3>
        <p style="color: var(--text-muted); font-size: 12px; margin-bottom: 14px;">
          Manipulate Position, Rotation, Scale, and Lighting on a 3D Primitive. Demonstrates Unity GameObject Transform matrix calculation.
        </p>
        <div class="sim-container">
          <canvas id="sim-canvas" width="600" height="350"></canvas>
          <div class="sim-controls">
            <label style="font-size:12px;">Scale: <input type="range" id="c-scale" min="0.5" max="2" step="0.1" value="1"></label>
            <label style="font-size:12px;">Light Intensity: <input type="range" id="c-light" min="0.1" max="1.5" step="0.1" value="0.8"></label>
            <label style="font-size:12px;"><input type="checkbox" id="c-wireframe"> Wireframe Mode</label>
            <label style="font-size:12px;"><input type="checkbox" id="c-autorotate" checked> Auto Rotate</label>
          </div>
        </div>
      `;
      this.activeSim = new CubeDemo('sim-canvas');

      document.getElementById('c-scale').oninput = (e) => this.activeSim.setTransform({ scale: parseFloat(e.target.value) });
      document.getElementById('c-light').oninput = (e) => this.activeSim.setTransform({ light: parseFloat(e.target.value) });
      document.getElementById('c-wireframe').onchange = (e) => this.activeSim.setTransform({ wireframe: e.target.checked });
      document.getElementById('c-autorotate').onchange = (e) => this.activeSim.setTransform({ autoRotate: e.target.checked });

    } else if (type === 'movement') {
      container.innerHTML = `
        <h3 style="font-size: 18px; color: var(--accent-violet); margin-bottom: 6px;">Unity C# Player Movement & Camera Lab</h3>
        <p style="color: var(--text-muted); font-size: 12px; margin-bottom: 14px;">
          WASD or Arrow keys to steer player. Press [C] to cycle between Follow, Fixed, and First-Person Orbit cameras. Press [Space] to detonate explosion particles!
        </p>
        <div class="sim-container">
          <canvas id="sim-canvas" width="650" height="380"></canvas>
          <div class="sim-controls">
            <button class="btn btn-secondary" onclick="appController.activeSim.cycleCamera()">Cycle Camera [C]</button>
            <button class="btn btn-secondary" onclick="appController.activeSim.triggerExplosion(appController.activeSim.player.x, appController.activeSim.player.y)">Trigger Explosion FX [Space]</button>
          </div>
        </div>
      `;
      this.activeSim = new MovementDemo('sim-canvas');

    } else if (type === 'ql') {
      container.innerHTML = `
        <h3 style="font-size: 18px; color: var(--accent-emerald); margin-bottom: 6px;">Reinforcement Learning — Tabular Q-Learning Grid World</h3>
        <p style="color: var(--text-muted); font-size: 12px; margin-bottom: 14px;">
          Real Bellman equation updates. Watch the agent learn optimal paths around red obstacles towards the green goal. Triangles display directional Q-values.
        </p>
        <div class="sim-container">
          <canvas id="sim-canvas" width="400" height="400"></canvas>
          <div id="ql-diag" style="display:flex; gap:10px; margin-top:10px; flex-wrap:wrap;"></div>
          <div class="sim-controls">
            <button class="btn btn-emerald" onclick="appController.activeSim.start()">Start Training ▶</button>
            <button class="btn btn-secondary" onclick="appController.activeSim.pause()">Pause ⏸</button>
            <button class="btn btn-secondary" onclick="appController.activeSim.step()">Step 1 Action</button>
            <button class="btn btn-danger" onclick="appController.activeSim.reset()">Reset Q-Table</button>
          </div>
        </div>
      `;
      this.activeSim = new QLearningSimulator('sim-canvas');

    } else if (type === 'wam') {
      container.innerHTML = `
        <h3 style="font-size: 18px; color: var(--accent-amber); margin-bottom: 6px;">Mobile VR Whack-a-Mole Minigame</h3>
        <p style="color: var(--text-muted); font-size: 12px; margin-bottom: 14px;">
          Test your reaction speed. Click/whack targets before they disappear. Beware of red bomb traps!
        </p>
        <div class="sim-container">
          <div style="display:flex; justify-content:space-between; width:100%; max-width:500px; margin-bottom:8px;">
            <span style="font-size:14px; font-weight:600;">Score: <span id="wam-score" style="color:var(--accent-amber);">0</span></span>
            <span style="font-size:14px; font-weight:600;">Time: <span id="wam-timer" style="color:var(--accent-cyan);">30s</span></span>
          </div>
          <canvas id="sim-canvas" width="500" height="450"></canvas>
          <div class="sim-controls">
            <button class="btn btn-primary" onclick="appController.activeSim.start()">Start Game 🎮</button>
          </div>
        </div>
      `;
      this.activeSim = new WhackAMoleGame('sim-canvas');

    } else if (type === 'vr') {
      container.innerHTML = `
        <h3 style="font-size: 18px; color: var(--accent-cyan); margin-bottom: 6px;">Mobile VR 3DOF Head Tracking & Gaze Reticle</h3>
        <p style="color: var(--text-muted); font-size: 12px; margin-bottom: 14px;">
          Drag mouse on canvas to simulate 3DOF gyroscope head rotation. Center the reticle on objects to activate them via gaze dwelling.
        </p>
        <div class="sim-container">
          <div id="vr-gaze-status" style="font-size:12px; color:var(--text-muted); margin-bottom:6px;"></div>
          <canvas id="sim-canvas" width="600" height="360" style="cursor: grab;"></canvas>
        </div>
      `;
      this.activeSim = new VRViewDemo('sim-canvas');
    }
  }

  // ─── Quizzes ────────────────────────────────────────────────────────────

  setupQuizView() {
    const modSelect = document.getElementById('quiz-module-select');
    if (modSelect) {
      modSelect.addEventListener('change', (e) => {
        this.renderQuizQuestion(e.target.value);
      });
    }
    this.renderQuizQuestion('mod1');
  }

  renderQuizQuestion(moduleId) {
    const quiz = this.quizEngine.startQuiz(moduleId, 6);
    const container = document.getElementById('quiz-content-area');
    if (!container || !quiz) return;

    this.renderCurrentQuestionUI();
  }

  renderCurrentQuestionUI() {
    const quiz = this.quizEngine.getCurrentState();
    const container = document.getElementById('quiz-content-area');
    if (!container || !quiz) return;

    if (quiz.isSubmitted) {
      const pct = Math.round((quiz.score / quiz.total) * 100);
      container.innerHTML = `
        <div style="text-align: center; padding: 20px;">
          <h3 style="font-size: 22px; color: #fff;">Quiz Completed!</h3>
          <p style="font-size: 32px; font-weight: 700; color: ${pct >= 70 ? 'var(--accent-emerald)' : 'var(--accent-amber)'}; margin: 12px 0;">
            ${quiz.score} / ${quiz.total} (${pct}%)
          </p>
          <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 24px;">
            ${pct >= 70 ? 'Excellent mastery of the concepts!' : 'Review the lesson explanations and try again to improve your score.'}
          </p>
          <button class="btn btn-primary" onclick="appController.renderQuizQuestion('${quiz.moduleId}')">Retake Quiz ↺</button>
        </div>
      `;
      return;
    }

    const q = quiz.questions[quiz.currentIndex];
    container.innerHTML = `
      <div style="margin-bottom: 16px;">
        <span style="font-size: 12px; color: var(--accent-cyan);">Question ${quiz.currentIndex + 1} of ${quiz.total}</span>
        <h3 style="font-size: 16px; color: #fff; margin-top: 6px;">${q.question}</h3>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${q.options.map((opt, i) => `
          <div class="quiz-option ${q.userSelection === i ? 'selected' : ''}" onclick="appController.selectQuizOption(${i})">
            <span>${['A', 'B', 'C', 'D'][i]}.</span>
            <span>${opt}</span>
          </div>
        `).join('')}
      </div>

      ${q.userSelection !== null ? `
        <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--accent-cyan); padding: 10px 14px; border-radius: 4px; margin-top: 14px; font-size: 12px; color: #cbd5e1;">
          <strong>Explanation:</strong> ${q.explanation}
        </div>
      ` : ''}

      <div style="display: flex; justify-content: space-between; margin-top: 24px;">
        <button class="btn btn-secondary" ${quiz.currentIndex === 0 ? 'disabled style="opacity:0.5"' : ''} onclick="appController.quizNav(-1)">Previous</button>
        ${quiz.currentIndex === quiz.total - 1 ? 
          `<button class="btn btn-emerald" onclick="appController.submitQuiz()">Submit Assessment ✓</button>` :
          `<button class="btn btn-primary" onclick="appController.quizNav(1)">Next Question →</button>`
        }
      </div>
    `;
  }

  selectQuizOption(optIdx) {
    const quiz = this.quizEngine.getCurrentState();
    if (!quiz) return;
    this.quizEngine.answerQuestion(quiz.currentIndex, optIdx);
    this.renderCurrentQuestionUI();
  }

  quizNav(delta) {
    const quiz = this.quizEngine.getCurrentState();
    if (!quiz) return;
    quiz.currentIndex = Math.max(0, Math.min(quiz.total - 1, quiz.currentIndex + delta));
    this.renderCurrentQuestionUI();
  }

  submitQuiz() {
    this.quizEngine.submitQuiz();
    this.renderCurrentQuestionUI();
    this.updateDashboard();
  }

  // ─── Study Notes ────────────────────────────────────────────────────────

  setupNotesView() {
    const btnNew = document.getElementById('btn-new-note');
    const btnSave = document.getElementById('btn-save-note');
    const btnDel = document.getElementById('btn-delete-note');
    const btnExp = document.getElementById('btn-export-notes');
    const btnImp = document.getElementById('btn-import-notes');
    const searchInput = document.getElementById('notes-search-box');

    if (btnNew) {
      btnNew.addEventListener('click', () => {
        this.selectedNoteId = null;
        document.getElementById('note-edit-title').value = '';
        document.getElementById('note-edit-body').value = '';
        document.getElementById('note-edit-tags').value = '';
      });
    }

    if (btnSave) {
      btnSave.addEventListener('click', async () => {
        const title = document.getElementById('note-edit-title').value;
        const content = document.getElementById('note-edit-body').value;
        const moduleId = document.getElementById('note-edit-module').value;
        const tags = document.getElementById('note-edit-tags').value.split(',').map(s => s.trim()).filter(Boolean);

        const saved = await this.notesManager.saveNote({
          id: this.selectedNoteId,
          title,
          content,
          moduleId,
          tags
        });
        this.selectedNoteId = saved.id;
        this.renderNotesList();
      });
    }

    if (btnDel) {
      btnDel.addEventListener('click', async () => {
        if (!this.selectedNoteId) return;
        await this.notesManager.deleteNote(this.selectedNoteId);
        this.selectedNoteId = null;
        document.getElementById('note-edit-title').value = '';
        document.getElementById('note-edit-body').value = '';
        this.renderNotesList();
      });
    }

    if (btnExp) {
      btnExp.addEventListener('click', () => this.notesManager.exportNotesNative());
    }

    if (btnImp) {
      btnImp.addEventListener('click', async () => {
        const res = await this.notesManager.importNotesNative();
        if (res && res.success) this.renderNotesList();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.renderNotesList(e.target.value);
      });
    }

    this.renderNotesList();
  }

  renderNotesList(filterQuery = '') {
    const listEl = document.getElementById('notes-list-items');
    if (!listEl) return;

    const notes = this.notesManager.searchNotes(filterQuery);
    if (notes.length === 0) {
      listEl.innerHTML = `<li style="color:var(--text-sub); font-size:12px; padding:8px;">No notes found.</li>`;
      return;
    }

    listEl.innerHTML = notes.map(n => `
      <li class="note-card ${this.selectedNoteId === n.id ? 'active' : ''}" onclick="appController.selectNote('${n.id}')">
        <h4 style="font-size:13px; color:#fff;">${n.title}</h4>
        <p style="font-size:11px; color:var(--text-sub); margin-top:4px;">${new Date(n.updatedAt).toLocaleDateString()}</p>
      </li>
    `).join('');
  }

  selectNote(noteId) {
    this.selectedNoteId = noteId;
    const note = this.notesManager.getNoteById(noteId);
    if (!note) return;

    document.getElementById('note-edit-title').value = note.title;
    document.getElementById('note-edit-body').value = note.content;
    document.getElementById('note-edit-module').value = note.moduleId || '';
    document.getElementById('note-edit-tags').value = (note.tags || []).join(', ');

    this.renderNotesList();
  }
}

// Global App Instance
let appController = null;
window.addEventListener('DOMContentLoaded', () => {
  appController = new AppController();
});
