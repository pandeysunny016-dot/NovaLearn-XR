// src/simulations/whackAMole.js — VR Whack-a-Mole interaction & reaction speed minigame

class WhackAMoleGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.holes = [
      { x: 100, y: 100, active: false, timer: 0, isBomb: false },
      { x: 250, y: 100, active: false, timer: 0, isBomb: false },
      { x: 400, y: 100, active: false, timer: 0, isBomb: false },
      { x: 100, y: 220, active: false, timer: 0, isBomb: false },
      { x: 250, y: 220, active: false, timer: 0, isBomb: false },
      { x: 400, y: 220, active: false, timer: 0, isBomb: false },
      { x: 100, y: 340, active: false, timer: 0, isBomb: false },
      { x: 250, y: 340, active: false, timer: 0, isBomb: false },
      { x: 400, y: 340, active: false, timer: 0, isBomb: false }
    ];

    this.holeRadius = 38;
    this.score = 0;
    this.timeLeft = 30;
    this.isPlaying = false;
    this.difficulty = 'normal'; // 'easy', 'normal', 'hard'
    this.spawnInterval = 1000;
    this.lastSpawn = 0;
    this.lastTime = performance.now();
    this.particles = [];

    this.initEvents();
    this.render();
  }

  initEvents() {
    this.boundClick = (e) => {
      if (!this.isPlaying) return;
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      this.holes.forEach(hole => {
        if (hole.active) {
          const dist = Math.hypot(clickX - hole.x, clickY - hole.y);
          if (dist < this.holeRadius) {
            hole.active = false;
            if (hole.isBomb) {
              this.score = Math.max(0, this.score - 15);
              this.spawnParticles(hole.x, hole.y, '#ef4444');
            } else {
              this.score += 10;
              this.spawnParticles(hole.x, hole.y, '#10b981');
            }
            this.updateHUD();
          }
        }
      });
    };
    this.canvas.addEventListener('click', this.boundClick);
  }

  spawnParticles(x, y, color) {
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 120 + 30;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        decay: 2.0,
        color
      });
    }
  }

  start(difficulty = 'normal') {
    this.difficulty = difficulty;
    this.score = 0;
    this.timeLeft = 30;
    this.isPlaying = true;
    this.holes.forEach(h => { h.active = false; });
    this.particles = [];

    if (difficulty === 'easy') {
      this.spawnInterval = 1200;
    } else if (difficulty === 'hard') {
      this.spawnInterval = 700;
    } else {
      this.spawnInterval = 950;
    }

    this.updateHUD();
    this.gameLoop();
  }

  restart() {
    this.start(this.difficulty);
  }

  gameLoop() {
    const loop = (now) => {
      if (!this.isPlaying) return;
      const dt = Math.min((now - this.lastTime) / 1000, 0.1);
      this.lastTime = now;

      this.timeLeft -= dt;
      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        this.isPlaying = false;
        this.updateHUD();
        this.render();
        return;
      }

      // Spawner
      if (now - this.lastSpawn > this.spawnInterval) {
        this.lastSpawn = now;
        const inactiveHoles = this.holes.filter(h => !h.active);
        if (inactiveHoles.length > 0) {
          const chosen = inactiveHoles[Math.floor(Math.random() * inactiveHoles.length)];
          chosen.active = true;
          chosen.timer = this.difficulty === 'easy' ? 1.8 : this.difficulty === 'hard' ? 0.9 : 1.3;
          chosen.isBomb = Math.random() < (this.difficulty === 'hard' ? 0.35 : 0.2);
        }
      }

      // Decay hole timers
      this.holes.forEach(h => {
        if (h.active) {
          h.timer -= dt;
          if (h.timer <= 0) h.active = false;
        }
      });

      // Update particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= p.decay * dt;
        if (p.life <= 0) this.particles.splice(i, 1);
      }

      this.updateHUD();
      this.render();
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  updateHUD() {
    const scoreEl = document.getElementById('wam-score');
    const timerEl = document.getElementById('wam-timer');
    if (scoreEl) scoreEl.textContent = this.score;
    if (timerEl) timerEl.textContent = Math.ceil(this.timeLeft) + 's';
  }

  render() {
    if (!this.canvas) return;
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.ctx.clearRect(0, 0, w, h);

    // Draw Holes
    this.holes.forEach(hole => {
      // Pit
      this.ctx.fillStyle = '#0f172a';
      this.ctx.beginPath();
      this.ctx.arc(hole.x, hole.y, this.holeRadius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.strokeStyle = '#334155';
      this.ctx.lineWidth = 3;
      this.ctx.stroke();

      // Mole or Target
      if (hole.active) {
        this.ctx.save();
        if (hole.isBomb) {
          this.ctx.fillStyle = '#ef4444';
          this.ctx.beginPath();
          this.ctx.arc(hole.x, hole.y, this.holeRadius * 0.75, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.fillStyle = '#ffffff';
          this.ctx.font = 'bold 12px Inter, sans-serif';
          this.ctx.fillText('💣 BOMB', hole.x - 24, hole.y + 4);
        } else {
          this.ctx.fillStyle = '#f59e0b';
          this.ctx.beginPath();
          this.ctx.arc(hole.x, hole.y, this.holeRadius * 0.75, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.strokeStyle = '#fbbf24';
          this.ctx.lineWidth = 2;
          this.ctx.stroke();
          this.ctx.fillStyle = '#0f172a';
          this.ctx.font = 'bold 12px Inter, sans-serif';
          this.ctx.fillText('🎯 MOLE', hole.x - 24, hole.y + 4);
        }
        this.ctx.restore();
      }
    });

    // Draw Particles
    this.particles.forEach(p => {
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.life);
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    if (!this.isPlaying && this.timeLeft === 0) {
      this.ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      this.ctx.fillRect(0, 0, w, h);
      this.ctx.fillStyle = '#f8fafc';
      this.ctx.font = 'bold 22px Inter, sans-serif';
      this.ctx.fillText('Round Finished!', w / 2 - 80, h / 2 - 15);
      this.ctx.font = '14px Inter, sans-serif';
      this.ctx.fillText(`Final Score: ${this.score}`, w / 2 - 45, h / 2 + 15);
    }
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    this.canvas.removeEventListener('click', this.boundClick);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WhackAMoleGame };
}
