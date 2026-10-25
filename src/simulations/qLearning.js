// src/simulations/qLearning.js — Real tabular Q-Learning Grid-World Simulator with dynamic updates

class QLearningSimulator {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.gridSize = 5;
    this.startState = { x: 0, y: 0 };
    this.goalState = { x: 4, y: 4 };
    this.obstacles = [
      { x: 1, y: 1 },
      { x: 2, y: 3 },
      { x: 3, y: 1 },
      { x: 2, y: 2 }
    ];

    // Hyperparameters
    this.alpha = 0.2;     // Learning rate
    this.gamma = 0.9;     // Discount factor
    this.epsilon = 0.3;   // Exploration rate
    this.minEpsilon = 0.05;
    this.epsilonDecay = 0.995;

    // Actions: 0: Up, 1: Down, 2: Left, 3: Right
    this.actions = [
      { dx: 0, dy: -1, name: 'Up' },
      { dx: 0, dy: 1, name: 'Down' },
      { dx: -1, dy: 0, name: 'Left' },
      { dx: 1, dy: 0, name: 'Right' }
    ];

    this.qTable = {};
    this.agentPos = { ...this.startState };
    this.episode = 0;
    this.totalSteps = 0;
    this.episodeReward = 0;
    this.rewardHistory = [];
    this.isRunning = false;
    this.speedMs = 80;
    this.timerId = null;

