import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import Home_Sesion from '@/views/Home_Sesion.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/HomeSesion', component: Home_Sesion },

];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
