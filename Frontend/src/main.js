import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/js/dist/dropdown.js';
import 'bootstrap';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { createI18n } from 'vue-i18n';

import 'bootstrap/dist/css/bootstrap.min.css';

// Definir los mensajes de traducción
const messages = {
  en: {
    welcome: 'Welcome',
    help_text: 'This is the help section'
  },
  es: {
    welcome: 'Bienvenido',
    help_text: 'Esta es la sección de ayuda'
  }
};

// Crear instancia de i18n
const i18n = createI18n({
  locale: 'en', // Idioma por defecto
  fallbackLocale: 'en', // Idioma de respaldo
  messages,
});

const app = createApp(App);
app.use(router);
app.use(store);
app.use(i18n);
app.mount('#app');
