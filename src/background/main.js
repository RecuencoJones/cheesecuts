const { resolve } = require('path');
const { app, BrowserWindow } = require('electron');
const { registerIpcHandlers } = require('./ipc');
const { isDevelopment } = require('./constants');
const { setMenu } = require('./menu');
const { instances } = require('./instances');
const { initLanguages } = require('./services/languages');
const { logger } = require('./logger');

if (require('electron-squirrel-startup')) {
  app.quit();
}

if (process.platform === 'darwin') {
  require('fix-path')();
}

function createWindow() {
  const window = new BrowserWindow({
    webPreferences: {
      preload: resolve(__dirname, 'preload.js')
    }
  });

  if (isDevelopment) {
    logger.info('[main] running in dev mode');
    window.loadURL('http://localhost:5173');
    window.webContents.openDevTools({ mode: 'detach' });
  } else {
    const productionHtml = resolve(__dirname, '..', '..', 'dist', 'index.html');
    window.loadFile(productionHtml);
  }

  instances.set('appWindow', window);
}

function attachToProcessEvents() {
  ['unhandledRejection', 'uncaughtException'].map((type) => {
    process.on(type, async (error) => {
      logger.error(error.stack);
    });
  });
}

async function main() {
  logger.info('[main] starting Cheesecuts...');
  logger.info('[main] app version: ' + app.getVersion());
  logger.info('[main] node version: ' + process.versions.node);
  logger.info('[main] electron version: ' + process.versions.electron);
  logger.info('[main] platform: ' + process.platform + ' ' + process.arch);

  attachToProcessEvents();

  await app.whenReady();
  await initLanguages();
  await setMenu();

  registerIpcHandlers();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}

app.on('window-all-closed', () => {
  app.quit();
});

main();
