// src/modules/aiAssistant.js — NeuralVerse Intelligent Learning Assistant
// Provides contextual explanations, practice generation, hints, summaries,
// and supports external LLM API endpoints with a robust offline fallback engine.

class AIAssistant {
  constructor(bridge) {
    this.bridge = bridge;
    this.settings = {
      provider: 'offline', // 'offline', 'openai', 'anthropic', 'custom'
      apiKey: '',
      endpoint: '',
      model: 'gpt-3.5-turbo'
    };
  }

  async init() {
    if (this.bridge && this.bridge.readSettings) {
      try {
        const res = await this.bridge.readSettings();
        if (res && res.success && res.data && res.data.aiConfig) {
          this.settings = { ...this.settings, ...res.data.aiConfig };
        }
      } catch (err) {
        console.warn('AIAssistant init error:', err);
      }
    }
  }

  async ask({ action, lesson, query, code }) {
    // If external API is configured and key is present, try IPC secure query
    if (this.settings.provider !== 'offline' && this.settings.apiKey && this.bridge && this.bridge.queryAI) {
      try {
        const remoteRes = await this.bridge.queryAI({
          provider: this.settings.provider,
          apiKey: this.settings.apiKey,
          endpoint: this.settings.endpoint,
          model: this.settings.model,
          prompt: this.buildPrompt(action, lesson, query, code)
        });
        if (remoteRes && remoteRes.success && remoteRes.reply) {
          return { success: true, reply: remoteRes.reply, source: 'cloud' };
        }
      } catch (err) {
        console.warn('Remote AI query failed, falling back to local engine:', err);
      }
    }

    // Offline Knowledge Engine
    return {
      success: true,
      reply: this.generateOfflineResponse(action, lesson, query, code),
      source: 'offline'
    };
  }

  buildPrompt(action, lesson, query, code) {
    const lTitle = lesson ? lesson.title : 'General Virtual Reality & AI';
    const lContent = lesson ? lesson.content.substring(0, 800) : '';

    switch (action) {
      case 'explain':
        return `Explain the lesson "${lTitle}" in simple, beginner-friendly terms with an everyday analogy.\nLesson excerpt:\n${lContent}`;
      case 'hint':
        return `Give a subtle hint for the following question without giving away the full answer:\n"${query}"\nContext: ${lTitle}`;
      case 'practice':
        return `Generate 2 quick practical exercises or questions based on "${lTitle}". Include expected outcome.`;
      case 'summarize':
        return `Provide a concise 3-bullet revision summary for the lesson "${lTitle}". Focus on key formulas or definitions.`;
      case 'chat':
      default:
        return `You are NeuralVerse AI Tutor for the course "Mobile Virtual Reality and Artificial Intelligence". Context: ${lTitle}.\nUser Question: ${query}`;
    }
  }

  generateOfflineResponse(action, lesson, query, code) {
    const title = lesson ? lesson.title : 'Mobile VR & AI';
    const terms = (lesson && lesson.terms) ? lesson.terms.join(', ') : 'VR, Shaders, Q-Learning, ML-Agents';

    if (action === 'explain') {
      return `### 💡 Beginner Explanation: ${title}\n\n` +
        `Think of **${title}** as a fundamental building block in simulated reality. Just like in physical engineering, virtual reality systems must balance sensory feedback with computational limits.\n\n` +
        `- **Core concept:** Everything revolves around how the computer tracks the user's perception and updates the display in under 20 milliseconds to sustain *Presence*.\n` +
        `- **Analogy:** Imagine viewing a movie through a window versus stepping directly onto the movie set. ${title} provides the mechanics that allow the digital camera or intelligent agent to navigate that set seamlessly.\n` +
        `- **Key terminology to memorize:** \`${terms}\`.\n\n` +
        `*Tip: Try out the interactive lab associated with this lesson to see the math in action!*`;
    }

    if (action === 'hint') {
      return `### 🔍 Guiding Hint\n\n` +
        `Consider what happens to the mathematical update rule or frame timing:\n` +
        `1. Review the relationship between the immediate step and future outcomes (like discount factor $\\gamma$ in Q-learning or frame interval $\\Delta t$ in physics).\n` +
        `2. Check whether this operates in **discrete space** (tables/states) or **continuous space** (vectors/neural nets).\n` +
        `3. Remember that in VR, low frame latency is critical to prevent visual-vestibular conflict!`;
    }

    if (action === 'practice') {
      return `### 📝 Practice Exercise for "${title}"\n\n` +
        `**Challenge 1 (Conceptual):**\n` +
        `Write down in one sentence why increasing exploration rate ($\\epsilon$) too late in training can degrade an agent's performance.\n\n` +
        `**Challenge 2 (Code/Mental Math):**\n` +
        `If an agent is in state $s$ with $Q(s, a) = 4.0$, receives reward $R = 2$, discount $\\gamma = 0.8$, and the best next state has $\\max Q(s', a') = 5.0$ with learning rate $\\alpha = 0.5$:\n` +
        `$$\\text{Target} = 2 + 0.8(5.0) = 6.0$$\n` +
        `$$\\text{New } Q = 4.0 + 0.5(6.0 - 4.0) = 5.0$$\n` +
        `*Try running this scenario in the Q-Learning Laboratory!*`;
    }

    if (action === 'summarize') {
      return `### 📋 Revision Summary: ${title}\n\n` +
        `• **Objective:** Understand how ${title} applies directly to interactive 3D simulations and intelligent decision-making.\n` +
        `• **Crucial Elements:** \`${terms}\`.\n` +
        `• **Exam / Viva Highlight:** Always distinguish between desktop approximations (like canvas raycasts) and real hardware targets (Google Cardboard 3DOF gyro sensors or Unity ML-Agents PPO).`;
    }

    // Default chat
    const qLower = (query || '').toLowerCase();
    if (qLower.includes('difference') || qLower.includes('vs') || qLower.includes('compare')) {
      return `### ⚖️ Comparison Note\n\nWhen comparing concepts in ${title}, remember:\n- **Simulation vs Production:** In-browser demos isolate the core mathematical formula (e.g. Tabular Q-table updates).\n- **3DOF vs 6DOF:** 3DOF tracks head rotation (Yaw, Pitch, Roll) using gyroscope and accelerometer; 6DOF adds translational position.\n- Let me know if you want a code snippet or practical exercise!`;
    }

    return `### 🤖 NeuralVerse AI Tutor\n\n` +
      `Regarding your question **"${query || 'General Course Question'}"**:\n\n` +
      `In the context of **${title}**, this relates directly to how the virtual world models entities, evaluates state transitions, and presents responsive feedback to the user.\n\n` +
      `**Suggested next steps:**\n` +
      `1. Check the lesson objectives and practical activity box.\n` +
      `2. Jump into the **Interactive Labs** tab to inspect the real-time parameters.\n` +
      `3. Test your retention with the **Module Assessment** quiz!`;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AIAssistant };
}
