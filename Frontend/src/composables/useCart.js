import { ref } from 'vue';

// Estado global del carrito
const cartItems = ref([]);

// Cargar el carrito desde localStorage al iniciar
const savedCart = localStorage.getItem('cart');
if (savedCart) {
  try {
    const parsedCart = JSON.parse(savedCart);
    if (Array.isArray(parsedCart)) {
      cartItems.value = parsedCart;
    }
  } catch (error) {
    console.error('Error al parsear el carrito de localStorage:', error);
  }
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('cart', JSON.stringify(cartItems.value));
  console.log('Carrito guardado y actualizado:', cartItems.value);
}

export function useCart() {
  const addToCart = (product) => {
    const existingProduct = cartItems.value.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cartItems.value.push({ ...product, quantity: 1 });
    }
    guardarCarrito();
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

  return {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  };
}
