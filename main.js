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

ipcMain.handle('get-categories', () => {
  return store.get('categories', []);
});

ipcMain.on('save-category', (event, category) => {
  const categories = store.get('categories', []);
  store.set('categories', [...categories, category]);
});

ipcMain.on('delete-category', (event, categoryId) => {
  const categories = store.get('categories', []);
  store.set('categories', categories.filter(category => category.id !== categoryId));
  
  // Also delete or reassign associated cards
  const cards = store.get('flashcards', []);
  store.set('flashcards', cards.filter(card => card.categoryId !== categoryId));
});

ipcMain.on('update-category', (event, updatedCategory) => {
  const categories = store.get('categories', []);
  store.set('categories', categories.map(category => 
    category.id === updatedCategory.id ? updatedCategory : category
  ));
});

// Handle IPC communication for flashcards
ipcMain.handle('get-cards', (event, categoryId) => {
  const cards = store.get('flashcards', []);
  
  // Check if categoryId is null, undefined, or empty string to show all cards
  if (categoryId === null || categoryId === undefined || categoryId === '') {
    return cards;
  }
  
  // Otherwise, strictly filter by the specified categoryId
  return cards.filter(card => card.categoryId === categoryId);
});

// Make sure save-card is correctly handling the categoryId:
ipcMain.on('save-card', (event, card) => {
  const cards = store.get('flashcards', []);
  // Ensure card has categoryId (even if it's an empty string for "Uncategorized")
  const cardToSave = {
    ...card,
    categoryId: card.categoryId || '' // Default to empty string if not specified
  };
  store.set('flashcards', [...cards, cardToSave]);
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