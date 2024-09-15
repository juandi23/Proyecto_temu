<template>
  <div class="product-grid">
    <div v-for="product in products" :key="product.id" class="product-card">
      <img :src="product.imageUrl" :alt="product.name" class="product-image" />
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ product.price }}</p>
      <button class="add-to-cart-btn">Agregar al carrito</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'ProductGrid',
  setup() {
    const products = ref([
      { id: 1, name: 'Auriculares inalámbricos', price: '$18.877', image: 'auriculares-inalambricos.png' },
      { id: 2, name: 'Escurridor de platos', price: '$201.598', image: 'escurridor-de-platos.png' },
      { id: 3, name: 'Chaqueta Elegante', price: '$75.929', image: 'chaqueta-elegante.png' },
      { id: 4, name: 'Reloj inteligente', price: '$39.087', image: 'reloj-inteligente.png' },
      { id: 5, name: 'Camiseta estampada', price: '$46.395', image: 'camiseta-estampada.png' },
    ])

    onMounted(async () => {
      for (const product of products.value) {
        const imageModule = await import(`../assets/${product.image}`)
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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover; /* Asegura que la imagen cubra el contenedor sin distorsionarse */
  border-radius: 4px;
}

.product-name {
  font-size: 1.2em;
  margin: 10px 0;
}

.product-price {
  font-size: 1.1em;
  color: #e53935;
  margin: 5px 0 10px;
}

.add-to-cart-btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: #ff5252;
}


/* Media Query para pantallas pequeñas */
@media (max-width: 600px) {
  .product-grid {
    grid-template-columns: 1fr; /* Una sola columna en pantallas pequeñas */
  }

  .product-card {
    padding: 5px; /* Ajusta el padding en pantallas pequeñas */
  }

  .product-name {
    font-size: 1em; /* Ajusta el tamaño del texto */
  }

  .product-price {
    font-size: 0.9em; /* Ajusta el tamaño del precio */
  }

  .product-image {
    height: 150px; /* Reduce la altura de la imagen en pantallas pequeñas */
  }

  .add-to-cart-btn {
    padding: 6px 10px; /* Botón más pequeño en pantallas pequeñas */
  }
}

</style>
