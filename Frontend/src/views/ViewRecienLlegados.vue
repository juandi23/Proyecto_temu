<template>
  <div>
    <MainHeader />
    <ProductGrid :categoryId="2" />
    <TheFooter />
  </div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue';
import ProductGrid from '../components/ProductGrid.vue';
import TheFooter from '../components/TheFooter.vue';

export default {
  name: 'ViewRecienLlegados',
  components: {
    MainHeader,
    ProductGrid,
    TheFooter
  }
}
</script>

<style scoped>
/* Estilos específicos para la vista si es necesario */
</style>
