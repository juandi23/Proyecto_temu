<!-- src/views/ProductDetailView.vue -->
<template>
    <div class="product-detail">
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
  import { useRoute } from 'vue-router';
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
      const product = ref({});
  
      onMounted(async () => {
        try {
          const response = await axios.get(`https://fakestoreapi.com/products/${route.params.id}`);
          product.value = response.data;
        } catch (error) {
          console.error('Error al obtener el producto:', error);
        }
      });
  
      return { product };
    },
    methods: {
      addToCart() {
        // Lógica para agregar el producto al carrito
        alert(`${this.product.title} añadido al carrito`);
      }
    }
  };
  </script>
  
  <style scoped>
  .product-detail {
    display: flex;
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
    background-color: orange;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;
  }
  </style>
  