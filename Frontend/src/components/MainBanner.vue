<template>
  <div class="main-banner-container" :class="{ 'expanded': isExpanded }">
    <div class="banner-content" @click="toggleExpand">
      <img src="@/assets/amoryamistad.png" alt="Amor y Amistad" class="banner-image">
      <div class="featured-products" v-if="!isExpanded">
        <div v-for="product in featuredProducts" :key="product.id" class="featured-product">
          <img :src="product.image" :alt="product.name" class="product-image">
          <p class="product-price">${{ product.price.toLocaleString() }}</p>
        </div>
      </div>
    </div>
    <div v-if="isExpanded" class="products-container">
      <div class="white-container"> 
        <h2>Ofertas del día</h2>
        <div class="products-grid">
          <div v-for="product in products" :key="product.id" class="product-card">
            <div class="discount-badge">-{{ product.discount }}%</div>
            <img :src="product.image" :alt="product.name" class="product-image">
            <div class="product-info">
              <p class="product-sales">{{ product.sales }}+ ventas</p>
              <p class="original-price">${{ product.originalPrice.toLocaleString() }}</p>
              <p class="discounted-price">${{ product.discountedPrice.toLocaleString() }}</p>
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
export default {
  name: 'MainBanner',
  data() {
    return {
      isExpanded: false,
      featuredProducts: [
        { id: 1, name: 'Reloj Inteligente', image: new URL('@/assets/relojinteligente.png', import.meta.url).href, price: 39169 },
        { id: 2, name: 'Reloj Lenovo', image: new URL('@/assets/relojlenovo.png', import.meta.url).href, price: 14079 },
      ],
      products: [
        { id: 1, name: 'Food containers', image: new URL('@/assets/relojdeportivo.png', import.meta.url).href,  discount: 22, originalPrice: 18050, discountedPrice: 14079, sales: '100K' },
        { id: 2, name: 'Kitchen paper', image: new URL('@/assets/camisetamujer.png', import.meta.url).href,  discount: 34, originalPrice: 59350, discountedPrice: 39169, sales: '81K' },
        { id: 3, name: 'Gold watch', image: new URL('@/assets/conjuntodecollar.png', import.meta.url).href,  discount: 65, originalPrice: 30590, discountedPrice: 10607, sales: '35K' },
        { id: 4, name: 'Door mat', image: new URL('@/assets/pulserahombre.png', import.meta.url).href,  discount: 68, originalPrice: 36116, discountedPrice: 11316, sales: '100K' },
        { id: 5, name: 'Tool set', image: new URL('@/assets/conjuntoaretesdama.png', import.meta.url).href,  discount: 67, originalPrice: 71940, discountedPrice: 23394, sales: '775' },
      ]
    }
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    }
  }
}
</script>


<style scoped>
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
  margin-top: -20px;  /* Overlap with the first product */
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
  background-color: #f6cecc;
  padding: 20px;
}


.white-container {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.white-container h2 {
  font-size: 2em;
  font-weight: bold; 
  margin-bottom: 20px; 
  text-align: center;
}


.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 10px;
}

.product-sales {
  color: #666;
  font-size: 0.9em;
}

.original-price {
  text-decoration: line-through;
  color: #999;
}

.discounted-price {
  font-weight: bold;
  color: #ff4d4f;
  font-size: 1.2em;
}

.add-to-cart {
  width: 40px;
  height: 40px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-icon {
  font-size: 1.2em;
}

@media (max-width: 768px) {
  .featured-products {
    display: none;
  }
}
</style>