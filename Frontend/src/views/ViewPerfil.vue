<template>
    <div>
      <MainHeader />
      <MainBanner />
      <TheFooter />
    </div>
  </template>
  
  <script>
  import MainHeader from '../components/MainHeaderSesion.vue';
  import MainBanner from '../components/BannerPerfil.vue';

  import TheFooter from '../components/TheFooter.vue';
  
  export default {
    name: 'ViewPerfil',
    components: {
      MainHeader,
      MainBanner,
      TheFooter
    }
  }
  </script>
  
  <style>
  /* Estilos para la vista Home */
  </style>
  