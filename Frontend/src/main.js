import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Importar Bootstrap CSS y JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
