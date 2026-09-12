const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    title: 'Clicker Simulator',
    backgroundColor: '#0a0f1e',
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile('index.html');
}

// ===== AUTO-UPDATER =====
autoUpdater.on('update-available', (info) => {
  if (mainWindow) mainWindow.webContents.send('update:available', {
    version: info.version,
    releaseNotes: info.releaseNotes || 'Sem notas de lançamento.',
    releaseDate: info.releaseDate,
  });
});
autoUpdater.on('update-not-available', () => {
  if (mainWindow) mainWindow.webContents.send('update:none');
});
autoUpdater.on('download-progress', (progress) => {
  if (mainWindow) mainWindow.webContents.send('update:progress', {
    percent: Math.round(progress.percent),
    bytesPerSecond: progress.bytesPerSecond,
    transferred: progress.transferred,
    total: progress.total,
  });
});
autoUpdater.on('update-downloaded', (info) => {
  if (mainWindow) mainWindow.webContents.send('update:downloaded', info.version);
});
autoUpdater.on('error', (err) => {
  if (mainWindow) mainWindow.webContents.send('update:error', err.message || String(err));
});

// ===== IPC =====
ipcMain.handle('update:check',    () => autoUpdater.checkForUpdates());
ipcMain.handle('update:download', () => autoUpdater.downloadUpdate());
ipcMain.handle('update:install',  () => autoUpdater.quitAndInstall());
ipcMain.handle('app:version',     () => app.getVersion());

// ===== NOTIFICAÇÕES NATIVAS DO WINDOWS =====
ipcMain.handle('notify:show', (event, { title, body }) => {
  try {
    if (!Notification.isSupported()) {
      log.warn('Notificações não suportadas neste sistema');
      return false;
    }
    const notif = new Notification({
      title: String(title || 'Clicker Simulator').slice(0, 64),
      body: String(body || '').slice(0, 256),
      icon: path.join(__dirname, 'icon.ico'),
      silent: false,
    });
    notif.on('click', () => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
      }
    });
    notif.show();
    return true;
  } catch (e) {
    log.error('Erro ao mostrar notificação:', e);
    return false;
  }
});

// ===== ARRANQUE =====
app.whenReady().then(() => {
  createWindow();

  if (app.isPackaged) {
    setTimeout(() => {
      autoUpdater.checkForUpdates().catch(err => log.error('Check falhou:', err));
    }, 3000);

    setInterval(() => {
      autoUpdater.checkForUpdates().catch(err => log.error('Check falhou:', err));
    }, 4 * 60 * 60 * 1000);
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});