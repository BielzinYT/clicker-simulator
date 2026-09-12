const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

// ===== CONFIGURAÇÃO DO AUTO-UPDATER =====
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.autoDownload = false;          // Não descarrega sozinho — o user decide
autoUpdater.autoInstallOnAppQuit = true;   // Instala ao fechar, se já descarregou

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    title: '🐾 Clicker Simulator',
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

// ===== EVENTOS DO AUTO-UPDATER =====
// 1) Nova versão disponível
autoUpdater.on('update-available', (info) => {
  log.info('Nova versão disponível:', info.version);
  if (mainWindow) {
    mainWindow.webContents.send('update:available', {
      version: info.version,
      releaseNotes: info.releaseNotes || 'Sem notas de lançamento.',
      releaseDate: info.releaseDate,
    });
  }
});

// 2) Sem atualizações
autoUpdater.on('update-not-available', () => {
  log.info('A app está atualizada.');
  if (mainWindow) mainWindow.webContents.send('update:none');
});

// 3) Progresso do download
autoUpdater.on('download-progress', (progress) => {
  if (mainWindow) {
    mainWindow.webContents.send('update:progress', {
      percent: Math.round(progress.percent),
      bytesPerSecond: progress.bytesPerSecond,
      transferred: progress.transferred,
      total: progress.total,
    });
  }
});

// 4) Download concluído
autoUpdater.on('update-downloaded', (info) => {
  log.info('Atualização descarregada:', info.version);
  if (mainWindow) mainWindow.webContents.send('update:downloaded', info.version);
});

// 5) Erro
autoUpdater.on('error', (err) => {
  log.error('Erro no updater:', err);
  if (mainWindow) {
    mainWindow.webContents.send('update:error', err.message || String(err));
  }
});

// ===== IPC (comunicação com o renderer) =====
ipcMain.handle('update:check',    () => autoUpdater.checkForUpdates());
ipcMain.handle('update:download', () => autoUpdater.downloadUpdate());
ipcMain.handle('update:install',  () => autoUpdater.quitAndInstall());
ipcMain.handle('app:version',     () => app.getVersion());

// ===== ARRANQUE =====
app.whenReady().then(() => {
  createWindow();

  // Só verifica updates em produção (não em `npm start` de dev)
  if (app.isPackaged) {
    // Verifica 3 segundos depois de abrir (deixa o jogo carregar)
    setTimeout(() => {
      autoUpdater.checkForUpdates().catch(err => log.error('Check falhou:', err));
    }, 3000);

    // Verifica a cada 4 horas
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