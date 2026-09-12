const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('updater', {
  // Auto-update
  check:      () => ipcRenderer.invoke('update:check'),
  download:   () => ipcRenderer.invoke('update:download'),
  install:    () => ipcRenderer.invoke('update:install'),
  getVersion: () => ipcRenderer.invoke('app:version'),
  onAvailable:  (cb) => ipcRenderer.on('update:available',  (_e, info) => cb(info)),
  onNone:       (cb) => ipcRenderer.on('update:none',       () => cb()),
  onProgress:   (cb) => ipcRenderer.on('update:progress',   (_e, p)   => cb(p)),
  onDownloaded: (cb) => ipcRenderer.on('update:downloaded', (_e, v)   => cb(v)),
  onError:      (cb) => ipcRenderer.on('update:error',      (_e, msg) => cb(msg)),

  // Notificações nativas
  notify: (title, body) => ipcRenderer.invoke('notify:show', { title, body }),
});