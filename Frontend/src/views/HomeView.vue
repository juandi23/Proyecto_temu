<template>
  <div>
    <MainHeader />
    <MainBanner />
    <ProductGrid />
    <div style="text-align: center; margin-top: 20px;"> <!-- Ajusta el margen superior aquí -->
      <GeoMap /> <!-- Asegúrate de que el componente GeoMap esté en el lugar deseado -->
    </div>
    <TheFooter />
  </div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue';
import MainBanner from '../components/MainBanner.vue';
import ProductGrid from '../components/ProductGrid.vue';
import TheFooter from '../components/TheFooter.vue';
import GeoMap from '../components/GeoMap.vue';

export default {
  name: 'Home',
  components: {
    MainHeader,
    MainBanner,
    ProductGrid,
    GeoMap,
    TheFooter
  }
}
</script>

<style>
/* Estilos generales para la vista Home */
</style>
