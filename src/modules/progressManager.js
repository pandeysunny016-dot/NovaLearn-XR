// src/modules/progressManager.js — Manages learning state, streaks, completion & metrics

class ProgressManager {
  constructor(bridge) {
    this.bridge = bridge;
    this.data = {
      completedLessons: [],
      quizAttempts: [],
      notes: [],
      activities: [],
      bookmarks: [],
      streak: { lastActiveDate: null, count: 0 },
      simulatorPrefs: {}
    };
    this.listeners = [];
  }

  async init() {
    try {
      if (this.bridge && this.bridge.readData) {
        const res = await this.bridge.readData();
        if (res && res.success && res.data) {
          this.data = Object.assign(this.data, res.data);
        }
      }
      this.updateStreak();
      await this.save();
    } catch (err) {
      console.error('Failed to init ProgressManager:', err);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.data));
  }

  async save() {
    if (this.bridge && this.bridge.saveData) {
      await this.bridge.saveData(this.data);
    }
    this.notify();
  }

  updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    const streak = this.data.streak || { lastActiveDate: null, count: 0 };
    
    if (!streak.lastActiveDate) {
      streak.lastActiveDate = today;
      streak.count = 1;
    } else if (streak.lastActiveDate !== today) {
      const last = new Date(streak.lastActiveDate);
      const cur = new Date(today);
      const diffDays = Math.round((cur - last) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        streak.count += 1;
        streak.lastActiveDate = today;
      } else if (diffDays > 1) {
        streak.count = 1;
        streak.lastActiveDate = today;
      }
    }
    this.data.streak = streak;
  }

  logActivity(type, title, metadata = {}) {
    const activity = {
      id: 'act_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toISOString(),
      type,
      title,
      metadata
    };
    if (!this.data.activities) this.data.activities = [];
    this.data.activities.unshift(activity);
    if (this.data.activities.length > 50) {
      this.data.activities = this.data.activities.slice(0, 50);
    }
    this.updateStreak();
    this.save();
  }

  isLessonCompleted(lessonId) {
    return (this.data.completedLessons || []).includes(lessonId);
  }

  async toggleLessonCompletion(lessonId, lessonTitle) {
    if (!this.data.completedLessons) this.data.completedLessons = [];
    const index = this.data.completedLessons.indexOf(lessonId);
    let completed = false;

    if (index >= 0) {
      this.data.completedLessons.splice(index, 1);
      this.logActivity('lesson_incomplete', `Unmarked lesson: ${lessonTitle || lessonId}`);
      completed = false;
    } else {
      this.data.completedLessons.push(lessonId);
      this.logActivity('lesson_complete', `Completed lesson: ${lessonTitle || lessonId}`);
      completed = true;
      if (this.bridge && this.bridge.showNotification) {
        this.bridge.showNotification('Lesson Completed! 🎉', `Great job finishing: ${lessonTitle || lessonId}`);
      }
    }
    await this.save();
    return completed;
  }

  isBookmarked(lessonId) {
    return (this.data.bookmarks || []).includes(lessonId);
  }

  async toggleBookmark(lessonId, lessonTitle) {
    if (!this.data.bookmarks) this.data.bookmarks = [];
    const idx = this.data.bookmarks.indexOf(lessonId);
    let bookmarked = false;
    if (idx >= 0) {
      this.data.bookmarks.splice(idx, 1);
      bookmarked = false;
    } else {
      this.data.bookmarks.push(lessonId);
      bookmarked = true;
      this.logActivity('bookmark_add', `Bookmarked lesson: ${lessonTitle || lessonId}`);
    }
    await this.save();
    return bookmarked;
  }

  recordQuizAttempt(moduleId, score, total, details = {}) {
    if (!this.data.quizAttempts) this.data.quizAttempts = [];
    const attempt = {
      id: 'quiz_' + Date.now(),
      moduleId,
      score,
      total,
      percentage: Math.round((score / total) * 100),
      date: new Date().toISOString(),
      details
    };
    this.data.quizAttempts.unshift(attempt);
    this.logActivity('quiz_attempt', `Completed quiz for ${moduleId}: ${score}/${total} (${attempt.percentage}%)`);
    this.save();
    return attempt;
  }

  getStats(totalLessons = 25) {
    const completedCount = (this.data.completedLessons || []).length;
    const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
    
    const attempts = this.data.quizAttempts || [];
    let avgQuizScore = 0;
    if (attempts.length > 0) {
      const sum = attempts.reduce((acc, a) => acc + (a.percentage || 0), 0);
      avgQuizScore = Math.round(sum / attempts.length);
    }

    return {
      totalLessons,
      completedCount,
      progressPct,
      avgQuizScore,
      quizCount: attempts.length,
      streakDays: (this.data.streak && this.data.streak.count) || 0,
      recentActivities: (this.data.activities || []).slice(0, 10),
      notesCount: (this.data.notes || []).length
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ProgressManager };
}
