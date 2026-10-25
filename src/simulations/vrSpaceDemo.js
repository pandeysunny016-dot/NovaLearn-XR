// src/simulations/vrSpaceDemo.js — First-person 3D/360 Interactive VR Lab Room
// Provides keyboard (WASD) and mouse-look navigation inside a simulated VR lab environment.

class VRSpaceDemo {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    // Camera & User Position in 3D Space
    this.cam = {
      x: 0,
      y: 1.6, // 1.6m eye height
      z: -4,
      yaw: 0,    // horizontal angle
      pitch: 0   // vertical angle
    };

    this.keys = {
      KeyW: false, KeyS: false, KeyA: false, KeyD: false,
      ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false
    };

    this.isPointerLocked = false;
    this.lastTime = performance.now();

    // Lab World Entities
    this.entities = [
      { id: 'hmd_pedestal', name: 'Google Cardboard HMD', x: -2.5, y: 1.0, z: 2.0, size: 0.6, color: '#f59e0b', desc: '3DOF Smartphone VR Viewer with 45mm lenses' },
      { id: 'ai_core', name: 'Reinforcement Learning Terminal', x: 0, y: 1.2, z: 4.0, size: 0.8, color: '#10b981', desc: 'Q-Learning & PPO Neural Training Node' },
      { id: 'unity_holo', name: 'Unity 3D Engine Hologram', x: 2.5, y: 1.0, z: 2.0, size: 0.6, color: '#00d4ff', desc: 'Real-time scene hierarchy and shader pipeline' },
      { id: 'blender_mesh', name: 'Blender 3D Asset Stand', x: 0, y: 0.8, z: -1.0, size: 0.5, color: '#a855f7', desc: 'Low-poly optimized 3D mesh for mobile XR' }
    ];

