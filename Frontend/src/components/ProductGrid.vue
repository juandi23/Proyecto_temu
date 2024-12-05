<template>
  <div class="product-grid">
    <div
      v-for="product in products"
      :key="product.id"
      class="product-card"
      @click="goToProductDetail(product.id)"
    >
      <img :src="product.image" :alt="product.title" class="product-image" />
      <div class="product-details">
        <h3 class="product-name">{{ product.title }}</h3>
        <p class="product-price">{{ product.price }} COP</p>
        <button class="add-to-cart-btn" @click.stop="handleAddToCart(product)">Agregar al carrito</button>
      </div>
    </div>

    <div v-if="notification" class="notification">{{ notification }}</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useCart } from '@/composables/useCart';
import { useRouter } from 'vue-router';

export default {
  name: 'ProductGrid',
  setup() {
    const products = ref([]);
    const { addToCart, cartItems } = useCart();
    const notification = ref('');
    const router = useRouter();

    // Obtener productos de FakeStore
    onMounted(async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products?limit=50');
        products.value = response.data;
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    });

    // Redirigir a la página de detalles del producto
    const goToProductDetail = (id) => {
      router.push({ name: 'ProductDetail', params: { id } });
    };

    // Función para agregar al carrito
    const handleAddToCart = (product) => {
      addToCart(product);
      notification.value = `${product.title} añadido al carrito`;

      setTimeout(() => {
        notification.value = '';
      }, 2000);
    };

    return { products, handleAddToCart, goToProductDetail, notification };
  },
};
</script>





<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* Mantén siempre 5 columnas */
  gap: 15px;
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.product-details {
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-name {
  font-size: 1em;
  margin: 0 0 5px 0;
  flex-grow: 1;
}

.product-price {
  font-size: 1em;
  color: #ff7001;
  margin: 0 0 10px 0;
}

.add-to-cart-btn {
  background-color: #ff7001;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  width: 100%;
}

.add-to-cart-btn:hover {
  background-color: #ff5252;
}

@media (max-width: 800px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr); /* Muestra 2 productos por fila en pantallas más pequeñas */
    gap: 10px;
  }
}

@media (max-width: 600px) {
  .product-grid {
    grid-template-columns: repeat(1, 1fr); /* Muestra 1 producto por fila en pantallas pequeñas */
    gap: 10px;
  }

  .product-card {
    font-size: 0.9em;
  }

  .product-name {
    font-size: 0.9em;
  }

  .product-price {
    font-size: 0.8em;
  }

  .add-to-cart-btn {
    padding: 6px 10px;
    font-size: 0.8em;
  }
}
</style>

