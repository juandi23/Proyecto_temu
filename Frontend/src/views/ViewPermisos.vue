<template>
    <div>
      <MainHeader />
      <MainBanner />
      <TheFooter />
    </div>
  </template>
  
  <script>
  import MainHeader from '../components/MainHeaderSesion.vue';
  import MainBanner from '../components/BannerPermisos.vue';

  import TheFooter from '../components/TheFooter.vue';
  
  export default {
    name: 'ViewPermisos',
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
  