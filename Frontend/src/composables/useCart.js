// Archivo: src/composables/useCart.js
import { ref, computed } from 'vue';
import { useEventBus } from '@vueuse/core'; // Asegúrate de tener @vueuse/core instalado

const cartItems = ref([]);
const eventBus = useEventBus(); // Configuración del bus de eventos

export function useCart() {
  const addToCart = (product) => {
    // Verificar si el producto ya está en el carrito
    const existingProduct = cartItems.value.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cartItems.value.push({ ...product, quantity: 1 });
    }
    // Emitir un evento cuando se añade un producto al carrito
    eventBus.emit('product-added', product);
  };

  const removeFromCart = (productId) => {
    cartItems.value = cartItems.value.filter(item => item.id !== productId);
  };

  const increaseQuantity = (product) => {
    const existingProduct = cartItems.value.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    }
  };

  const decreaseQuantity = (product) => {
    const existingProduct = cartItems.value.find(item => item.id === product.id);
    if (existingProduct && existingProduct.quantity > 1) {
      existingProduct.quantity -= 1;
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
    cartTotal
  };
}
