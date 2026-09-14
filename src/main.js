const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

// ============ CONFIG LOG ============
log.transports.file.level = 'info';
log.transports.console.level = 'info';
log.transports.file.maxSize = 5 * 1024 * 1024; // 5 MB
log.transports.file.resolvePathFn = () =>
  path.join(app.getPath('userData'), 'logs', 'main.log');

// Auto-updater logging
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

// Auto-update: não descarregar automaticamente (deixamos o renderer controlar)
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

let mainWindow = null;

// ============ WINDOW ============
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 600,
    icon: path.join(__dirname, '../assets/icon.ico'),
    autoHideMenuBar: true,
    backgroundColor: '#080c18',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ============ AUTO-UPDATE ============
function setupAutoUpdater() {
  autoUpdater.on('checking-for-update', () => {
    log.info('🔍 A verificar atualizações...');
    sendToRenderer('update-checking');
  });

  autoUpdater.on('update-available', (info) => {
    log.info('🆕 Atualização disponível:', info.version);
    sendToRenderer('update-available', {
      version: info.version,
      releaseNotes: info.releaseNotes || '',
      releaseDate: info.releaseDate || '',
    });
  });

  autoUpdater.on('update-not-available', (info) => {
    log.info('✅ App atualizada:', info.version);
    sendToRenderer('update-none', info.version);
  });

  autoUpdater.on('error', (err) => {
    log.error('❌ Erro no auto-update:', err);
    sendToRenderer('update-error', err.message || String(err));
  });

  autoUpdater.on('download-progress', (p) => {
    log.info(`📥 Download: ${p.percent.toFixed(1)}%`);
    sendToRenderer('update-progress', {
      percent: Math.floor(p.percent),
      bytesPerSecond: p.bytesPerSecond,
      transferred: p.transferred,
      total: p.total,
    });
  });

  autoUpdater.on('update-downloaded', (info) => {
    log.info('✅ Atualização descarregada:', info.version);
    sendToRenderer('update-downloaded', info.version);
  });
}

function sendToRenderer(channel, payload) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send(channel, payload);
  }
}

// ============ IPC ============
function setupIPC() {
  ipcMain.handle('get-version', () => app.getVersion());

  ipcMain.handle('notify', (_, { title, body }) => {
    try {
      if (Notification.isSupported()) {
        const n = new Notification({ title, body, icon: path.join(__dirname, '../assets/icon.ico') });
        n.on('click', () => {
          if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
          }
        });
        n.show();
        return true;
      }
    } catch (e) {
      log.error('Erro ao mostrar notificação:', e);
    }
    return false;
  });

  ipcMain.on('check-updates', () => {
    try { autoUpdater.checkForUpdates(); } catch (e) { log.error(e); }
  });

  ipcMain.on('download-update', () => {
    try { autoUpdater.downloadUpdate(); } catch (e) { log.error(e); }
  });

  ipcMain.on('install-update', () => {
    try { autoUpdater.quitAndInstall(false, true); } catch (e) { log.error(e); }
  });
}

// ============ LIFE CYCLE ============
app.whenReady().then(() => {
  log.info('🚀 App iniciada — versão', app.getVersion());

  setupAutoUpdater();
  setupIPC();
  createWindow();

  // Verifica updates 10s depois do arranque
  if (app.isPackaged) {
    setTimeout(() => {
      autoUpdater.checkForUpdates().catch((e) => log.error('check falhou:', e));
    }, 10000);

    // Verifica a cada 30 min
    setInterval(() => {
      autoUpdater.checkForUpdates().catch(() => {});
    }, 30 * 60 * 1000);
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

process.on('uncaughtException', (err) => {
  log.error('💥 Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason) => {
  log.error('💥 Unhandled Rejection:', reason);
});