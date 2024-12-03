<!-- src/views/ProductDetailView.vue -->
<template>
  <div class="product-detail">
    <!-- Flecha para regresar a la página principal -->
    <button class="back-button" @click="goToHomePage">⬅ Volver</button>
    
    <div class="product-images">
      <img :src="product.image" alt="Imagen del producto principal" class="main-image" />
    </div>
    
    <div class="product-info">
      <h1>{{ product.title }}</h1>
      <p>{{ product.description }}</p>
      <div class="price">Precio: {{ product.price }} USD</div>
  
      <!-- Opciones de compra -->
      <div v-if="product.options">
        <label for="color">Color:</label>
        <select id="color" v-model="selectedColor">
          <option v-for="color in product.options.colors" :key="color" :value="color">{{ color }}</option>
        </select>
        
        <label for="size">Tamaño:</label>
        <select id="size" v-model="selectedSize">
          <option v-for="size in product.options.sizes" :key="size" :value="size">{{ size }}</option>
        </select>
      </div>
  
      <button @click="addToCart" class="add-to-cart-btn">Añadir al carrito</button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // Importar useRouter
import axios from 'axios';

export default {
  name: 'ProductDetailView',
  data() {
    return {
      product: {},
      selectedColor: null,
      selectedSize: null,
    };
  },
  setup() {
    const route = useRoute();
    const router = useRouter(); // Instanciar router
    const product = ref({});

    onMounted(async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${route.params.id}`);
        product.value = response.data;
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    });

    // Exponer router para el método goToHomePage
    return { product, router };
  },
  methods: {
    addToCart() {
      alert(`${this.product.title} añadido al carrito`);
    },
    goToHomePage() {
      this.$router.push('/'); // Redirige a la página principal
    }
  }
};
</script>

<style scoped>
/* Estilo para el botón de regreso */
.back-button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #007bff;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.back-button:hover {
  text-decoration: underline;
}

.product-detail {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.product-images {
  flex: 1;
}

.main-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
}

.product-info {
  flex: 2;
}

.price {
  font-weight: bold;
  font-size: 18px;
  margin: 10px 0;
}

.add-to-cart-btn {
  display: block;
  background-color: orange;
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  text-align: center;
  width: 100%;
  margin-top: 20px;
}

.add-to-cart-btn:hover {
  background-color: darkorange;
}
</style>
