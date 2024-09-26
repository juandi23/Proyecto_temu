<template>
  <div class="banner-mas-vendidos">
    <div class="categorias">
      <button 
        v-for="categoria in categoriasVisibles" 
        :key="categoria"
        class="categoria-btn"
      >
        {{ categoria }}
      </button>
    </div>
    
    <div class="productos">
      <div v-for="producto in productosVisibles" :key="producto.id" class="producto">
        <div class="producto-imagen">
          <img :src="producto.imagen" :alt="producto.nombre">
          <span v-if="producto.etiqueta" class="etiqueta" :class="producto.etiquetaClase">
            {{ producto.etiqueta }}
          </span>
        </div>
        <div class="producto-info">
          <p class="precio">{{ producto.precio }}</p>
          <p v-if="producto.precioAnterior" class="precio-anterior">{{ producto.precioAnterior }}</p>
          <p class="nombre">{{ producto.nombre }}</p>
          <div class="calificacion">
            <span class="estrellas">★★★★★</span>
            <span class="ventas">En {{ producto.ventas }} carritos</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BannerCincoEstrellas',
  data() {
    return {
      categoriasVisibles: ['Recomendado', 'Hogar y cocina', 'Joyería y accesorios', 'Automotriz'],
      productosVisibles: [
        {
          id: 1,
          nombre: 'Mini Impresora de Fot...',
          precio: '$83.235',
          precioAnterior: '$267.503',
          imagen: '#',
          ventas: '1K+',
          etiqueta: 'Último día -68%',
          etiquetaClase: 'ultimo-dia'
        },
        {
          id: 2,
          nombre: '6 piezas de calzoncillos s...',
          precio: '$29.018',
          precioAnterior: '$69.600',
          imagen: '#',
          ventas: '24K+',
          etiqueta: 'Ofertas -58%',
          etiquetaClase: 'ofertas'
        },
        {
          id: 3,
          nombre: 'Audífonos Inalámbrico...',
          precio: '$21.677',
          precioAnterior: '$58.703',
          imagen: '#',
          ventas: '12K+',
          etiqueta: 'Último día -63%',
          etiquetaClase: 'ultimo-dia'
        },
        {
          id: 4,
          nombre: 'Juego de 8 Cucharas de Acero Inoxidab...',
          precio: '$12.948',
          precioAnterior: '$23.750',
          imagen: '#',
          ventas: '334'
        },
        {
          id: 5,
          nombre: 'Pulsera de Sanación Ajus...',
          precio: '$9.691',
          precioAnterior: '$16.863',
          imagen: '#',
          ventas: '1,1K+',
          etiqueta: 'Ofertas -42%',
          etiquetaClase: 'ofertas'
        },

        {
          id: 6,
          nombre: 'Mini Impresora de Fot...',
          precio: '$83.235',
          precioAnterior: '$267.503',
          imagen: '#',
          ventas: '1K+',
          etiqueta: 'Último día -68%',
          etiquetaClase: 'ultimo-dia'
        },
        {
          id: 7,
          nombre: '6 piezas de calzoncillos s...',
          precio: '$29.018',
          precioAnterior: '$69.600',
          imagen: '#',
          ventas: '24K+',
          etiqueta: 'Ofertas -58%',
          etiquetaClase: 'ofertas'
        },
        {
          id: 8,
          nombre: 'Audífonos Inalámbrico...',
          precio: '$21.677',
          precioAnterior: '$58.703',
          imagen: '#',
          ventas: '12K+',
          etiqueta: 'Último día -63%',
          etiquetaClase: 'ultimo-dia'
        },
        {
          id: 9,
          nombre: 'Juego de 8 Cucharas de Acero Inoxidab...',
          precio: '$12.948',
          precioAnterior: '$23.750',
          imagen: '#',
          ventas: '334'
        },
        {
          id: 10,
          nombre: 'Pulsera de Sanación Ajus...',
          precio: '$9.691',
          precioAnterior: '$16.863',
          imagen: '#',
          ventas: '1,1K+',
          etiqueta: 'Ofertas -42%',
          etiquetaClase: 'ofertas'
        },
        {
          id: 11,
          nombre: 'Mini Impresora de Fot...',
          precio: '$83.235',
          precioAnterior: '$267.503',
          imagen: '#',
          ventas: '1K+',
          etiqueta: 'Último día -68%',
          etiquetaClase: 'ultimo-dia'
        },
        {
          id: 12,
          nombre: '6 piezas de calzoncillos s...',
          precio: '$29.018',
          precioAnterior: '$69.600',
          imagen: '#',
          ventas: '24K+',
          etiqueta: 'Ofertas -58%',
          etiquetaClase: 'ofertas'
        },
        {
          id: 13,
          nombre: 'Audífonos Inalámbrico...',
          precio: '$21.677',
          precioAnterior: '$58.703',
          imagen: '#',
          ventas: '12K+',
          etiqueta: 'Último día -63%',
          etiquetaClase: 'ultimo-dia'
        },
        {
          id: 14,
          nombre: 'Juego de 8 Cucharas de Acero Inoxidab...',
          precio: '$12.948',
          precioAnterior: '$23.750',
          imagen: '#',
          ventas: '334'
        },
        {
          id: 15,
          nombre: 'Pulsera de Sanación Ajus...',
          precio: '$9.691',
          precioAnterior: '$16.863',
          imagen: '#',
          ventas: '1,1K+',
          etiqueta: 'Ofertas -42%',
          etiquetaClase: 'ofertas'
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

.categorias {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  overflow-x: auto;
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
  gap: 16px;
}

.producto {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.producto-imagen {
  position: relative;
}

.producto-imagen img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.etiqueta {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 4px 8px;
  font-size: 12px;
  color: white;
}

.ultimo-dia {
  background-color: #ff7733;
}

.ofertas {
  background-color: #52b520;
}

.producto-info {
  padding: 12px;
}

.precio {
  font-weight: bold;
  font-size: 20px;
  margin: 0;
  color: #333;
}

.precio-anterior {
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
  margin: 4px 0;
}

.nombre {
  font-size: 14px;
  color: #333;
  margin: 8px 0;
}

.calificacion {
  display: flex;
  align-items: center;
  gap: 8px;
}

.estrellas {
  color: #3483fa;
  font-size: 14px;
}

.ventas {
  color: #999;
  font-size: 12px;
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