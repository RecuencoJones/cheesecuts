const { logger } = require('../logger');
const { getShortcuts, editShortcuts } = require('../services/shortcuts');

/**
 * @param {import('electron').IpcMain} ipc bus
 */
function useShortcutsHandler(ipc) {
  ipc.handle('getShortcuts', async () => {
    logger.info('[ipc.getShortcuts] Get shortcuts');
    const groups = await getShortcuts();

    return groups;
  });

  ipc.handle('editShortcuts', async () => {
    logger.info('[ipc.editShortcuts] Edit shortcuts');

    await editShortcuts();
  });
}

module.exports = { useShortcutsHandler };
