const { homedir } = require('os');
const { resolve } = require('path');

const isDevelopment = process.env.MODE === 'development';
const userAppHome = resolve(homedir(), '.cheesecuts');
const projectRoot = resolve(__dirname, '..', '..');
const shortcutFiles = [ 'shortcuts.yaml', 'shortcuts.yml' ];
const logFile = 'log.txt';

module.exports = { isDevelopment, userAppHome, projectRoot, shortcutsFiles: shortcutFiles, logFile };
