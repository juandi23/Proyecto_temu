<template>
  <div id="app">
    <!-- Botón para abrir el carrito -->
    <button class="toggle-cart-btn snipcart-checkout">
      Ver carrito
    </button>

    <!-- Contenedor para las rutas de la aplicación -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    if (window.Snipcart) {
      // Escuchar eventos de Snipcart para depuración
      window.Snipcart.events.on('cart.updated', (cart) => {
        console.log('Carrito actualizado:', cart);
      });
    } else {
      console.error('Snipcart no está disponible.');
    }
  },
};
</script>

<style>
/* Estilos para el botón del carrito */
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

#app {
  font-family: Arial, sans-serif;
}
</style>
