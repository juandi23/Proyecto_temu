// Archivo: src/composables/useCart.js
import { ref, computed } from 'vue';
import { useEventBus } from '@vueuse/core';

const cartItems = ref([]);
const cartUpdatesBus = useEventBus('cart-updates'); // Creamos una instancia específica del bus de eventos

// Cargar el carrito desde localStorage al iniciar
const savedCart = localStorage.getItem('cart');
if (savedCart) {
  cartItems.value = JSON.parse(savedCart);
}

// Función para guardar el carrito en localStorage y emitir el evento
function guardarCarrito() {
  localStorage.setItem('cart', JSON.stringify(cartItems.value));
  cartUpdatesBus.emit('update-cart', { cartItems: cartItems.value }); // Emitir el estado actualizado del carrito
}

export function useCart() {
  const addToCart = (product) => {
    const existingProduct = cartItems.value.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cartItems.value.push({ ...product, quantity: 1 });
    }
    guardarCarrito(); // Guardar el carrito después de cada cambio
  };

  const removeFromCart = (productId) => {
    cartItems.value = cartItems.value.filter(item => item.id !== productId);
    guardarCarrito();
  };

  const increaseQuantity = (product) => {
    const existingProduct = cartItems.value.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      guardarCarrito();
    }
  };

  const decreaseQuantity = (product) => {
    const existingProduct = cartItems.value.find(item => item.id === product.id);
    if (existingProduct && existingProduct.quantity > 1) {
      existingProduct.quantity -= 1;
      guardarCarrito();
    } else if (existingProduct && existingProduct.quantity === 1) {
      removeFromCart(product.id);
    }
  };

  const cartTotal = computed(() =>
    cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
  );

  return {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
  };
}
