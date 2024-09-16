<template>
  <div class="product-grid">
    <div v-for="product in products" :key="product.id" class="product-card">
      <img :src="product.imageUrl" :alt="product.name" class="product-image" />
      <div class="product-details">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">{{ product.price }}</p>
        <button class="add-to-cart-btn">Agregar al carrito</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'ProductGrid',
  setup() {
    const products = ref([
      { id: 1, name: 'Auriculares inalámbricos', price: '$18.877', image: 'auriculares-inalambricos' },
      { id: 2, name: 'Escurridor de platos', price: '$201.598', image: 'escurridor-de-platos' },
      { id: 3, name: 'Chaqueta Elegante', price: '$75.929', image: 'chaqueta-elegante' },
      { id: 4, name: 'Reloj inteligente', price: '$39.087', image: 'reloj-inteligente' },
      { id: 5, name: 'Camiseta estampada', price: '$46.395', image: 'camiseta-estampada' },
    ])

    onMounted(async () => {
      for (const product of products.value) {
        const imageModule = await import(`../assets/${product.image}.png`)
        product.imageUrl = imageModule.default
      }
    })

    return { products }
  }
}
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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
  color: #e53935;
  margin: 0 0 10px 0;
}

.add-to-cart-btn {
  background-color: #ff6b6b;
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

@media (max-width: 600px) {
  .product-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
    padding: 10px;
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