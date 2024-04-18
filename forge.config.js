module.exports = {
  packagerConfig: {
    icon: './public/logo'
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {}
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        bin: 'Cheesecuts'
      }
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        bin: 'Cheesecuts'
      }
    }
  ]
};
