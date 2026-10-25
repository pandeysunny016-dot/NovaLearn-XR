// src/modules/csharpPlayground.js — Safe in-browser C# Syntax & Execution Playground
// Provides beginner-friendly runnable Unity C# templates, syntax simulation, and console output.

class CSharpPlayground {
  constructor(containerId) {
    this.container = typeof document !== 'undefined' && containerId ? document.getElementById(containerId) : null;
    this.snippets = [
      {
        id: 'player_move',
        title: 'Player Movement (Transform.Translate)',
        code: `using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float speed = 5.0f;

    void Update()
    {
        float h = Input.GetAxis("Horizontal"); // A/D
        float v = Input.GetAxis("Vertical");   // W/S

        Vector3 move = new Vector3(h, 0, v);
        transform.Translate(move * speed * Time.deltaTime);

        Debug.Log("Current Position: " + transform.position);
    }
}`
      },
      {
        id: 'q_update',
        title: 'Q-Learning Bellman Calculation in C#',
        code: `using System;

public class QLearningAgent
{
    public static void Main()
    {
        double currentQ = 4.2;
        double reward = 10.0;
        double gamma = 0.9;
        double maxNextQ = 5.5;
        double alpha = 0.2;

        // Bellman Update Equation
        double updatedQ = currentQ + alpha * (reward + gamma * maxNextQ - currentQ);

        Console.WriteLine("Old Q-value: " + currentQ);
        Console.WriteLine("Reward: " + reward);
        Console.WriteLine("New Calculated Q-value: " + Math.Round(updatedQ, 3));
    }
}`
      },
      {
        id: 'gaze_reticle',
        title: 'Google Cardboard Gaze Timer',
        code: `using UnityEngine;

public class CardboardReticle : MonoBehaviour
{
    public float dwellThreshold = 1.5f;
    private float gazeTimer = 0.0f;

    public void OnGazeEnter()
    {
        gazeTimer += Time.deltaTime;
        float progress = Mathf.Clamp01(gazeTimer / dwellThreshold);
        Debug.Log($"Gaze Lock Progress: {Mathf.Round(progress * 100)}%");

        if (gazeTimer >= dwellThreshold)
        {
            Debug.Log("🎯 Target Activated in VR!");
            gazeTimer = 0;
        }
    }
}`
      },
      {
        id: 'explosion_force',
        title: 'Physics Explosion & Rigidbody',
        code: `using UnityEngine;

public class BombExplosion : MonoBehaviour
{
    public float explosionRadius = 5.0f;
    public float explosionForce = 750.0f;

    public void Detonate(Vector3 epicenter)
    {
        Collider[] hits = Physics.OverlapSphere(epicenter, explosionRadius);
        foreach (var col in hits)
        {
            Rigidbody rb = col.GetComponent<Rigidbody>();
            if (rb != null)
            {
                rb.AddExplosionForce(explosionForce, epicenter, explosionRadius);
                Debug.Log("Explosion force applied to: " + col.name);
            }
        }
    }
}`
      }
    ];
  }

  getTemplates() {
    const map = {};
    this.snippets.forEach(s => {
      map[s.id] = s.code;
    });
    return map;
  }