    this.focusedEntity = null;
    this.initEvents();
    this.startLoop();
  }

  initEvents() {
    this.boundKeyDown = (e) => {
      if (this.keys.hasOwnProperty(e.code)) {
        this.keys[e.code] = true;
      }
    };
    this.boundKeyUp = (e) => {
      if (this.keys.hasOwnProperty(e.code)) {
        this.keys[e.code] = false;
      }
    };
    window.addEventListener('keydown', this.boundKeyDown);
    window.addEventListener('keyup', this.boundKeyUp);

    // Mouse drag orientation
    this.isDragging = false;
    this.lastMouse = { x: 0, y: 0 };

    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMouse = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener('mouseup', () => { this.isDragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastMouse.x;
      const dy = e.clientY - this.lastMouse.y;
      this.cam.yaw += dx * 0.005;
      this.cam.pitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, this.cam.pitch - dy * 0.005));
      this.lastMouse = { x: e.clientX, y: e.clientY };
    });
  }

  update(dt) {
    const moveSpeed = 3.0;
    const forward = (this.keys.KeyW || this.keys.ArrowUp) ? 1 : (this.keys.KeyS || this.keys.ArrowDown) ? -1 : 0;
    const strafe = (this.keys.KeyD || this.keys.ArrowRight) ? 1 : (this.keys.KeyA || this.keys.ArrowLeft) ? -1 : 0;

    if (forward !== 0 || strafe !== 0) {
      const sinY = Math.sin(this.cam.yaw);
      const cosY = Math.cos(this.cam.yaw);

      this.cam.x += (forward * sinY + strafe * cosY) * moveSpeed * dt;
      this.cam.z += (forward * cosY - strafe * sinY) * moveSpeed * dt;

      // Bound user inside 12m x 12m lab room
      this.cam.x = Math.max(-5.5, Math.min(5.5, this.cam.x));
      this.cam.z = Math.max(-5.5, Math.min(5.5, this.cam.z));
    }

    // Check entity targeting at center reticle
    const w = this.canvas.width;
    const h = this.canvas.height;
    let closest = null;
    let minD = Infinity;

    this.entities.forEach(ent => {
      const p = this.project(ent.x, ent.y, ent.z, w, h);
      if (p.visible) {
        const d = Math.hypot(p.x - w / 2, p.y - h / 2);
        if (d < p.radius * 1.5 && p.z < minD) {
          minD = p.z;
          closest = ent;
        }
      }
    });

    this.focusedEntity = closest;
    const hudInfo = document.getElementById('vr-space-hud');
    if (hudInfo) {
      if (this.focusedEntity) {
        hudInfo.innerHTML = `<strong>${this.focusedEntity.name}</strong>: ${this.focusedEntity.desc}`;
      } else {
        hudInfo.innerHTML = `WASD to walk around lab | Drag mouse to look in 360° | Focus reticle on objects to inspect`;
      }
    }
  }

  project(x, y, z, w, h) {
    // Relative coordinates to camera
    const rx = x - this.cam.x;
    const ry = y - this.cam.y;
    const rz = z - this.cam.z;

    // Rotate Yaw (around Y axis)
    const cosY = Math.cos(-this.cam.yaw);
    const sinY = Math.sin(-this.cam.yaw);
    const x1 = rx * cosY - rz * sinY;
    const z1 = rx * sinY + rz * cosY;

    // Rotate Pitch (around X axis)
    const cosP = Math.cos(-this.cam.pitch);
    const sinP = Math.sin(-this.cam.pitch);
    const y2 = ry * cosP - z1 * sinP;
    const z2 = ry * sinP + z1 * cosP;

    if (z2 <= 0.2) return { visible: false };

    const fov = 380;
    const scale = fov / z2;
    const px = x1 * scale + w / 2;
    const py = -y2 * scale + h / 2;

    return {
      x: px,
      y: py,
      radius: Math.max(10, scale * 0.4),
      z: z2,
      visible: px >= -100 && px <= w + 100 && py >= -100 && py <= h + 100
    };
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

    // Floor Grid
    this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.08)';
    this.ctx.lineWidth = 1;

    for (let gx = -6; gx <= 6; gx += 1) {
      const p1 = this.project(gx, 0, -6, w, h);
      const p2 = this.project(gx, 0, 6, w, h);
      if (p1.visible && p2.visible) {
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
      }
    }
    for (let gz = -6; gz <= 6; gz += 1) {
      const p1 = this.project(-6, 0, gz, w, h);
      const p2 = this.project(6, 0, gz, w, h);
      if (p1.visible && p2.visible) {
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
      }
    }

    // Ceiling Outline
    this.ctx.strokeStyle = 'rgba(168, 85, 247, 0.06)';
    for (let gx = -6; gx <= 6; gx += 2) {
      const p1 = this.project(gx, 3.2, -6, w, h);
      const p2 = this.project(gx, 3.2, 6, w, h);
      if (p1.visible && p2.visible) {
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
      }
    }

    // Render Entities sorted by depth
    const renderable = this.entities
      .map(e => ({ ...e, proj: this.project(e.x, e.y, e.z, w, h) }))
      .filter(e => e.proj.visible)
      .sort((a, b) => b.proj.z - a.proj.z);

    renderable.forEach(ent => {
      const p = ent.proj;
      const isFocused = this.focusedEntity && this.focusedEntity.id === ent.id;

      // Glow halo
      this.ctx.save();
      this.ctx.fillStyle = ent.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.strokeStyle = isFocused ? '#ffffff' : 'rgba(255, 255, 255, 0.3)';
      this.ctx.lineWidth = isFocused ? 3 : 1.5;
      this.ctx.stroke();

      // Label
      this.ctx.fillStyle = isFocused ? '#00d4ff' : '#cbd5e1';
      this.ctx.font = isFocused ? 'bold 12px Inter, sans-serif' : '11px Inter, sans-serif';
      this.ctx.fillText(ent.name, p.x - p.radius * 1.2, p.y - p.radius - 8);
      this.ctx.restore();
    });

    // Draw Crosshair Reticle
    this.ctx.save();
    const cx = w / 2;
    const cy = h / 2;
    this.ctx.strokeStyle = this.focusedEntity ? '#00d4ff' : 'rgba(255, 255, 255, 0.6)';
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.restore();
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    window.removeEventListener('keydown', this.boundKeyDown);
    window.removeEventListener('keyup', this.boundKeyUp);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VRSpaceDemo };
}
