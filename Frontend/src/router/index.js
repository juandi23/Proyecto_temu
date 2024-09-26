import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import Home_Sesion from '@/views/Home_Sesion.vue';
import ViewMasVendidos from '@/views/ViewMasVendidos.vue';
import ViewCincoEstrellas from '@/views/ViewCincoEstrellas.vue';
import ViewAmorAmistad from '@/views/ViewAmorAmistad.vue';
import ViewRecienLlegados from '@/views/ViewRecienLlegados.vue';
import ViewAyuda from '@/views/ViewAyuda.vue';


const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/HomeSesion', component: Home_Sesion },
  { path: '/MasVendidos', component: ViewMasVendidos },
  { path: '/CincoEstrellas', component: ViewCincoEstrellas },
  { path: '/AmoryAmistad', component: ViewAmorAmistad },
  { path: '/RecienLlegados', component: ViewRecienLlegados },
  { path: '/Ayuda', component: ViewAyuda }


];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
