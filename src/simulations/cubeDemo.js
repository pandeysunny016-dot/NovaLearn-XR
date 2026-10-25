// src/simulations/cubeDemo.js — Interactive 3D Cube Canvas Simulation for Unity 3D concepts

class CubeDemo {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.pos = { x: 0, y: 0, z: 0 };
    this.rot = { x: 25, y: 35, z: 0 }; // in degrees
    this.scale = { x: 1, y: 1, z: 1 };
    this.color = '#00d4ff';
    this.wireframe = false;
    this.lightIntensity = 0.8;
    this.autoRotate = true;

    this.isDragging = false;
    this.lastMouse = { x: 0, y: 0 };

    this.vertices = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1],  [1, -1, 1],  [1, 1, 1],  [-1, 1, 1]
    ];

    this.faces = [
      [0, 1, 2, 3, [0, 0, -1]], // Back
      [5, 4, 7, 6, [0, 0, 1]],  // Front
      [4, 0, 3, 7, [-1, 0, 0]], // Left
      [1, 5, 6, 2, [1, 0, 0]],  // Right
      [3, 2, 6, 7, [0, 1, 0]],  // Top
      [4, 5, 1, 0, [0, -1, 0]]  // Bottom
    ];

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
      this.rot.y += dx * 0.7;
      this.rot.x += dy * 0.7;
      this.lastMouse = { x: e.clientX, y: e.clientY };
    });
  }

  setTransform({ posX, posY, posZ, rotX, rotY, rotZ, scale, color, wireframe, light, autoRotate }) {
    if (posX !== undefined) this.pos.x = posX;
    if (posY !== undefined) this.pos.y = posY;
    if (posZ !== undefined) this.pos.z = posZ;
    if (rotX !== undefined) this.rot.x = rotX;
    if (rotY !== undefined) this.rot.y = rotY;
    if (rotZ !== undefined) this.rot.z = rotZ;
    if (scale !== undefined) this.scale = { x: scale, y: scale, z: scale };
    if (color !== undefined) this.color = color;
    if (wireframe !== undefined) this.wireframe = wireframe;
    if (light !== undefined) this.lightIntensity = light;
    if (autoRotate !== undefined) this.autoRotate = autoRotate;
  }

  reset() {
    this.pos = { x: 0, y: 0, z: 0 };
    this.rot = { x: 25, y: 35, z: 0 };
    this.scale = { x: 1, y: 1, z: 1 };
    this.color = '#00d4ff';
    this.wireframe = false;
    this.lightIntensity = 0.8;
    this.autoRotate = true;
    this.render();
  }

  rotatePoint(p, rx, ry, rz) {
    let [x, y, z] = p;
    const radX = (rx * Math.PI) / 180;
    const radY = (ry * Math.PI) / 180;
    const radZ = (rz * Math.PI) / 180;

    // X rotation
    let y1 = y * Math.cos(radX) - z * Math.sin(radX);
    let z1 = y * Math.sin(radX) + z * Math.cos(radX);

    // Y rotation
    let x2 = x * Math.cos(radY) + z1 * Math.sin(radY);
    let z2 = -x * Math.sin(radY) + z1 * Math.cos(radY);

    // Z rotation
    let x3 = x2 * Math.cos(radZ) - y1 * Math.sin(radZ);
    let y3 = x2 * Math.sin(radZ) + y1 * Math.cos(radZ);

    return [x3, y3, z2];
  }

  project(p, w, h) {
    const distance = 4;
    const z = p[2] + distance - this.pos.z;
    const fov = 350;
    const scaleFactor = fov / (z > 0.1 ? z : 0.1);
    const x = (p[0] + this.pos.x) * scaleFactor + w / 2;
    const y = -(p[1] + this.pos.y) * scaleFactor + h / 2;
    return { x, y, z };
  }

  startLoop() {
    const loop = () => {
      this.render();
      if (this.autoRotate && !this.isDragging) {
        this.rot.y = (this.rot.y + 0.6) % 360;
        this.rot.x = (this.rot.x + 0.3) % 360;
      }
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }

  render() {
    if (!this.canvas) return;
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.ctx.clearRect(0, 0, w, h);

    // Grid Floor
    this.drawGrid(w, h);

    // Transform and project vertices
    const transformed = this.vertices.map(v => {
      const scaled = [v[0] * this.scale.x * 60, v[1] * this.scale.y * 60, v[2] * this.scale.z * 60];
      const rotated = this.rotatePoint(scaled, this.rot.x, this.rot.y, this.rot.z);
      return rotated;
    });

    // Face sorting by z-depth
    const renderableFaces = this.faces.map(face => {
      const normalRotated = this.rotatePoint(face[4], this.rot.x, this.rot.y, this.rot.z);
      // Center depth
      const avgZ = (transformed[face[0]][2] + transformed[face[1]][2] + transformed[face[2]][2] + transformed[face[3]][2]) / 4;
      return {
        indices: [face[0], face[1], face[2], face[3]],
        normal: normalRotated,
        avgZ
      };
    });

    renderableFaces.sort((a, b) => a.avgZ - b.avgZ);

    // Directional light vector
    const lightDir = [0.577, 0.577, -0.577];

    renderableFaces.forEach(f => {
      const pts = f.indices.map(idx => this.project(transformed[idx], w, h));

      // Calculate directional lighting dot product
      const dot = Math.max(0, (f.normal[0] * lightDir[0] + f.normal[1] * lightDir[1] + f.normal[2] * lightDir[2]));
      const intensity = 0.25 + dot * 0.75 * this.lightIntensity;

      this.ctx.beginPath();
      this.ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        this.ctx.lineTo(pts[i].x, pts[i].y);
      }
      this.ctx.closePath();

      if (this.wireframe) {
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();
      } else {
        this.ctx.fillStyle = this.shadeColor(this.color, intensity);
        this.ctx.fill();
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      }
    });

    // Draw Axes Gizmo
    this.drawGizmo(w, h);
  }

  drawGrid(w, h) {
    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.08)';
    this.ctx.lineWidth = 1;
    for (let x = -200; x <= 200; x += 40) {
      const p1 = this.project([x, -80, -200], w, h);
      const p2 = this.project([x, -80, 200], w, h);
      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.stroke();
    }
    for (let z = -200; z <= 200; z += 40) {
      const p1 = this.project([-200, -80, z], w, h);
      const p2 = this.project([200, -80, z], w, h);
      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.stroke();
    }
    this.ctx.restore();
  }

  drawGizmo(w, h) {
    const origin = { x: 50, y: h - 50 };
    const axes = [
      { name: 'X', vec: [30, 0, 0], col: '#ef4444' },
      { name: 'Y', vec: [0, 30, 0], col: '#10b981' },
      { name: 'Z', vec: [0, 0, 30], col: '#3b82f6' }
    ];
    this.ctx.save();
    axes.forEach(a => {
      const rot = this.rotatePoint(a.vec, this.rot.x, this.rot.y, this.rot.z);
      this.ctx.beginPath();
      this.ctx.strokeStyle = a.col;
      this.ctx.lineWidth = 2.5;
      this.ctx.moveTo(origin.x, origin.y);
      this.ctx.lineTo(origin.x + rot[0], origin.y - rot[1]);
      this.ctx.stroke();

      this.ctx.fillStyle = a.col;
      this.ctx.font = '10px Inter, sans-serif';
      this.ctx.fillText(a.name, origin.x + rot[0] * 1.2, origin.y - rot[1] * 1.2);
    });
    this.ctx.restore();
  }

  shadeColor(color, factor) {
    let c = color.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    let r = (num >> 16) * factor;
    let g = ((num >> 8) & 0x00FF) * factor;
    let b = (num & 0x0000FF) * factor;
    r = Math.min(255, Math.max(0, Math.round(r)));
    g = Math.min(255, Math.max(0, Math.round(g)));
    b = Math.min(255, Math.max(0, Math.round(b)));
    return `rgb(${r}, ${g}, ${b})`;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CubeDemo };
}
