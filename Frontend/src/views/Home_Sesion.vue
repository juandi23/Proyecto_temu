<template>
  <div>
    <MainHeader />
    <MainBanner />
    <ProductGrid />
    <TheFooter />
  </div>
</template>

<script>
import MainHeader from '../components/MainHeaderSesion.vue';
import MainBanner from '../components/BannerSesionIniciada.vue';
import ProductGrid from '../components/ProductGrid.vue';
import TheFooter from '../components/TheFooter.vue';

export default {
  name: 'Home',
  components: {
    MainHeader,
    MainBanner,
    ProductGrid,
    TheFooter
  }
}
</script>

<style>
/* Estilos para la vista Home */
</style>
