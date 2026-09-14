const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('updater', {
  // Ações
  getVersion: () => ipcRenderer.invoke('get-version'),
  checkForUpdates: () => ipcRenderer.send('check-updates'),
  download: () => ipcRenderer.send('download-update'),
  install: () => ipcRenderer.send('install-update'),
  notify: (title, body) => ipcRenderer.invoke('notify', { title, body }),

  // Eventos (callbacks)
  onChecking: (cb) => ipcRenderer.on('update-checking', () => cb()),
  onAvailable: (cb) => ipcRenderer.on('update-available', (_, info) => cb(info)),
  onProgress: (cb) => ipcRenderer.on('update-progress', (_, p) => cb(p)),
  onDownloaded: (cb) => ipcRenderer.on('update-downloaded', (_, v) => cb(v)),
  onError: (cb) => ipcRenderer.on('update-error', (_, msg) => cb(msg)),
  onNone: (cb) => ipcRenderer.on('update-none', (_, v) => cb(v)),
});