    this.initQTable();
    this.render();
  }

  getStateKey(x, y) {
    return `${x},${y}`;
  }

  initQTable() {
    this.qTable = {};
    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        this.qTable[this.getStateKey(x, y)] = [0, 0, 0, 0];
      }
    }
  }

  reset() {
    this.pause();
    this.initQTable();
    this.agentPos = { ...this.startState };
    this.episode = 0;
    this.totalSteps = 0;
    this.episodeReward = 0;
    this.rewardHistory = [];
    this.render();
  }

  isObstacle(x, y) {
    return this.obstacles.some(o => o.x === x && o.y === y);
  }

  isGoal(x, y) {
    return x === this.goalState.x && y === this.goalState.y;
  }

  chooseAction(stateKey) {
    // Epsilon-greedy action selection
    if (Math.random() < this.epsilon) {
      return Math.floor(Math.random() * this.actions.length); // Explore
    }
    // Exploit: find max Q-value
    const qValues = this.qTable[stateKey];
    let maxVal = -Infinity;
    let bestActions = [];
    for (let i = 0; i < qValues.length; i++) {
      if (qValues[i] > maxVal) {
        maxVal = qValues[i];
        bestActions = [i];
      } else if (qValues[i] === maxVal) {
        bestActions.push(i);
      }
    }
    return bestActions[Math.floor(Math.random() * bestActions.length)];
  }

  step() {
    const curKey = this.getStateKey(this.agentPos.x, this.agentPos.y);
    const actionIdx = this.chooseAction(curKey);
    const act = this.actions[actionIdx];

    const nextX = Math.max(0, Math.min(this.gridSize - 1, this.agentPos.x + act.dx));
    const nextY = Math.max(0, Math.min(this.gridSize - 1, this.agentPos.y + act.dy));

    let reward = -1; // Small step cost to encourage speed
    let done = false;

    if (this.isObstacle(nextX, nextY)) {
      reward = -10; // Obstacle penalty
      // Agent bounces back to current position
    } else if (this.isGoal(nextX, nextY)) {
      reward = 20; // Goal reached
      done = true;
      this.agentPos = { x: nextX, y: nextY };
    } else {
      this.agentPos = { x: nextX, y: nextY };
    }

    this.episodeReward += reward;
    this.totalSteps++;

    // Bellman Equation Q-Learning Update
    const nextKey = this.getStateKey(this.agentPos.x, this.agentPos.y);
    const nextMaxQ = done ? 0 : Math.max(...this.qTable[nextKey]);
    const oldQ = this.qTable[curKey][actionIdx];

    // Q(s, a) <- Q(s, a) + alpha * [Reward + gamma * max_a' Q(s', a') - Q(s, a)]
    this.qTable[curKey][actionIdx] = oldQ + this.alpha * (reward + this.gamma * nextMaxQ - oldQ);

    if (done || this.totalSteps % 100 === 0) {
      this.episode++;
      this.rewardHistory.push(this.episodeReward);
      if (this.rewardHistory.length > 50) this.rewardHistory.shift();
      this.episodeReward = 0;
      this.agentPos = { ...this.startState };
      // Epsilon decay
      this.epsilon = Math.max(this.minEpsilon, this.epsilon * this.epsilonDecay);
    }

    this.render();
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    const run = () => {
      if (!this.isRunning) return;
      this.step();
      this.timerId = setTimeout(run, this.speedMs);
    };
    run();
  }

  pause() {
    this.isRunning = false;
    if (this.timerId) clearTimeout(this.timerId);
  }

  render() {
    if (!this.canvas) return;
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.ctx.clearRect(0, 0, w, h);

    const cellSize = Math.min(w, h) / this.gridSize;

    // Draw Grid & Q-value directional indicators
    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        const px = x * cellSize;
        const py = y * cellSize;

        this.ctx.strokeStyle = '#334155';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(px, py, cellSize, cellSize);

        if (this.isObstacle(x, y)) {
          this.ctx.fillStyle = '#ef4444';
          this.ctx.fillRect(px + 2, py + 2, cellSize - 4, cellSize - 4);
          this.ctx.fillStyle = '#ffffff';
          this.ctx.font = '11px Inter, sans-serif';
          this.ctx.fillText('WALL', px + cellSize / 2 - 14, py + cellSize / 2 + 4);
          continue;
        }

        if (this.isGoal(x, y)) {
          this.ctx.fillStyle = '#10b981';
          this.ctx.fillRect(px + 2, py + 2, cellSize - 4, cellSize - 4);
          this.ctx.fillStyle = '#ffffff';
          this.ctx.font = 'bold 12px Inter, sans-serif';
          this.ctx.fillText('GOAL +20', px + cellSize / 2 - 28, py + cellSize / 2 + 4);
          continue;
        }

        // Draw Q-values triangles
        const key = this.getStateKey(x, y);
        const qVals = this.qTable[key] || [0, 0, 0, 0];

        this.drawQDirection(px, py, cellSize, 0, qVals[0]); // Up
        this.drawQDirection(px, py, cellSize, 1, qVals[1]); // Down
        this.drawQDirection(px, py, cellSize, 2, qVals[2]); // Left
        this.drawQDirection(px, py, cellSize, 3, qVals[3]); // Right
      }
    }

    // Draw Start Marker
    const sx = this.startState.x * cellSize;
    const sy = this.startState.y * cellSize;
    this.ctx.strokeStyle = '#3b82f6';
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(sx + 4, sy + 4, cellSize - 8, cellSize - 8);

    // Draw Agent
    const ax = this.agentPos.x * cellSize + cellSize / 2;
    const ay = this.agentPos.y * cellSize + cellSize / 2;
    this.ctx.fillStyle = '#00d4ff';
    this.ctx.beginPath();
    this.ctx.arc(ax, ay, cellSize * 0.28, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Draw Q-Learning Diagnostics
    this.renderDiagnostics();
  }

  drawQDirection(px, py, size, dirIdx, val) {
    const cx = px + size / 2;
    const cy = py + size / 2;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy);

    if (dirIdx === 0) { // Up
      this.ctx.lineTo(px, py);
      this.ctx.lineTo(px + size, py);
    } else if (dirIdx === 1) { // Down
      this.ctx.lineTo(px, py + size);
      this.ctx.lineTo(px + size, py + size);
    } else if (dirIdx === 2) { // Left
      this.ctx.lineTo(px, py);
      this.ctx.lineTo(px, py + size);
    } else if (dirIdx === 3) { // Right
      this.ctx.lineTo(px + size, py);
      this.ctx.lineTo(px + size, py + size);
    }
    this.ctx.closePath();

    // Map Q-value to intensity color
    const norm = Math.max(-10, Math.min(20, val));
    if (norm > 0) {
      const alpha = Math.min(0.7, norm / 20);
      this.ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
    } else if (norm < 0) {
      const alpha = Math.min(0.7, Math.abs(norm) / 10);
      this.ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`;
    } else {
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    }
    this.ctx.fill();
    this.ctx.restore();
  }

  renderDiagnostics() {
    const el = document.getElementById('ql-diag');
    if (!el) return;
    el.innerHTML = `
      <div class="stat-pill"><span>Episode:</span> <strong>${this.episode}</strong></div>
      <div class="stat-pill"><span>Steps:</span> <strong>${this.totalSteps}</strong></div>
      <div class="stat-pill"><span>Epsilon (ε):</span> <strong>${this.epsilon.toFixed(3)}</strong></div>
      <div class="stat-pill"><span>Current Pos:</span> <strong>(${this.agentPos.x}, ${this.agentPos.y})</strong></div>
      <div class="stat-pill"><span>Last Reward:</span> <strong>${this.rewardHistory[this.rewardHistory.length - 1] || 0}</strong></div>
    `;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QLearningSimulator };
}
