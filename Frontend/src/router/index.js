import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import Home_Sesion from '@/views/Home_Sesion.vue';
import ViewMasVendidos from '@/views/ViewMasVendidos.vue';
import ViewCincoEstrellas from '@/views/ViewCincoEstrellas.vue';
import ViewAmorAmistad from '@/views/ViewAmorAmistad.vue';
import ViewRecienLlegados from '@/views/ViewRecienLlegados.vue';
import ViewAyuda from '@/views/ViewAyuda.vue';
import ResetPasswordView from '../views/ResetPasswordView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import PrivacyPolicy from '@/views/PrivacyPolicy.vue';
import TermsOfUse from '@/views/TermsOfUse.vue';
import ViewPerfil from '@/views/ViewPerfil.vue';


const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/HomeSesion', component: Home_Sesion },
  { path: '/MasVendidos', component: ViewMasVendidos },
  { path: '/CincoEstrellas', component: ViewCincoEstrellas },
  { path: '/Descuentos', component: ViewAmorAmistad },
  { path: '/RecienLlegados', component: ViewRecienLlegados },
  { path: '/Ayuda', component: ViewAyuda },
  { path: '/reset-password/:token', component: ResetPasswordView, name: 'ResetPassword' },
  { path: '/product/:id', component: ProductDetailView, name: 'ProductDetail', props: true }, 
  { path: '/terminos-de-uso', component: TermsOfUse, name: 'TermsOfUse' },
  { path: '/politica-de-privacidad', component: PrivacyPolicy, name: 'PrivacyPolicy' }, 
  { path: '/perfil', component: ViewPerfil, name: 'ViewPerfil' },
  
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
