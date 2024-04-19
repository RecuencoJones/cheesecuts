const { Menu, ipcMain } = require('electron');
const { instances } = require('./instances');
const { viewLogs } = require('./logger');

async function createAppMenuTemplate() {
  const i18n = instances.get('i18n');

  /** @type {Array<import('electron').MenuItemConstructorOptions | import('electron'.MenuItem>} */
  const appMenu = [
    {
      role: 'fileMenu',
      submenu: [
        {
          role: 'editShortcuts',
          label: i18n.t('menu.file.editshortcuts'),
          click() {
            ipcMain.emit('editShortcuts');
          }
        }
      ]
    },
    { role: 'editMenu' },
    { role: 'viewMenu' },
    { role: 'windowMenu' },
    {
      role: 'helpMenu',
      label: 'Help',
      submenu: [
        {
          role: 'logs',
          label: i18n.t('menu.help.viewlogs'),
          click() {
            viewLogs();
          }
        },
        {
          role: 'openAppDataLocation',
          label: i18n.t('menu.help.openappdatalocation'),
          click() {
            ipcMain.emit('openAppDataLocation');
          }
        },
        {
          role: 'openInGitHub',
          label: i18n.t('menu.help.openingithub'),
          click() {
            ipcMain.emit('openGitHubRepository');
          }
        }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    appMenu.unshift({ role: 'appMenu' });
  }

  return appMenu;
}

async function setMenu() {
  const menuTemplate = await createAppMenuTemplate();

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
}

module.exports = { setMenu };
