<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <button class="close-button" @click="close">X</button>
        
        <!-- Imagen del producto con tamaño máximo -->
        <img :src="product.image" alt="Imagen del producto" class="product-image" />
        
        <h2 class="product-title">{{ product.title }}</h2>
        <p class="product-description">{{ product.description }}</p>
        <div class="product-price">Precio: {{ product.price }} USD</div>
  
        <!-- Botón para añadir al carrito -->
        <button class="add-to-cart-btn">Añadir al carrito</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProductDetailModal",
    props: {
      isVisible: Boolean,
      product: Object
    },
    methods: {
      close() {
        this.$emit("close");
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: #fff;
    padding: 20px;
    width: 90%;
    max-width: 400px; /* Limita el ancho máximo del modal */
    max-height: 80vh; /* Limita la altura máxima del modal */
    overflow-y: auto; /* Agrega desplazamiento si el contenido es muy grande */
    border-radius: 8px;
    position: relative;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }
  
  .product-image {
    width: 100%;
    max-width: 300px; /* Tamaño máximo de la imagen */
    height: auto;
    display: block;
    margin: 0 auto 20px; /* Centra la imagen horizontalmente */
  }
  
  .product-title {
    font-size: 18px;
    margin-bottom: 10px;
    text-align: center;
  }
  
  .product-description {
    font-size: 14px;
    margin-bottom: 15px;
    text-align: center;
  }
  
  .product-price {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 15px;
    text-align: center;
  }
  
  .add-to-cart-btn {
    display: block;
    background-color: orange;
    color: #fff;
    padding: 10px;
    width: 100%;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;
    text-align: center;
  }
  </style>
  