const i18next = require('i18next');
const { instances } = require('../instances');
const en = require('../../languages/en.json');

async function initLanguages() {
  await i18next.init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: { translation: en }
    }
  });

  instances.set('i18n', i18next);
}

module.exports = { initLanguages };
