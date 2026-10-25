

const { app, BrowserWindow, ipcMain, dialog, Notification, shell, Menu } = require('electron');
const path = require('path');
const fs = require('fs');


const DATA_FILE = 'neuralverse-data.json';
const SETTINGS_FILE = 'neuralverse-settings.json';

function getDataPath(filename) {
  return path.join(app.getPath('userData'), filename);
}

function readJSON(filename) {
  const filePath = getDataPath(filename);
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error(`Error reading ${filename}:`, err.message);
    // If malformed, back up and reset
    try {
      const backupPath = filePath + '.backup-' + Date.now();
      fs.copyFileSync(filePath, backupPath);
      console.log(`Backed up malformed file to ${backupPath}`);
    } catch (_) { /* ignore backup errors */ }
  }
  return null;
}

function writeJSON(filename, data) {
  const filePath = getDataPath(filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return { success: true };
  } catch (err) {
    console.error(`Error writing ${filename}:`, err.message);
    return { success: false, error: err.message };
  }
}

function getDefaultAppData() {
  return {
    version: '1.0.0',
    createdAt: new Date().toISOString(),
    completedLessons: [],
    quizAttempts: [],
    notes: [],
    activities: [],
    bookmarks: [],
    streak: { lastActiveDate: null, count: 0 },
    simulatorPrefs: {}
  };
}

function getDefaultSettings() {
  return {
    theme: 'dark',
    notifications: true,
    fontSize: 'medium',
    sidebarCollapsed: false
  };
}

function ensureDataFiles() {
  if (!readJSON(DATA_FILE)) {
    writeJSON(DATA_FILE, getDefaultAppData());
  }
  if (!readJSON(SETTINGS_FILE)) {
    writeJSON(SETTINGS_FILE, getDefaultSettings());
  }
}


let mainWindow = null;
let settingsWindow = null;
let aboutWindow = null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    title: 'NeuralVerse — Interactive VR & AI Learning Studio',
    backgroundColor: '#0f1923',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    },
    icon: path.join(__dirname, 'assets', 'icon.png'),
    show: false
  });

  mainWindow.loadFile('index.html');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (settingsWindow) settingsWindow.close();
    if (aboutWindow) aboutWindow.close();
  });


  const template = [
    {
      label: 'NeuralVerse',
      submenu: [
        { label: 'About NeuralVerse', click: () => createAboutWindow() },
        { type: 'separator' },
        { label: 'Settings', click: () => createSettingsWindow() },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click: () => shell.openExternal('https://nptel.ac.in/')
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function createSettingsWindow() {
  if (settingsWindow) {
    settingsWindow.focus();
    return;
  }

  settingsWindow = new BrowserWindow({
    width: 650,
    height: 550,
    parent: mainWindow,
    modal: false,
    title: 'Settings',
    backgroundColor: '#0f1923',
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    },
    show: false
  });

  settingsWindow.loadFile('settings.html');
  settingsWindow.setMenuBarVisibility(false);

  settingsWindow.once('ready-to-show', () => {
    settingsWindow.show();
  });

  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });
}

function createAboutWindow() {
  if (aboutWindow) {
    aboutWindow.focus();
    return;
  }

  aboutWindow = new BrowserWindow({
    width: 550,
    height: 520,
    parent: mainWindow,
    modal: false,
    title: 'About NeuralVerse',
    backgroundColor: '#0f1923',
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    },
    show: false
  });

  aboutWindow.loadFile('about.html');
  aboutWindow.setMenuBarVisibility(false);

  aboutWindow.once('ready-to-show', () => {
    aboutWindow.show();
  });

  aboutWindow.on('closed', () => {
    aboutWindow = null;
  });
}



