// settings.js — Logic for Settings Secondary Window

document.addEventListener('DOMContentLoaded', async () => {
  const bridge = window.neuralverse;
  if (!bridge) return;

  const themeEl = document.getElementById('set-theme');
  const notifyEl = document.getElementById('set-notify');
  const btnSave = document.getElementById('btn-save-settings');
  const btnReset = document.getElementById('btn-reset-data');

  try {
    const res = await bridge.readSettings();
    if (res && res.success && res.data) {
      if (themeEl) themeEl.value = res.data.theme || 'dark';
      if (notifyEl) notifyEl.checked = res.data.notifications !== false;
    }
  } catch (err) {
    console.error('Failed reading settings:', err);
  }

  if (btnSave) {
    btnSave.addEventListener('click', async () => {
      const newSettings = {
        theme: themeEl.value,
        notifications: notifyEl.checked
      };
      await bridge.saveSettings(newSettings);
      if (bridge.showNotification && notifyEl.checked) {
        bridge.showNotification('Settings Saved', 'Your studio preferences have been updated.');
      }
      window.close();
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', async () => {
      if (confirm('Are you sure you want to reset all your progress, quizzes, and notes? This action cannot be undone.')) {
        await bridge.resetData();
        alert('All learning data has been reset to defaults.');
        window.close();
      }
    });
  }
});
