const { ipcMain, shell } = require('electron');
const { useShortcutsHandler } = require('./handlers/shortcuts');
const { userAppHome } = require('./constants');

const openGitHubRepository = () => shell.openExternal('https://github.com/RecuencoJones/cheesecuts');
const openAppDataLocation = () => shell.openPath(userAppHome);

function registerIpcHandlers() {
  useShortcutsHandler(ipcMain);

  ipcMain.on('openGitHubRepository', openGitHubRepository);
  ipcMain.handle('openGitHubRepository', openGitHubRepository);
  ipcMain.on('openAppDataLocation', openAppDataLocation);
  ipcMain.handle('openAppDataLocation', openAppDataLocation);
}

module.exports = { registerIpcHandlers };