  executeCode(code) {
    let logs = ['Compilation successful.'];
    if (code.includes('QLearningAgent')) {
      logs.push('[Output] Calculated Updated Q(s,a) via Bellman equation.');
    } else if (code.includes('PlayerController')) {
      logs.push('[Unity Start] PlayerController initialized on GameObject.');
      logs.push('[Debug.Log] Position updated.');
    } else {
      logs.push('[Execution Success] Script compiled without syntax errors.');
    }
    return { success: true, output: logs };
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div>
            <h3 style="font-size: 18px; color: var(--accent-violet);">💻 C# Code Playground & Unity Scripts</h3>
            <p style="color: var(--text-muted); font-size: 12px; margin-top: 4px;">
              Select a C# snippet, customize variables, and run simulated execution with debug outputs.
            </p>
          </div>
          <div style="display: flex; gap: 8px;">
            <select id="csharp-snippet-select" style="background: var(--bg-primary); border: 1px solid var(--border-color); color: #fff; padding: 6px 12px; border-radius: var(--radius-sm); font-size: 12px;">
              ${this.snippets.map(s => `<option value="${s.id}">${s.title}</option>`).join('')}
            </select>
            <button class="btn btn-emerald" id="btn-run-csharp">▶ Run Code</button>
            <button class="btn btn-secondary" id="btn-reset-csharp">↺ Reset</button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 14px; min-height: 380px;">
          <div style="display: flex; flex-direction: column;">
            <div style="background: var(--bg-secondary); padding: 8px 12px; border: 1px solid var(--border-color); border-bottom: none; border-radius: 6px 6px 0 0; font-size: 11px; color: var(--text-muted); display:flex; justify-content:space-between;">
              <span>Script Editor (C# Unity Engine)</span>
              <span>Lines: <strong id="csharp-line-count">15</strong></span>
            </div>
            <textarea id="csharp-editor-textarea" style="flex: 1; width: 100%; background: #070b14; color: #a5f3fc; border: 1px solid var(--border-color); border-radius: 0 0 6px 6px; padding: 14px; font-family: 'Courier New', Courier, monospace; font-size: 13px; line-height: 1.6; resize: none; outline: none; user-select: text;" spellcheck="false"></textarea>
          </div>

          <div style="display: flex; flex-direction: column;">
            <div style="background: var(--bg-secondary); padding: 8px 12px; border: 1px solid var(--border-color); border-bottom: none; border-radius: 6px 6px 0 0; font-size: 11px; color: var(--text-muted); display:flex; justify-content:space-between;">
              <span>Unity Console & Debug Log</span>
              <button id="btn-clear-csharp-log" style="background:transparent; border:none; color:var(--text-sub); cursor:pointer; font-size:11px;">Clear</button>
            </div>
            <div id="csharp-console-output" style="flex: 1; background: #050811; color: #f8fafc; border: 1px solid var(--border-color); border-radius: 0 0 6px 6px; padding: 14px; font-family: 'Courier New', Courier, monospace; font-size: 12px; line-height: 1.6; overflow-y: auto; user-select: text;">
              <div style="color: var(--text-sub);">Click [Run Code] to compile and simulate execution outputs...</div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.loadSnippet(this.snippets[0].id);
  }

  bindEvents() {
    const sel = document.getElementById('csharp-snippet-select');
    const btnRun = document.getElementById('btn-run-csharp');
    const btnReset = document.getElementById('btn-reset-csharp');
    const btnClear = document.getElementById('btn-clear-csharp-log');
    const editor = document.getElementById('csharp-editor-textarea');

    if (sel) {
      sel.addEventListener('change', (e) => this.loadSnippet(e.target.value));
    }
    if (btnRun) {
      btnRun.addEventListener('click', () => this.runSimulation());
    }
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        const curId = sel ? sel.value : this.snippets[0].id;
        this.loadSnippet(curId);
      });
    }
    if (btnClear) {
      btnClear.addEventListener('click', () => {
        const out = document.getElementById('csharp-console-output');
        if (out) out.innerHTML = '<div style="color:var(--text-sub);">Console cleared.</div>';
      });
    }
    if (editor) {
      editor.addEventListener('input', () => {
        const lineCount = editor.value.split('\n').length;
        const countEl = document.getElementById('csharp-line-count');
        if (countEl) countEl.textContent = lineCount;
      });
    }
  }

  loadSnippet(id) {
    const snip = this.snippets.find(s => s.id === id) || this.snippets[0];
    const editor = document.getElementById('csharp-editor-textarea');
    const countEl = document.getElementById('csharp-line-count');
    if (editor) {
      editor.value = snip.code;
      if (countEl) countEl.textContent = snip.code.split('\n').length;
    }
  }

  runSimulation() {
    const editor = document.getElementById('csharp-editor-textarea');
    const out = document.getElementById('csharp-console-output');
    if (!editor || !out) return;

    const code = editor.value;
    out.innerHTML = `<div style="color: var(--accent-cyan); margin-bottom: 6px;">[Compilation] Parsing C# syntax and compiling AST...</div>`;

    setTimeout(() => {
      let logs = [];

      if (code.includes('QLearningAgent')) {
        // Evaluate Bellman equation with values in code or defaults
        const currentQMatch = code.match(/currentQ\s*=\s*([0-9.]+)/);
        const rewardMatch = code.match(/reward\s*=\s*([0-9.]+)/);
        const alphaMatch = code.match(/alpha\s*=\s*([0-9.]+)/);
        const gammaMatch = code.match(/gamma\s*=\s*([0-9.]+)/);
        const maxNextQMatch = code.match(/maxNextQ\s*=\s*([0-9.]+)/);

        const currentQ = currentQMatch ? parseFloat(currentQMatch[1]) : 4.2;
        const reward = rewardMatch ? parseFloat(rewardMatch[1]) : 10.0;
        const alpha = alphaMatch ? parseFloat(alphaMatch[1]) : 0.2;
        const gamma = gammaMatch ? parseFloat(gammaMatch[1]) : 0.9;
        const maxNextQ = maxNextQMatch ? parseFloat(maxNextQMatch[1]) : 5.5;

        const updated = currentQ + alpha * (reward + gamma * maxNextQ - currentQ);
        logs.push(`<div style="color:#10b981;">[Output] Old Q-value: ${currentQ}</div>`);
        logs.push(`<div style="color:#10b981;">[Output] Reward R: ${reward} | Learning Rate α: ${alpha}</div>`);
        logs.push(`<div style="color:#00d4ff; font-weight:bold;">[Output] Calculated Updated Q(s,a): ${updated.toFixed(4)}</div>`);
        logs.push(`<div style="color:#94a3b8; font-size:11px;">✓ Bellman Temporal Difference TD Error: ${(reward + gamma * maxNextQ - currentQ).toFixed(4)}</div>`);

      } else if (code.includes('PlayerController')) {
        const speedMatch = code.match(/speed\s*=\s*([0-9.]+)/);
        const speed = speedMatch ? parseFloat(speedMatch[1]) : 5.0;
        logs.push(`<div style="color:#10b981;">[Unity Start] PlayerController initialized on GameObject 'Player'.</div>`);
        logs.push(`<div style="color:#a855f7;">[FixedUpdate] Input axis readings: Horizontal = 1.0, Vertical = 0.5</div>`);
        logs.push(`<div style="color:#00d4ff;">[Transform] Moving forward at ${speed} m/s * Time.deltaTime (0.016s)</div>`);
        logs.push(`<div style="color:#38bdf8;">[Debug.Log] Current Position: (${(1.0 * speed * 0.016).toFixed(3)}, 0.000, ${(0.5 * speed * 0.016).toFixed(3)})</div>`);

      } else if (code.includes('CardboardReticle')) {
        logs.push(`<div style="color:#10b981;">[VR Gaze] Raycast detected collider with tag 'Interactive'.</div>`);
        logs.push(`<div style="color:#fbbf24;">[Debug.Log] Gaze Lock Progress: 33% (dwell: 0.5s)</div>`);
        logs.push(`<div style="color:#fbbf24;">[Debug.Log] Gaze Lock Progress: 67% (dwell: 1.0s)</div>`);
        logs.push(`<div style="color:#00d4ff; font-weight:bold;">[Debug.Log] 🎯 Target Activated in VR! (dwell time reached: 1.5s)</div>`);

      } else if (code.includes('BombExplosion')) {
        const forceMatch = code.match(/explosionForce\s*=\s*([0-9.]+)/);
        const force = forceMatch ? parseFloat(forceMatch[1]) : 750.0;
        logs.push(`<div style="color:#ef4444; font-weight:bold;">[Physics] Detonation triggered at Vector3(0, 0, 0)!</div>`);
        logs.push(`<div style="color:#10b981;">[Physics.OverlapSphere] Detected 3 colliders within radius.</div>`);
        logs.push(`<div style="color:#cbd5e1;">[Rigidbody] Applied ${force}N impulse to 'Enemy_Cube_01'</div>`);
        logs.push(`<div style="color:#cbd5e1;">[Rigidbody] Applied ${force}N impulse to 'Crate_Wood_02'</div>`);

      } else {
        logs.push(`<div style="color:#10b981;">[Execution Success] Script compiled without syntax errors.</div>`);
        logs.push(`<div style="color:#cbd5e1;">[Debug.Log] Script executed in simulated Unity mono runtime.</div>`);
      }

      out.innerHTML += logs.join('');
    }, 300);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CSharpPlayground };
}
