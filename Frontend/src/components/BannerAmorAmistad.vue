<template>
  <div class="banner-mas-vendidos">
    <h1 class="title">Explora lo que amas</h1>

    <!-- Categorías -->
    <div class="categorias">
      <button v-for="categoria in categorias" :key="categoria" class="categoria-btn">
        {{ categoria }}
      </button>
    </div>

    <!-- Productos -->
    <div class="productos">
      <div v-for="producto in productos" :key="producto.id" class="producto">
        <div class="producto-imagen">
          <img :src="producto.imagen" :alt="producto.nombre">
        </div>
        <div class="producto-info">
          <div class="oferta" v-if="producto.oferta">{{ producto.oferta }}</div>
          <div class="nombre">{{ producto.nombre }}</div>
          <div class="precio">
            <span class="precio-actual">{{ producto.precio }}</span>
            <span class="precio-anterior" v-if="producto.precioAnterior">{{ producto.precioAnterior }}</span>
          </div>
          <div class="ventas">{{ producto.ventas }} ventas</div>
          <div class="stock" v-if="producto.stock">{{ producto.stock }}</div>
          <div class="calificacion" v-if="producto.calificacion">
            <span class="estrellas">{{ '★'.repeat(producto.calificacion) }}</span>
            <span class="num-calificaciones">({{ producto.numCalificaciones }})</span>
          </div>
        </div>
        <button class="carrito-btn">🛒</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BannerMasVendidos',
  data() {
    return {
      categorias: ['Todos', 'Tecnología', 'Teléfonos móviles y más', 'Calzado de hombre', 'Mascotas', 'Ropa de hombre', 'Automotriz', 'Oficina y escuela', 'Juguetes', 'Mujer curvy', 'Hogar inteligente'],
      productos: [
        {
          id: 1,
          nombre: 'Soporte Portátil para Laptop',
          precio: '$18.757',
          precioAnterior: '$29.930',
          oferta: 'Ofertas -37%',
          imagen: 'ruta_imagen_soporte_portatil.jpg',
          ventas: '324',
          stock: 'Casi agotado',
          calificacion: 4,
          numCalificaciones: 2
        },
        {
          id: 2,
          nombre: 'Soporte para portátil de aluminio',
          precio: '$16.080',
          precioAnterior: '$27.906',
          oferta: 'Ofertas -42%',
          imagen: 'ruta_imagen_soporte_aluminio.jpg',
          ventas: '579',
          calificacion: 5,
          numCalificaciones: 2
        },
        {
          id: 3,
          nombre: 'Soporte de teléfono y tableta',
          precio: '$13.752',
          precioAnterior: '$19.071',
          oferta: 'Ofertas -27%',
          imagen: 'ruta_imagen_soporte_telefono.jpg',
          ventas: '555',
          stock: 'Casi agotado',
          calificacion: 4,
          numCalificaciones: 4
        },
        {
          id: 4,
          nombre: 'Gorra de Béisbol Bordada de Brooklyn',
          precio: '$10.968',
          precioAnterior: '$24.277',
          imagen: 'ruta_imagen_gorra.jpg',
          ventas: '2,1K+',
          stock: 'Casi agotado',
          calificacion: 5,
          numCalificaciones: 52
        },
        {
          id: 5,
          nombre: '1 ud Cabezal de Ducha de Alta Presión',
          precio: '$66.385',
          precioAnterior: '$138.813',
          imagen: 'ruta_imagen_cabezal_ducha.jpg',
          ventas: '2,3K+',
          stock: 'Casi agotado',
          calificacion: 5,
          numCalificaciones: 296
        }
      ]
    }
  }
}
</script>

<style scoped>
.banner-mas-vendidos {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.categorias {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.categoria-btn {
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  background: none;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
}

.productos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.producto {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  padding: 10px;
}

.producto-imagen img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.producto-info {
  padding: 10px 0;
}

.oferta {
  color: #ff6600;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 5px;
}

.nombre {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.precio-actual {
  font-weight: bold;
  font-size: 18px;
  color: #333;
}

.precio-anterior {
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
  margin-left: 5px;
}

.ventas, .stock, .calificacion {
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}

.stock {
  color: #00a650;
}

.estrellas {
  color: #ffc400;
}

.carrito-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .productos {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .categoria-btn {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>