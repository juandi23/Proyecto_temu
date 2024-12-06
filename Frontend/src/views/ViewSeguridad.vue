<template>
    <div>
      <MainHeader />
      <MainBanner />
      <TheFooter />
    </div>
  </template>
  
  <script>
  import MainHeader from '../components/MainHeaderSesion.vue';
  import MainBanner from '../components/BannerSeguridad.vue';

  import TheFooter from '../components/TheFooter.vue';
  
  export default {
    name: 'ViewSeguridad',
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
  