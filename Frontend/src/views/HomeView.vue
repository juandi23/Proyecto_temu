<template>
  <div>
    <MainHeader />
    <MainBanner />
    <!-- Agrega un evento al ProductGrid para abrir el modal con el producto seleccionado -->
    <ProductGrid @product-click="openProductDetail" />
    
    <div style="text-align: center; margin-top: 20px;">
      <GeoMap />
    </div>
    
    <TheFooter />

    <!-- Modal para mostrar el detalle del producto -->
    <ProductDetailModal
      :isVisible="isModalVisible"
      :product="selectedProduct"
      @close="isModalVisible = false"
    />
  </div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue';
import MainBanner from '../components/MainBanner.vue';
import ProductGrid from '../components/ProductGrid.vue';
import TheFooter from '../components/TheFooter.vue';
import GeoMap from '../components/GeoMap.vue';
import ProductDetailModal from '../components/ProductDetailModal.vue'; // Importa el componente modal

export default {
  name: 'Home',
  components: {
    MainHeader,
    MainBanner,
    ProductGrid,
    GeoMap,
    TheFooter,
    ProductDetailModal
  },
  data() {
    return {
      isModalVisible: false, // Estado para controlar la visibilidad del modal
      selectedProduct: null // Almacena el producto seleccionado para mostrar en el modal
    };
  },
  methods: {
    openProductDetail(product) {
      this.selectedProduct = product; // Guarda el producto seleccionado
      this.isModalVisible = true; // Muestra el modal
    }
  }
}
</script>

<style>
/* Estilos generales para la vista Home */
</style>
