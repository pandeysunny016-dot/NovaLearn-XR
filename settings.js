// settings.js — Logic for Settings Secondary Window

document.addEventListener('DOMContentLoaded', async () => {
  const bridge = window.neuralverse;
  if (!bridge) return;

  const themeEl = document.getElementById('set-theme');
  const accentEl = document.getElementById('set-accent');
  const goalEl = document.getElementById('set-daily-goal');
  const soundEl = document.getElementById('set-sound');
  const notifyEl = document.getElementById('set-notify');
  const providerEl = document.getElementById('set-ai-provider');
  const apiKeyEl = document.getElementById('set-ai-key');
  const endpointEl = document.getElementById('set-ai-endpoint');
  const btnSave = document.getElementById('btn-save-settings');
  const btnReset = document.getElementById('btn-reset-data');

  try {
    const res = await bridge.readSettings();
    if (res && res.success && res.data) {
      if (themeEl && res.data.theme) themeEl.value = res.data.theme;
      if (accentEl && res.data.accent) accentEl.value = res.data.accent;
      if (goalEl && res.data.dailyGoalMinutes) goalEl.value = res.data.dailyGoalMinutes;
      if (soundEl && typeof res.data.soundEnabled === 'boolean') soundEl.checked = res.data.soundEnabled;
      if (notifyEl && typeof res.data.notifications === 'boolean') notifyEl.checked = res.data.notifications;
      if (providerEl && res.data.aiProvider) providerEl.value = res.data.aiProvider;
      if (apiKeyEl && res.data.aiApiKey) apiKeyEl.value = res.data.aiApiKey;
      if (endpointEl && res.data.aiEndpoint) endpointEl.value = res.data.aiEndpoint;
    }
  } catch (err) {
    console.error('Failed reading settings:', err);
  }

  if (btnSave) {
    btnSave.addEventListener('click', async () => {
      const newSettings = {
        theme: themeEl ? themeEl.value : 'dark',
        accent: accentEl ? accentEl.value : 'cyan',
        dailyGoalMinutes: goalEl ? parseInt(goalEl.value, 10) || 20 : 20,
        soundEnabled: soundEl ? soundEl.checked : true,
        notifications: notifyEl ? notifyEl.checked : true,
        aiProvider: providerEl ? providerEl.value : 'offline',
        aiApiKey: apiKeyEl ? apiKeyEl.value.trim() : '',
        aiEndpoint: endpointEl ? endpointEl.value.trim() : ''
      };

      await bridge.saveSettings(newSettings);
      if (bridge.showNotification && newSettings.notifications) {
        bridge.showNotification('Preferences Saved', 'Studio appearance and AI configuration updated.');
      }
      window.close();
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', async () => {
      if (confirm('Are you sure you want to reset all your progress, quizzes, notes, and XP? This action cannot be undone.')) {
        await bridge.resetData();
        alert('All learning data has been reset to defaults.');
        window.close();
      }
    });
  }
});
