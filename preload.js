// preload.js — NeuralVerse Secure Preload Script
// Exposes a limited, well-defined API to the renderer via contextBridge.
// No direct access to Node.js, ipcRenderer, or filesystem is given to the renderer.

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('neuralverse', {
  // ─── App Info ──────────────────────────────────────────────────
  getAppInfo: () => ipcRenderer.invoke('app:getInfo'),

  // ─── Data Persistence ─────────────────────────────────────────
  readData: () => ipcRenderer.invoke('data:read'),
  saveData: (data) => ipcRenderer.invoke('data:save', data),
  resetData: () => ipcRenderer.invoke('data:reset'),

  // ─── Settings ─────────────────────────────────────────────────
  readSettings: () => ipcRenderer.invoke('settings:read'),
  saveSettings: (settings) => ipcRenderer.invoke('settings:save', settings),

  // ─── Windows ──────────────────────────────────────────────────
  openSettings: () => ipcRenderer.invoke('window:openSettings'),
  openAbout: () => ipcRenderer.invoke('window:openAbout'),

  // ─── Notifications ────────────────────────────────────────────
  showNotification: (title, body) => ipcRenderer.invoke('notify:show', { title, body }),

  // ─── File Dialogs ─────────────────────────────────────────────
  openFileDialog: () => ipcRenderer.invoke('dialog:openFile'),
  saveFileDialog: (content, defaultName) => ipcRenderer.invoke('dialog:saveFile', { content, defaultName }),

  // ─── External Links ───────────────────────────────────────────
  openExternal: (url) => ipcRenderer.invoke('shell:openExternal', url)
});
