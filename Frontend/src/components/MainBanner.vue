<template>
  <div class="main-banner-container" :class="{ 'expanded': isExpanded }">
    <div class="banner-content" @click="toggleExpand">
      <img src="@/assets/ahorro.png" alt="Amor y Amistad" class="banner-image">
      
      <div class="featured-products" v-if="!isExpanded">
        <div v-for="product in featuredProducts" :key="product.id" class="featured-product">
          <img 
            v-if="product.images && product.images.length > 0" 
            :src="product.images[0].imageUrl" 
            :alt="product.name" 
            class="product-image"
          />
          <img 
            v-else 
            src="/assets/placeholder.png" 
            alt="Imagen no disponible" 
            class="product-image"
          />
          <p class="product-price">${{ product.price.toLocaleString() }}</p>
        </div>
      </div>
    </div>
    <div v-if="isExpanded" class="products-container">
      <div class="white-container">
        <h2>Ofertas del día</h2>
        <div class="products-grid">
          <div v-for="product in products" :key="product.id" class="product-card">
            <div class="discount-badge">-{{ product.discount || 0 }}%</div>
            <img 
              v-if="product.images && product.images.length > 0" 
              :src="product.images[0].imageUrl" 
              :alt="product.name" 
              class="product-image"
            />
            <img 
              v-else 
              src="/assets/placeholder.png" 
              alt="Imagen no disponible" 
              class="product-image"
            />
            <div class="product-info">
              <p class="product-sales">{{ product.sales || 'N/A' }}+ ventas</p>
              <p class="original-price">${{ product.originalPrice ? product.originalPrice.toLocaleString() : 'N/A' }}</p>
              <p class="discounted-price">${{ product.discountedPrice ? product.discountedPrice.toLocaleString() : product.price.toLocaleString() }}</p>
              <button class="add-to-cart">
                <span class="cart-icon">🛒</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'MainBanner',
  setup() {
    const isExpanded = ref(false);
    const featuredProducts = ref([]);
    const products = ref([]);

    const toggleExpand = () => {
      isExpanded.value = !isExpanded.value;
    };

    onMounted(async () => {
      try {
        // Obtener productos destacados del backend
        const response = await axios.get('http://localhost:5000/api/products');
        const productsData = response.data.data;

        featuredProducts.value = productsData.slice(0, 2); // Asignar los primeros productos como destacados
        products.value = productsData; // Asignar todos los productos
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    });

    return {
      isExpanded,
      toggleExpand,
      featuredProducts,
      products
    };
  }
}
</script>

<style scoped>
/* Estilos previos, no hay cambios necesarios */
</style>


<style scoped>
/* Se mantienen los estilos ya definidos en tu código original */
.main-banner-container {
  width: 100%;
  position: relative;
  background-color: #FFE4E1;
  overflow: hidden;
}

.banner-content {
  position: relative;
  cursor: pointer;
}

.banner-image {
  width: 100%;
  height: auto;
  display: block;
}

.featured-products {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}

.featured-product {
  background: white;
  padding: 5px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transform: rotate(-5deg);
}

.featured-product:last-child {
  transform: rotate(5deg);
  margin-top: -20px;
}

.featured-product img {
  width: 120px;
  height: 120px;
  object-fit: cover;
}

.product-price {
  margin: 5px 0 0;
  font-weight: bold;
}

.products-container {
  background-color: #ff7001;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
}

.white-container {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 100%;
  box-sizing: border-box;
}

.white-container h2 {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}

.discount-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #ff4d4f;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.8em;
}

.product-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.product-info {
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-sales {
  color: #666;
  font-size: 0.8em;
  margin-bottom: 5px;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 0.9em;
  margin-bottom: 2px;
}

.discounted-price {
  font-weight: bold;
  color: #ff4d4f;
  font-size: 1.1em;
  margin-bottom: 10px;
}

.add-to-cart {
  width: 30px;
  height: 30px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  margin-top: auto;
}

.cart-icon {
  font-size: 1em;
}

@media (max-width: 768px) {
  .featured-products {
    display: none;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
  }

  .product-card {
    font-size: 0.9em;
  }

  .discount-badge {
    font-size: 0.7em;
    padding: 3px 6px;
  }

  .white-container h2 {
    font-size: 1.5em;
  }
}
</style>
