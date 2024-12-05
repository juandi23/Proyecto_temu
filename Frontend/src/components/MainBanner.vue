<template>
  <div class="main-banner-container" :class="{ 'expanded': isExpanded }">
    <div class="banner-content" @click="toggleExpand">
      <!--AMOR Y AMISTAD
      <img src="@/assets/amoryamistad.png" alt="Amor y Amistad" class="banner-image">      -->

      <!--AHORRO
      <img src="@/assets/ahorro.png" alt="Amor y Amistad" class="banner-image">      -->

       <!--NAVIDAD-->
       <img src="@/assets/navidad.png" alt="Navidad" class="banner-image">

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
              <p class="original-price">${{ product.price.toLocaleString() }}</p>
              <p class="discounted-price">${{ product.price.toLocaleString() }}</p>
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
      products: [], // Array para almacenar los productos
      
    }
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    fetchProducts() {
      fetch('https://fakestoreapi.com/products?limit=4')
        .then((res) => res.json())
        .then((json) => {
          this.products = json;
          console.log('Products fetched:', this.products);
        })
        .catch((error) => console.error('Error fetching products:', error));
    },
    
  },
  created() {
    // Llamar al método fetchProducts cuando se monte el componente
    this.fetchProducts();
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
  
   /*Amor y amistad 
  background-color: #f6cecc; */

  /*descuentos 
  background-color: #ff7001;*/

  /*Navidad */
  background-color: #880202;


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
  height: 100%;
  width: 70%;
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