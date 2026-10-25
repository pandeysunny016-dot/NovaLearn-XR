// src/simulations/movementDemo.js — Unity C# style player movement, cameras, and particle explosion

class MovementDemo {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.player = {
      x: 300,
      y: 200,
      radius: 18,
      angle: 0,
      speed: 180,
      turnSpeed: Math.PI,
      color: '#a855f7'
    };

    this.keys = {
      KeyW: false, KeyS: false, KeyA: false, KeyD: false,
      ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
      Space: false
    };

    this.cameras = ['Follow Camera', 'Top-Down Fixed', 'First-Person Orbit'];
    this.currentCamIndex = 0;
    this.particles = [];
    this.obstacles = [
      { x: 120, y: 100, w: 80, h: 40 },
      { x: 420, y: 120, w: 50, h: 90 },
      { x: 250, y: 300, w: 100, h: 30 }
    ];

    this.collectibles = [
      { x: 180, y: 220, collected: false },
      { x: 480, y: 280, collected: false },
      { x: 300, y: 80, collected: false }
    ];

    this.score = 0;
    this.lastTime = performance.now();

    this.initEvents();
    this.startLoop();
  }

  initEvents() {
    this.boundKeyDown = (e) => {
      if (this.keys.hasOwnProperty(e.code)) {
        this.keys[e.code] = true;
        if (e.code === 'Space') {
          this.triggerExplosion(this.player.x, this.player.y);
        }
      }
      if (e.code === 'KeyC') {
        this.cycleCamera();
      }
    };
    this.boundKeyUp = (e) => {
      if (this.keys.hasOwnProperty(e.code)) {
        this.keys[e.code] = false;
      }
    };
    window.addEventListener('keydown', this.boundKeyDown);
    window.addEventListener('keyup', this.boundKeyUp);
  }

  cycleCamera() {
    this.currentCamIndex = (this.currentCamIndex + 1) % this.cameras.length;
  }

  triggerExplosion(x, y) {
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 180 + 40;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 4 + 2,
        color: ['#f59e0b', '#ef4444', '#fbbf24', '#ffffff'][Math.floor(Math.random() * 4)],
        life: 1.0,
        decay: Math.random() * 1.5 + 1.2
      });
    }
  }

  update(dt) {
    const forward = (this.keys.KeyW || this.keys.ArrowUp) ? 1 : (this.keys.KeyS || this.keys.ArrowDown) ? -1 : 0;
    const turn = (this.keys.KeyD || this.keys.ArrowRight) ? 1 : (this.keys.KeyA || this.keys.ArrowLeft) ? -1 : 0;

    // Rotate player
    this.player.angle += turn * this.player.turnSpeed * dt;

    // Translate player
    if (forward !== 0) {
      const nextX = this.player.x + Math.cos(this.player.angle) * forward * this.player.speed * dt;
      const nextY = this.player.y + Math.sin(this.player.angle) * forward * this.player.speed * dt;

      // Obstacle collision check
      let collision = false;
      for (const obs of this.obstacles) {
        if (
          nextX + this.player.radius > obs.x &&
          nextX - this.player.radius < obs.x + obs.w &&
          nextY + this.player.radius > obs.y &&
          nextY - this.player.radius < obs.y + obs.h
        ) {
          collision = true;
          break;
        }
      }

      if (!collision) {
        this.player.x = Math.max(this.player.radius, Math.min(this.canvas.width - this.player.radius, nextX));
        this.player.y = Math.max(this.player.radius, Math.min(this.canvas.height - this.player.radius, nextY));
      }
    }

    // Check collectible pickups
    this.collectibles.forEach(c => {
      if (!c.collected) {
        const dist = Math.hypot(this.player.x - c.x, this.player.y - c.y);
        if (dist < this.player.radius + 12) {
          c.collected = true;
          this.score += 10;
          this.triggerExplosion(c.x, c.y);
        }
      }
    });

    // Update particle lifetime & positions
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= p.decay * dt;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  startLoop() {
    const loop = (now) => {
      const dt = Math.min((now - this.lastTime) / 1000, 0.1);
      this.lastTime = now;

      this.update(dt);
      this.render();
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  render() {
    if (!this.canvas) return;
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.ctx.clearRect(0, 0, w, h);

    // Apply Camera view transform
    this.ctx.save();
    const camType = this.cameras[this.currentCamIndex];

    if (camType === 'Follow Camera') {
      const cx = w / 2 - this.player.x;
      const cy = h / 2 - this.player.y;
      this.ctx.translate(cx * 0.4, cy * 0.4);
    } else if (camType === 'First-Person Orbit') {
      this.ctx.translate(w / 2, h / 2);
      this.ctx.rotate(-this.player.angle - Math.PI / 2);
      this.ctx.translate(-this.player.x, -this.player.y);
    }

    // Draw Arena Grid
    this.ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)';
    this.ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, h);
      this.ctx.stroke();
    }
    for (let y = 0; y < h; y += 30) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(w, y);
      this.ctx.stroke();
    }

    // Draw Obstacles
    this.ctx.fillStyle = '#1e293b';
    this.ctx.strokeStyle = '#334155';
    this.ctx.lineWidth = 2;
    this.obstacles.forEach(o => {
      this.ctx.fillRect(o.x, o.y, o.w, o.h);
      this.ctx.strokeRect(o.x, o.y, o.w, o.h);
    });

    // Draw Collectibles
    this.collectibles.forEach(c => {
      if (!c.collected) {
        this.ctx.fillStyle = '#fbbf24';
        this.ctx.beginPath();
        this.ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.strokeStyle = '#f59e0b';
        this.ctx.stroke();
      }
    });

    // Draw Particles
    this.particles.forEach(p => {
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.life);
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    // Draw Player
    this.ctx.save();
    this.ctx.translate(this.player.x, this.player.y);
    this.ctx.rotate(this.player.angle);

    // Body
    this.ctx.fillStyle = this.player.color;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.player.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.strokeStyle = '#c084fc';
    this.ctx.lineWidth = 2.5;
    this.ctx.stroke();

    // Direction pointer
    this.ctx.fillStyle = '#ffffff';
    this.ctx.beginPath();
    this.ctx.moveTo(this.player.radius + 6, 0);
    this.ctx.lineTo(this.player.radius - 4, -5);
    this.ctx.lineTo(this.player.radius - 4, 5);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.restore();
    this.ctx.restore();

    // Overlay HUD
    this.renderHUD(w, h, camType);
  }

  renderHUD(w, h, camType) {
    this.ctx.save();
    this.ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    this.ctx.fillRect(10, 10, 240, 75);
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    this.ctx.strokeRect(10, 10, 240, 75);

    this.ctx.fillStyle = '#f8fafc';
    this.ctx.font = '12px Inter, sans-serif';
    this.ctx.fillText(`Camera: [C] ${camType}`, 20, 30);
    this.ctx.fillText(`Controls: WASD / Arrows to Move`, 20, 50);
    this.ctx.fillText(`Space: Explosion Particle FX | Score: ${this.score}`, 20, 70);
    this.ctx.restore();
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    window.removeEventListener('keydown', this.boundKeyDown);
    window.removeEventListener('keyup', this.boundKeyUp);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MovementDemo };
}
