<template>
    <div>
      <MainHeader />
      <MainBanner />
      <TheFooter />
    </div>
  </template>
  
  <script>
  import MainHeader from '../components/MainHeaderSesion.vue';
  import MainBanner from '../components/BannerProveedores.vue';

  import TheFooter from '../components/TheFooter.vue';
  
  export default {
    name: 'ViewProveedores.vue',
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
  