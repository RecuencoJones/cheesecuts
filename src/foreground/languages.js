import { createI18n } from 'vue-i18n';
import en from '../languages/en.json';

export const languages = [
  {
    name: 'English',
    code: 'en',
    default: true
  }
];

export async function initI18n() {
  const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
      en
    }
  });

  return i18n;
}
