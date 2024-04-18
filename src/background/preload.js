const { contextBridge, ipcRenderer } = require('electron');

const invokify = (name) => (...args) => ipcRenderer.invoke(name, ...args);

const useLiteralInvokify = (...args) => args.reduce((accum, next) => ({
  [next]: invokify(next),
  ...accum
}), {});

contextBridge.exposeInMainWorld('os', process.platform);

contextBridge.exposeInMainWorld('api', {
  ...useLiteralInvokify(
    'getShortcuts'
  )
});
