const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  getCards: () => ipcRenderer.invoke('get-cards'),
  saveCard: (card) => ipcRenderer.send('save-card', card),
  deleteCard: (cardId) => ipcRenderer.send('delete-card', cardId),
  updateCard: (card) => ipcRenderer.send('update-card', card),
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),

  getCategories: () => ipcRenderer.invoke('get-categories'),
  saveCategory: (category) => ipcRenderer.send('save-category', category),
  deleteCategory: (categoryId) => ipcRenderer.send('delete-category', categoryId),
  updateCategory: (category) => ipcRenderer.send('update-category', category)
}); 