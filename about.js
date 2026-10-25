// about.js — Logic for About window
document.addEventListener('DOMContentLoaded', async () => {
  if (window.neuralverse && window.neuralverse.getAppInfo) {
    try {
      const info = await window.neuralverse.getAppInfo();
      console.log('Running on Platform:', info.platform, 'Electron:', info.electronVersion);
    } catch (e) {
      console.error(e);
    }
  }
});
