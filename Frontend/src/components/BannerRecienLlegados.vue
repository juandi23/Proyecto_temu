<template>
    <div class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="product-image">
          <img :src="product.image" :alt="product.name">
          <div v-if="product.videoIcon" class="video-icon">▶</div>
        </div>
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <div class="price-info">
            <span class="current-price">{{ formatPrice(product.currentPrice) }}</span>
            <span v-if="product.originalPrice" class="original-price">{{ formatPrice(product.originalPrice) }}</span>
          </div>
          <div v-if="product.discount" class="discount">
            <span class="discount-label">Oferta</span>
            <span class="discount-percentage">{{ product.discount }}</span>
          </div>
          <div class="stock-info" v-if="product.stockLeft">
            <span>quedan {{ product.stockLeft }} a</span>
          </div>
        </div>
      </div>
      <div class="pagination">
        <button class="pagination-dot active"></button>
        <button class="pagination-dot"></button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RecienLlegados',
    data() {
      return {
        products: [
          {
            id: 1,
            name: 'Conjunto de sudadera con capucha y p...',
            currentPrice: 122122,
            originalPrice: 196547,
            discount: '-43%',
            image: '#',
            stockLeft: 'algunos',
          },
          {
            id: 2,
            name: 'Elegante Caja de Pañuelo...',
            currentPrice: 35012,
            originalPrice: 62237,
            discount: '-43%',
            image: '#',
            stockLeft: 4,
          },
          {
            id: 3,
            name: 'Juego de Bloques de Co...',
            currentPrice: 24288,
            originalPrice: 70504,
            discount: '-65%',
            image: '#',
            stockLeft: 2,
          },
          {
            id: 4,
            name: 'Botas de Senderismo par...',
            currentPrice: 60011,
            originalPrice: 190191,
            discount: '-68%',
            image: '#',
            stockLeft: 2,
          },
          {
            id: 5,
            name: '2pcs Película Protectora ...',
            currentPrice: 17205,
            originalPrice: 60148,
            discount: '-71%',
            image: '#',
            stockLeft: 2,
          },

          {
            id: 6,
            name: 'Conjunto de sudadera con capucha y p...',
            currentPrice: 122122,
            originalPrice: 196547,
            discount: '-43%',
            image: '#',
            stockLeft: 'algunos',
          },
          {
            id: 7,
            name: 'Elegante Caja de Pañuelo...',
            currentPrice: 35012,
            originalPrice: 62237,
            discount: '-43%',
            image: '#',
            stockLeft: 4,
          },
          {
            id: 8,
            name: 'Juego de Bloques de Co...',
            currentPrice: 24288,
            originalPrice: 70504,
            discount: '-65%',
            image: '#',
            stockLeft: 2,
          },
          {
            id: 9,
            name: 'Botas de Senderismo par...',
            currentPrice: 60011,
            originalPrice: 190191,
            discount: '-68%',
            image: '#',
            stockLeft: 2,
          },
          {
            id: 10,
            name: '2pcs Película Protectora ...',
            currentPrice: 17205,
            originalPrice: 60148,
            discount: '-71%',
            image: '#',
            stockLeft: 2,
          },
          // Añade más productos aquí siguiendo el mismo patrón
        ]
      }
    },
    methods: {
      formatPrice(price) {
        return `$${price.toLocaleString('es-CO')}`
      }
    }
  }
  </script>
  
  <style scoped>
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    padding: 16px;
  }
  
  .product-card {
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
    background-color: white;
  }
  
  .product-image {
    position: relative;
    width: 100%;
    padding-top: 100%; /* 1:1 Aspect Ratio */
  }
  
  .product-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .video-icon {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 4px 8px;
    border-radius: 50%;
  }
  
  .product-info {
    padding: 12px;
  }
  
  .product-name {
    font-size: 14px;
    margin: 0 0 8px;
    color: #333;
  }
  
  .price-info {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }
  
  .current-price {
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }
  
  .original-price {
    font-size: 14px;
    color: #999;
    text-decoration: line-through;
  }
  
  .discount {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 4px;
  }
  
  .discount-label {
    background-color: #ff3f3f;
    color: white;
    padding: 2px 4px;
    border-radius: 2px;
    font-size: 12px;
  }
  
  .discount-percentage {
    color: #ff3f3f;
    font-size: 14px;
  }
  
  .stock-info {
    font-size: 12px;
    color: #00a650;
    margin-top: 4px;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
  }
  
  .pagination-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ccc;
    border: none;
    padding: 0;
    cursor: pointer;
  }
  
  .pagination-dot.active {
    background-color: #3483fa;
  }
  </style>