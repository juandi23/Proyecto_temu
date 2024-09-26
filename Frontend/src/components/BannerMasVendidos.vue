<template>
  <div class="banner-mas-vendidos">
    <div class="filtros">
      <button 
        v-for="filtro in filtros" 
        :key="filtro"
        :class="{ active: filtroActivo === filtro }"
        @click="setFiltroActivo(filtro)"
        @mouseover="hoveredButton = filtro"
        @mouseleave="hoveredButton = null"
      >
        {{ filtro }}
      </button>
    </div>
    
    <div class="filtro-categoria">
      <span>Filtrar por categoría</span>
      <div class="select-wrapper" @click="toggleDropdown">
        <select v-model="categoriaSeleccionada">
          <option value="">Recomendado</option>
        </select>
        <div class="dropdown" v-show="showDropdown">
          <div 
            v-for="categoria in categorias" 
            :key="categoria"
            @click="seleccionarCategoria(categoria)"
            class="dropdown-item"
          >
            {{ categoria }}
          </div>
        </div>
      </div>
    </div>
    
    <div class="productos">
      <div v-for="producto in productos" :key="producto.id" class="producto">
        <img :src="producto.imagen" :alt="producto.nombre">
        <div class="producto-info">
          <h3>{{ producto.nombre }}</h3>
          <p class="precio">{{ producto.precio }}</p>
          <p class="precio-anterior" v-if="producto.precioAnterior">{{ producto.precioAnterior }}</p>
          <p class="oferta" v-if="producto.oferta">{{ producto.oferta }}</p>
          <div class="calificacion">
            <span class="estrellas">★★★★★</span>
            <span class="ventas">{{ producto.ventas }} ventas</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BannerMasVendidos',
  data() {
    return {
      filtros: ['Más vendidos', 'En general', 'En los últimos 30 días', 'En los últimos 7 días'],
      filtroActivo: 'Más vendidos',
      hoveredButton: null,
      categoriaSeleccionada: '',
      showDropdown: false,
      categorias: [
        'Recomendado',
        'Belleza y salud',
        'Ropa de mujer',
        'Hogar y cocina',
        'Ropa de hombre',
        'Calzado de mujer',
        'Ropa interior y pijamas de hombre',
        'Deporte y aire libre',
        'Oficina y escuela',
        'Juguetes',
        'Tecnología',
        'Negocios, industria y ciencia',
        'Mascotas',
        'Joyería y accesorios',
        'Automotriz',
        'Mujer curvy'
      ],
      productos: [
        {
          id: 1,
          nombre: 'Auriculares Inalámbricos Estéreo - Verd...',
          precio: '$8.888',
          precioAnterior: '$10.551',
          imagen: '#',
          ventas: '96K'
        },
        {
          id: 2,
          nombre: 'Reloj inteligente resistente al agua, pan...',
          precio: '$76.558',
          precioAnterior: '$84.540',
          imagen: '#',
          ventas: '100K'
        },
        {
          id: 3,
          nombre: 'Mujeres Sandalias de Tac...',
          precio: '$13.789',
          precioAnterior: '$64.451',
          oferta: 'Oferta -78%',
          imagen: '#',
          ventas: '39K'
        },
        {
          id: 4,
          nombre: 'Shorts de Yoga con Cont...',
          precio: '$159.941',
          precioAnterior: '$522.592',
          oferta: 'Oferta -69%',
          imagen: '#',
          ventas: '6K'
        },
        {
          id: 5,
          nombre: 'Proyector Mini 4K HY300 Android 11.0 ...',
          precio: '$244.779',
          precioAnterior: '$1.252.668',
          imagen: '#',
          ventas: '3K'
        },
        {
          id: 1,
          nombre: 'Auriculares Inalámbricos Estéreo - Verd...',
          precio: '$8.888',
          precioAnterior: '$10.551',
          imagen: '#',
          ventas: '96K'
        },
        {
          id: 2,
          nombre: 'Reloj inteligente resistente al agua, pan...',
          precio: '$76.558',
          precioAnterior: '$84.540',
          imagen: '#',
          ventas: '100K'
        },
        {
          id: 3,
          nombre: 'Mujeres Sandalias de Tac...',
          precio: '$13.789',
          precioAnterior: '$64.451',
          oferta: 'Oferta -78%',
          imagen: '#',
          ventas: '39K'
        },
        {
          id: 4,
          nombre: 'Shorts de Yoga con Cont...',
          precio: '$159.941',
          precioAnterior: '$522.592',
          oferta: 'Oferta -69%',
          imagen: '#',
          ventas: '6K'
        },
        {
          id: 5,
          nombre: 'Proyector Mini 4K HY300 Android 11.0 ...',
          precio: '$244.779',
          precioAnterior: '$1.252.668',
          imagen: '#',
          ventas: '3K'
        },
        {
          id: 1,
          nombre: 'Auriculares Inalámbricos Estéreo - Verd...',
          precio: '$8.888',
          precioAnterior: '$10.551',
          imagen: '#',
          ventas: '96K'
        },
        {
          id: 2,
          nombre: 'Reloj inteligente resistente al agua, pan...',
          precio: '$76.558',
          precioAnterior: '$84.540',
          imagen: '#',
          ventas: '100K'
        },
        {
          id: 3,
          nombre: 'Mujeres Sandalias de Tac...',
          precio: '$13.789',
          precioAnterior: '$64.451',
          oferta: 'Oferta -78%',
          imagen: '#',
          ventas: '39K'
        },
        {
          id: 4,
          nombre: 'Shorts de Yoga con Cont...',
          precio: '$159.941',
          precioAnterior: '$522.592',
          oferta: 'Oferta -69%',
          imagen: '#',
          ventas: '6K'
        },
        {
          id: 5,
          nombre: 'Proyector Mini 4K HY300 Android 11.0 ...',
          precio: '$244.779',
          precioAnterior: '$1.252.668',
          imagen: '#',
          ventas: '3K'
        }
      ]
    }
  },
  methods: {
    setFiltroActivo(filtro) {
      this.filtroActivo = filtro;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    seleccionarCategoria(categoria) {
      this.categoriaSeleccionada = categoria;
      this.showDropdown = false; // Cerrar el dropdown después de seleccionar
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

.filtros {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filtros button {
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  background: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.filtros button:hover,
.filtros button.active {
  background-color: #3483fa;
  color: white;
  border-color: #3483fa;
}

.filtro-categoria {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
}

.select-wrapper {
  position: relative;
}

.filtro-categoria select {
  margin-left: 10px;
  padding: 5px 30px 5px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  appearance: none;
  background: url('data:image/svg+xml;utf8,<svg fill="%23333" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>') no-repeat;
  background-position: right 5px top 50%;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-top: none;
  border-radius: 0 0 4px 4px;
  max-height: 500px;
  overflow-y: auto;
  z-index: 1000;
  font-size: 10px;
}

.dropdown-item {
  padding: 8px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
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
  transition: box-shadow 0.3s;
}

.producto:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.producto img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.producto-info {
  padding: 12px;
}

.producto h3 {
  margin: 0 0 8px;
  font-size: 14px;
  color: #333;
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

.oferta {
  color: #00a650;
  font-size: 14px;
  margin: 4px 0;
}

.calificacion {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
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
  
  .filtros button {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>
