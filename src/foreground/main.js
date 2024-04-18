import { createApp } from 'vue';
import App from './App.vue';
import { initI18n } from './languages';
import 'bootstrap-icons/font/bootstrap-icons.css';

async function main() {
  const app = createApp(App);

  const i18n = await initI18n();

  app.use(i18n);

  app.mount('#app');
}

main();
