const { resolve } = require('path');
const { readFile, stat, writeFile } = require('fs/promises');
const { load, dump } = require('js-yaml');
const edit = require('open-editor');
const { shell } = require('electron');
const { logger } = require('../logger');
const { userAppHome, projectRoot, shortcutFiles } = require('../constants');

function getDefaultConfig() {
  return {
    shortcuts: []
  };
}

async function loadShortcutsConfig() {
  let config;

  const possibleFiles = [ userAppHome, projectRoot ].map((dir) => shortcutFiles.map((file) => resolve(dir, file))).flat();

  for (const filename of possibleFiles) {
    const file = resolve(userAppHome, filename);
    logger.info(`[services.shortcuts.${ loadShortcutsConfig.name }] Attempting to read ${ file }`);

    const contents = await readFile(file, 'utf8').catch(() => {
      logger.info(`[services.shortcuts.${ loadShortcutsConfig.name }] Failed to read ${ file }. Skipping.`);
    });

    if (!contents) {
      continue;
    }

    config = load(contents);
  }

  return config || getDefaultConfig();
}

function groupShortcuts(config) {
  const groupsConfig = config.groups || [];
  let shortcutsConfig = config.shortcuts || [];

  const groups = [];

  for (const groupName of groupsConfig) {
    const group = {
      name: groupName,
      items: shortcutsConfig.filter((item) => item.group === groupName)
    };

    if (group.items.length) {
      groups.push(group);
    }

    shortcutsConfig = shortcutsConfig.filter((item) => item.group !== groupName);
  }

  const noGroup = {
    name: 'No group',
    items: shortcutsConfig
  };

  if (noGroup.items.length) {
    groups.push(noGroup);
  }

  return groups;
}

async function getShortcuts() {
  const config = await loadShortcutsConfig();

  return groupShortcuts(config);
}

async function editShortcuts() {
  const file = resolve(userAppHome, shortcutFiles[0]);

  // no hate for vi, but for some reason it is set as $EDITOR by some dependency
  // and it won't open for editing. Meh.
  if (process.env.EDITOR && process.env.EDITOR !== 'vi') {
    edit([ file ]);
  } else {
    logger.warn('[ipc.editShortcuts] EDITOR is not defined, opening folder instead');
    shell.openPath(userAppHome);

    await stat(file).catch(() => {
      writeFile(file, dump(getDefaultConfig()), 'utf8');
    });
  }
}

module.exports = { getShortcuts, editShortcuts };
