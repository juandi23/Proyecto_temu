<template>
  <div id="app" :class="{ 'cart-open': isCartOpen }">
    <button @click="isCartOpen = !isCartOpen" class="toggle-cart-btn">🛒Carrito de Compras</button>
    <router-view></router-view>
    <CartSidebar :isOpen="isCartOpen" @update:isOpen="isCartOpen = false" />
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
      isCartOpen: false
    };
  }
};
</script>

<style>
/* Estilos para mostrar el carrito al lado del contenido */
#app.cart-open {
  margin-right: 350px; /* Debe coincidir con el ancho del carrito */
  transition: margin-right 0.3s ease;
}

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
  z-index: 2000;
}
</style>
