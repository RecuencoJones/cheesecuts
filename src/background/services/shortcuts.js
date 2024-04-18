const { resolve } = require('path');
const { readFile } = require('fs/promises');
const { logger } = require('../logger');
const { userAppHome, projectRoot, shortcutsFiles } = require('../constants');
const { load } = require('js-yaml');

function getDefaultConfig() {
  return {
    shortcuts: []
  };
}

async function loadShortcutsConfig() {
  let config;

  const possibleFiles = [ userAppHome, projectRoot ].map((dir) => shortcutsFiles.map((file) => resolve(dir, file))).flat();

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

module.exports = { getShortcuts };
