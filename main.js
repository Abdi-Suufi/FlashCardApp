const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');

const store = new Store();

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'hidden',
    frame: false,
  });

  // Load the index.html file
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

// Handle IPC communication for flashcards
ipcMain.handle('get-cards', () => {
  return store.get('flashcards', []);
});

ipcMain.on('save-card', (event, card) => {
  const cards = store.get('flashcards', []);
  store.set('flashcards', [...cards, card]);
});

ipcMain.on('delete-card', (event, cardId) => {
  const cards = store.get('flashcards', []);
  store.set('flashcards', cards.filter(card => card.id !== cardId));
});

ipcMain.on('update-card', (event, updatedCard) => {
  const cards = store.get('flashcards', []);
  store.set('flashcards', cards.map(card => 
    card.id === updatedCard.id ? updatedCard : card
  ));
});

// Window control handlers
ipcMain.on('minimize-window', () => {
  const window = BrowserWindow.getFocusedWindow();
  if (window) window.minimize();
});

ipcMain.on('close-window', () => {
  const window = BrowserWindow.getFocusedWindow();
  if (window) window.close();
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
}); 