function registerIPCHandlers() {
  // App info
  ipcMain.handle('app:getInfo', () => {
    return {
      name: 'NeuralVerse',
      version: app.getVersion() || '1.0.0',
      platform: process.platform,
      arch: process.arch,
      electronVersion: process.versions.electron,
      nodeVersion: process.versions.node,
      chromeVersion: process.versions.chrome,
      dataPath: app.getPath('userData')
    };
  });

  // Read app data
  ipcMain.handle('data:read', () => {
    const data = readJSON(DATA_FILE);
    if (!data) {
      const defaults = getDefaultAppData();
      writeJSON(DATA_FILE, defaults);
      return { success: true, data: defaults };
    }
    return { success: true, data };
  });

  // Save app data
  ipcMain.handle('data:save', (event, newData) => {
    if (!newData || typeof newData !== 'object') {
      return { success: false, error: 'Invalid data format' };
    }
    return writeJSON(DATA_FILE, newData);
  });

  // Read settings
  ipcMain.handle('settings:read', () => {
    const settings = readJSON(SETTINGS_FILE);
    if (!settings) {
      const defaults = getDefaultSettings();
      writeJSON(SETTINGS_FILE, defaults);
      return { success: true, data: defaults };
    }
    return { success: true, data: settings };
  });

  // Save settings
  ipcMain.handle('settings:save', (event, newSettings) => {
    if (!newSettings || typeof newSettings !== 'object') {
      return { success: false, error: 'Invalid settings format' };
    }
    return writeJSON(SETTINGS_FILE, newSettings);
  });

  // Open settings window
  ipcMain.handle('window:openSettings', () => {
    createSettingsWindow();
    return { success: true };
  });

  // Open about window
  ipcMain.handle('window:openAbout', () => {
    createAboutWindow();
    return { success: true };
  });

  // Show native notification
  ipcMain.handle('notify:show', (event, { title, body }) => {
    if (!title || typeof title !== 'string') {
      return { success: false, error: 'Title is required' };
    }
    if (Notification.isSupported()) {
      const notification = new Notification({
        title: title.substring(0, 200),
        body: (body || '').substring(0, 500)
      });
      notification.show();
      return { success: true };
    }
    return { success: false, error: 'Notifications not supported on this system' };
  });

  ipcMain.handle('dialog:openFile', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: 'Import Notes',
      filters: [
        { name: 'JSON Files', extensions: ['json'] },
        { name: 'Text Files', extensions: ['txt'] },
        { name: 'All Files', extensions: ['*'] }
      ],
      properties: ['openFile']
    });

    if (result.canceled || result.filePaths.length === 0) {
      return { success: false, canceled: true };
    }

    const filePath = result.filePaths[0];
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      // Validate file size (max 5MB)
      const stats = fs.statSync(filePath);
      if (stats.size > 5 * 1024 * 1024) {
        return { success: false, error: 'File too large (max 5MB)' };
      }

      const ext = path.extname(filePath).toLowerCase();
      if (ext === '.json') {
        try {
          const parsed = JSON.parse(content);
          return { success: true, data: parsed, type: 'json', filename: path.basename(filePath) };
        } catch (parseErr) {
          return { success: false, error: 'Invalid JSON file format' };
        }
      } else {
        return { success: true, data: content, type: 'text', filename: path.basename(filePath) };
      }
    } catch (readErr) {
      return { success: false, error: `Could not read file: ${readErr.message}` };
    }
  });


  ipcMain.handle('dialog:saveFile', async (event, { content, defaultName }) => {
    if (!content) {
      return { success: false, error: 'No content to save' };
    }

    const result = await dialog.showSaveDialog(mainWindow, {
      title: 'Export Notes',
      defaultPath: defaultName || 'neuralverse-notes.json',
      filters: [
        { name: 'JSON Files', extensions: ['json'] },
        { name: 'Text Files', extensions: ['txt'] }
      ]
    });

    if (result.canceled) {
      return { success: false, canceled: true };
    }

    try {
      const dataToWrite = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
      fs.writeFileSync(result.filePath, dataToWrite, 'utf-8');
      return { success: true, filePath: result.filePath };
    } catch (writeErr) {
      return { success: false, error: `Could not save file: ${writeErr.message}` };
    }
  });

  // Open external URL safely
  ipcMain.handle('shell:openExternal', (event, url) => {
    if (!url || typeof url !== 'string') {
      return { success: false, error: 'Invalid URL' };
    }
    // Only allow http/https URLs
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return { success: false, error: 'Only HTTP/HTTPS URLs are allowed' };
      }
      shell.openExternal(url);
      return { success: true };
    } catch {
      return { success: false, error: 'Invalid URL format' };
    }
  });

  // Reset all data
  ipcMain.handle('data:reset', () => {
    const result1 = writeJSON(DATA_FILE, getDefaultAppData());
    const result2 = writeJSON(SETTINGS_FILE, getDefaultSettings());
    return { success: result1.success && result2.success };
  });
}



app.whenReady().then(() => {
  ensureDataFiles();
  registerIPCHandlers();
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
