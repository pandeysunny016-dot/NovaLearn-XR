// src/simulations/vrDemo.js — 3DOF Head Orientation & Gaze-Reticle Selection VR Simulator

class VRViewDemo {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.yaw = 0;   // Left-right angle
    this.pitch = 0; // Up-down angle
    this.isDragging = false;
    this.lastMouse = { x: 0, y: 0 };

    this.objects = [
      { id: 'cube', name: 'Neural Beacon', x: -100, y: 0, z: 250, size: 40, col: '#00d4ff', gazedTime: 0 },
      { id: 'sphere', name: 'Energy Core', x: 120, y: 20, z: 280, size: 45, col: '#a855f7', gazedTime: 0 },
      { id: 'monolith', name: 'Knowledge Monolith', x: 0, y: -40, z: 320, size: 55, col: '#10b981', gazedTime: 0 }
    ];

    this.gazeThreshold = 1.5; // seconds to activate
    this.selectedObject = null;
    this.lastTime = performance.now();

    this.initEvents();
    this.startLoop();
  }

  initEvents() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMouse = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener('mouseup', () => { this.isDragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastMouse.x;
      const dy = e.clientY - this.lastMouse.y;
      this.yaw += dx * 0.005;
      this.pitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, this.pitch - dy * 0.005));
      this.lastMouse = { x: e.clientX, y: e.clientY };
    });
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

  update(dt) {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const reticlePos = { x: w / 2, y: h / 2 };

    let currentGazed = null;

    this.objects.forEach(obj => {
      const proj = this.project(obj.x, obj.y, obj.z, w, h);
      if (proj && proj.visible) {
        const dist = Math.hypot(proj.x - reticlePos.x, proj.y - reticlePos.y);
        if (dist < proj.size * 0.9) {
          currentGazed = obj;
          obj.gazedTime += dt;
          if (obj.gazedTime >= this.gazeThreshold) {
            this.selectedObject = obj;
          }
        } else {
          obj.gazedTime = Math.max(0, obj.gazedTime - dt * 2);
        }
      } else {
        obj.gazedTime = 0;
      }
    });

    const gazeStatusEl = document.getElementById('vr-gaze-status');
    if (gazeStatusEl) {
      if (this.selectedObject) {
        gazeStatusEl.innerHTML = `<span style="color:#10b981">Activated: <strong>${this.selectedObject.name}</strong></span>`;
      } else if (currentGazed) {
        const pct = Math.round((currentGazed.gazedTime / this.gazeThreshold) * 100);
        gazeStatusEl.innerHTML = `Locking on: <strong>${currentGazed.name}</strong> (${pct}%)`;
      } else {
        gazeStatusEl.textContent = 'Drag canvas to rotate view (3DOF). Gaze at an object to trigger selection.';
      }
    }
  }

  project(x, y, z, w, h) {
    // 3DOF Rotation
    // Rotate Yaw (around Y axis)
    const cosY = Math.cos(this.yaw);
    const sinY = Math.sin(this.yaw);
    const x1 = x * cosY - z * sinY;
    const z1 = x * sinY + z * cosY;

    // Rotate Pitch (around X axis)
    const cosP = Math.cos(this.pitch);
    const sinP = Math.sin(this.pitch);
    const y2 = y * cosP - z1 * sinP;
    const z2 = y * sinP + z1 * cosP;

    if (z2 <= 20) return { visible: false };

    const fov = 350;
    const scale = fov / z2;
    const px = x1 * scale + w / 2;
    const py = -y2 * scale + h / 2;

    return {
      x: px,
      y: py,
      size: 40 * scale,
      visible: px >= -50 && px <= w + 50 && py >= -50 && py <= h + 50
    };
  }

  render() {
    if (!this.canvas) return;
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.ctx.clearRect(0, 0, w, h);

    // Horizon line
    const horizY = h / 2 + Math.tan(this.pitch) * 350;
    this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.15)';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(0, horizY);
    this.ctx.lineTo(w, horizY);
    this.ctx.stroke();

    // Starfield/Dust particles
    for (let i = 0; i < 40; i++) {
      const seedX = (i * 73) % 600 - 300;
      const seedY = (i * 47) % 400 - 200;
      const seedZ = ((i * 31) % 400) + 100;
      const p = this.project(seedX, seedY, seedZ, w, h);
      if (p.visible) {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.fillRect(p.x, p.y, 2, 2);
      }
    }

    // Draw Objects
    this.objects.forEach(obj => {
      const p = this.project(obj.x, obj.y, obj.z, w, h);
      if (p.visible) {
        this.ctx.save();
        this.ctx.fillStyle = obj.col;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();

        // Gaze progress ring
        if (obj.gazedTime > 0) {
          const ratio = Math.min(1, obj.gazedTime / this.gazeThreshold);
          this.ctx.strokeStyle = '#ffffff';
          this.ctx.lineWidth = 3;
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.size + 8, -Math.PI / 2, -Math.PI / 2 + ratio * Math.PI * 2);
          this.ctx.stroke();
        }

        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '11px Inter, sans-serif';
        this.ctx.fillText(obj.name, p.x - p.size, p.y + p.size + 16);
        this.ctx.restore();
      }
    });

    // Draw Center Gaze Reticle
    this.ctx.save();
    const cx = w / 2;
    const cy = h / 2;

    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    this.ctx.stroke();

    this.ctx.fillStyle = 'rgba(0, 212, 255, 0.9)';
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 2, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.restore();
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VRViewDemo };
}
