<template>
  <div id="app">
    <button @click="isCartOpen = !isCartOpen" class="toggle-cart-btn">🛒 Toggle Carrito</button>
    <router-view></router-view>
    <CartSidebar :isOpen="isCartOpen" />
  </div>
</template>

<script>
import CartSidebar from '@/components/CartSidebar.vue';

export default {
  name: 'App',
  components: {
    CartSidebar
  },
  data() {
    return {
      isCartOpen: false // Controla la visibilidad del carrito
    };
  }
};
</script>

<style>
/* Estilos globales para tu aplicación */
.toggle-cart-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #ff7001;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
