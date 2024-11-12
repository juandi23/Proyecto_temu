<template>
  <div class="cart-sidebar" v-if="isOpen">
    <!-- Contenido del carrito -->
    <div class="cart-header">
      <h2>Subtotal: {{ cartTotal }} COP</h2>
      <button class="checkout-btn snipcart-checkout" @click="syncCartWithSnipcart">Hacer pedido</button>
    </div>
    <div class="cart-items">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image || 'https://via.placeholder.com/80'" alt="Imagen del producto" class="item-image" />
        <div class="item-details">
          <h3 class="item-name">{{ item.title }}</h3>
          <p class="item-price">{{ (item.price * item.quantity).toFixed(2) }} COP</p>
          <div class="quantity-controls">
            <button @click="decreaseQuantity(item)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)">+</button>
          </div>
        </div>
        <button @click="removeFromCart(item.id)" class="remove-btn">Eliminar</button>
      </div>
    </div>
    <div class="cart-summary">
      <p>Envío gratis en cada pedido</p>
      <p>Total: {{ cartTotal }} COP</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const cartItems = ref([]);

    // Cargar el carrito desde localStorage
    onMounted(() => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          cartItems.value = JSON.parse(savedCart);
        }
      } catch (error) {
        console.error('Error al cargar el carrito desde localStorage:', error);
      }
    });

    // Función para guardar el carrito en localStorage
    const guardarCarrito = () => {
      try {
        localStorage.setItem('cart', JSON.stringify(cartItems.value));
      } catch (error) {
        console.error('Error al guardar el carrito en localStorage:', error);
      }
    };

    // Watch para actualizar el carrito en localStorage
    watch(cartItems, guardarCarrito, { deep: true });

    // Calcular el total del carrito
    const cartTotal = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    });

    // Función para sincronizar el carrito con Snipcart
    const syncCartWithSnipcart = () => {
  try {
    if (window.Snipcart && window.Snipcart.api && typeof window.Snipcart.api.theme.cart.open === 'function') {
      if (!window.location.href.includes('/cart')) {
        window.Snipcart.api.theme.cart.open(); // Abre el carrito usando la API de Snipcart
      } else {
        console.log('Ya estás en la página del carrito. No es necesario navegar de nuevo.');
      }
    } else {
      console.error('La API de Snipcart no está disponible o no está cargada completamente.');
    }
  } catch (error) {
    console.error('Error al mostrar el carrito:', error);
  }
};



    // Funciones de manejo de la cantidad
    const increaseQuantity = (item) => {
      const cartItem = cartItems.value.find(cartItem => cartItem.id === item.id);
      if (cartItem) {
        cartItem.quantity += 1;
        guardarCarrito();
      }
    };

    const decreaseQuantity = (item) => {
      const cartItem = cartItems.value.find(cartItem => cartItem.id === item.id);
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        guardarCarrito();
      } else if (cartItem && cartItem.quantity === 1) {
        removeFromCart(item.id);
      }
    };

    const removeFromCart = (itemId) => {
      cartItems.value = cartItems.value.filter(item => item.id !== itemId);
      guardarCarrito();
    };

    return {
      cartItems,
      increaseQuantity,
      decreaseQuantity,
      cartTotal,
      syncCartWithSnipcart,
      removeFromCart,
    };
  },
};
</script>



  <style scoped>
  .cart-sidebar {
    position: fixed;
    right: 0;
    top: 0;
    width: 300px;
    height: 100vh;
    background-color: #fff;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
    overflow-y: auto;
    z-index: 1000;
  }
  
  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .checkout-btn {
    background-color: #ff7001;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }
  
  .cart-items {
    margin-bottom: 20px;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .item-image {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    margin-right: 15px;
  }
  
  .item-details {
    flex: 1;
  }
  
  .item-name {
    font-size: 1em;
    margin: 0;
  }
  
  .item-price {
    font-size: 0.9em;
    color: #555;
  }
  
  .quantity-controls {
    display: flex;
    align-items: center;
    margin-top: 5px;
  }
  
  .quantity-controls button {
    background: none;
    border: 1px solid #ccc;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .remove-btn {
    background: none;
    border: none;
    color: #ff5252;
    cursor: pointer;
    font-size: 0.8em;
    margin-left: 10px;
  }
  
  .cart-summary {
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
    font-size: 0.9em;
  }
  
  .cart-summary p {
    margin: 5px 0;
  }
  </style>
  