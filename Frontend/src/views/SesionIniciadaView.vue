<template>
    <div>
      <MainHeader />
      <BannerSesionIniciada />
      <ProductGrid />
      <TheFooter />
    </div>
  </template>
  
  <script>
  import MainHeader from '../components/MainHeader.vue';
  import BannerSesionIniciada from '../components/BannerSesionIniciada.vue';
  import ProductGrid from '../components/ProductGrid.vue';
  import TheFooter from '../components/TheFooter.vue';
  
  export default {
    name: 'Home',
    components: {
      MainHeader,
      BannerSesionIniciada,
      ProductGrid,
      TheFooter
    }
  }
  </script>
  
  <style>
  /* Estilos para la vista Home */
  </style>
  