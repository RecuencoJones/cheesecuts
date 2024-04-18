const { logger } = require('../logger');
const { getShortcuts } = require('../services/shortcuts');

/**
 * @param {import('electron').IpcMain} ipc bus
 */
function useShortcutsHandler(ipc) {
  ipc.handle('getShortcuts', async () => {
    logger.info('[ipc] Get shortcuts');
    const groups = await getShortcuts();

    return groups;
  });
}

module.exports = { useShortcutsHandler };
