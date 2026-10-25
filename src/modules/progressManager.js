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
      simulatorPrefs: {},
      xp: 0,
      level: 1,
      studyTimeMinutes: 0,
      dailyGoalMinutes: 30,
      todayStudyMinutes: 0,
      badges: [],
      weeklyActivity: [0, 0, 0, 0, 0, 0, 0] // Mon-Sun study minutes
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
      this.addXP(50, `Lesson Completed: ${lessonTitle || lessonId}`);
      this.checkBadges();
      if (this.bridge && this.bridge.showNotification) {
        this.bridge.showNotification('Lesson Completed! 🎉', `+50 XP earned for finishing: ${lessonTitle || lessonId}`);
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

  addXP(amount, reason = '') {
    this.data.xp = (this.data.xp || 0) + amount;
    const newLevel = Math.floor(this.data.xp / 200) + 1;
    if (newLevel > (this.data.level || 1)) {
      this.data.level = newLevel;
      this.logActivity('level_up', `Leveled Up! Reached Level ${newLevel} 🚀`);
      if (this.bridge && this.bridge.showNotification) {
        this.bridge.showNotification('Level Up! 🚀', `Congratulations, you reached Level ${newLevel}!`);
      }
    }
    this.checkBadges();
    this.save();
  }

  addStudyTime(minutes = 1) {
    this.data.studyTimeMinutes = (this.data.studyTimeMinutes || 0) + minutes;
    this.data.todayStudyMinutes = (this.data.todayStudyMinutes || 0) + minutes;
    
    // Add to today's day of week index (0=Mon ... 6=Sun)
    const day = (new Date().getDay() + 6) % 7;
    if (!this.data.weeklyActivity) this.data.weeklyActivity = [0, 0, 0, 0, 0, 0, 0];
    this.data.weeklyActivity[day] = (this.data.weeklyActivity[day] || 0) + minutes;
    this.checkBadges();
    this.save();
  }

  checkBadges() {
    if (!this.data.badges) this.data.badges = [];
    const earned = new Set(this.data.badges);

    if ((this.data.completedLessons || []).length >= 1 && !earned.has('first_step')) {
      this.data.badges.push('first_step');
      this.logActivity('badge_unlocked', 'Badge Unlocked: First Step! 🏅');
    }
    if ((this.data.completedLessons || []).length >= 10 && !earned.has('scholar')) {
      this.data.badges.push('scholar');
      this.logActivity('badge_unlocked', 'Badge Unlocked: Neural Scholar! 🎓');
    }
    if ((this.data.quizAttempts || []).length >= 3 && !earned.has('quiz_master')) {
      this.data.badges.push('quiz_master');
      this.logActivity('badge_unlocked', 'Badge Unlocked: Assessment Pro! 🎯');
    }
    if ((this.data.streak && this.data.streak.count >= 3) && !earned.has('streak_flame')) {
      this.data.badges.push('streak_flame');
      this.logActivity('badge_unlocked', 'Badge Unlocked: Unstoppable Streak! 🔥');
    }
    if ((this.data.notes || []).length >= 5 && !earned.has('scribe')) {
      this.data.badges.push('scribe');
      this.logActivity('badge_unlocked', 'Badge Unlocked: Master Scribe! 📝');
    }
  }

  recordQuizAttempt(moduleId, score, total, details = {}) {
    if (!this.data.quizAttempts) this.data.quizAttempts = [];
    const percentage = Math.round((score / total) * 100);
    const attempt = {
      id: 'quiz_' + Date.now(),
      moduleId,
      score,
      total,
      percentage,
      date: new Date().toISOString(),
      details
    };
    this.data.quizAttempts.unshift(attempt);
    
    // Award XP based on quiz result
    const xpEarned = Math.round((score / total) * 100);
    this.addXP(xpEarned, `Quiz finished: ${score}/${total}`);
    this.logActivity('quiz_attempt', `Completed quiz for ${moduleId}: ${score}/${total} (${percentage}%)`);
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
      notesCount: (this.data.notes || []).length,
      xp: this.data.xp || 0,
      level: this.data.level || 1,
      studyTimeMinutes: this.data.studyTimeMinutes || 0,
      todayStudyMinutes: this.data.todayStudyMinutes || 0,
      dailyGoalMinutes: this.data.dailyGoalMinutes || 30,
      badges: this.data.badges || [],
      weeklyActivity: this.data.weeklyActivity || [0, 0, 0, 0, 0, 0, 0]
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ProgressManager };
}
