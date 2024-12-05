<template>
  <div v-if="show" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <!-- Panel Izquierdo: Categorías -->
      <div class="left-panel">
        <h2 class="panel-title">Categorías</h2>
        <ul>
          <li
            v-for="(category, index) in mainCategories"
            :key="index"
            @click="selectCategory(index)"
            :class="{ active: index === selectedCategoryIndex }"
          >
            {{ category }}
          </li>
        </ul>
      </div>

      <!-- Panel Derecho: Subcategorías con imágenes -->
      <div class="right-panel">
        <h2 class="panel-title">{{ selectedCategory }}</h2>
        <div class="sub-category-list">
          <div
            v-for="(photo, index) in selectedSubCategories"
            :key="index"
            class="sub-category"
          >
            <!-- Mostrar la imagen de Pexels -->
            <img :src="photo.image" class="category-image" />
            <span class="category-name">{{ photo.name }}</span> <!-- Mostrar el nombre de la subcategoría -->
            <span v-if="photo.isHot" class="hot-badge">HOT</span> <!-- Mostrar la etiqueta HOT -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPhotosByCategory } from '@/services/pexelsService.js';

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      selectedCategoryIndex: null,
      selectedCategory: '',
      selectedSubCategories: [], // Subcategorías que se actualizan según la categoría seleccionada
      mainCategories: [
        "Destacado",
        "Hogar y cocina",
        "Ropa de mujer",
        "Deporte y aire libre",
        "Mujer curvy",
        "Juguetes",
        "Calzado de mujer",
        "Automotriz",
        "Lencería y pijamas de mujer",
        "Patio, césped y jardín",
        "Ropa de hombre",
        "Tecnología",
        "Calzado de hombre",
        "Negocios, industria y ciencia",
        "Hombre de talla grande",
        "Herramientas y hogar",
      ],
        subCategoriesData: {
  "Destacado": [
    { name: "Almacenaje y organización", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Joyas para hombre", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Picnic y campamento", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Corsés y Bustiers para Mujer", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Conjuntos de ropa de playa para mujeres", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Sujetadores para mujer", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Calzado deportivo para niño", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Shorts moldeadores para mujer", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Cámaras de vigilancia", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Atlético para niño", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Monos para mujer", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Pantalones cargo para hombre", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Fajas para mujer", image: "https://via.placeholder.com/80", isHot: true },
  ],
  "Hogar y cocina": [
    { name: "Electrodomésticos", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Utensilios de cocina", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Muebles de cocina", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Vajillas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Cubiertos", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Decoración de cocina", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Pequeños electrodomésticos", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Almacenamiento de alimentos", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Accesorios de limpieza", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Filtros de agua", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Hornos eléctricos", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Sartenes y ollas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Organizadores de cocina", image: "https://via.placeholder.com/80", isHot: true },
  ],
  "Ropa de mujer": [
    { name: "Vestidos", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Blusas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Pantalones", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Faldas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Jerseys", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Abrigos", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Sudaderas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Ropa deportiva", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Tops", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Shorts", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Overoles", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Conjuntos de moda", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Ropa de oficina", image: "https://via.placeholder.com/80", isHot: false },
  ],
  "Deporte y aire libre": [
    { name: "Equipo de camping", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Bicicletas", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Accesorios de natación", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Ropa deportiva", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Tienda de campaña", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Calzado deportivo", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Pesas y mancuernas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Artículos de senderismo", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Pelotas deportivas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Mochilas de trekking", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Gorros de natación", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Protectores solares", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Botellas de agua deportivas", image: "https://via.placeholder.com/80", isHot: true },
  ],
  "Mujer curvy": [
    { name: "Faldas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Pantalones", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Vestidos", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Blusas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Ropa interior", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Sudaderas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Ropa de oficina", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Tops", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Conjuntos", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Ropa casual", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Ropa de fiesta", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Ropa deportiva", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Chaquetas", image: "https://via.placeholder.com/80", isHot: false },
  ],
  "Juguetes": [
    { name: "Juegos de mesa", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Muñecos de acción", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Peluches", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Juguetes educativos", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Pistas de autos", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Juegos de construcción", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Rompecabezas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Juguetes para bebés", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Kits de ciencia", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Muñecas", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Juguetes electrónicos", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Vehículos de juguete", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Títeres", image: "https://via.placeholder.com/80", isHot: true },
  ],
  "Calzado de mujer": [
    { name: "Zapatillas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Botas", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Sandalias", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Tacones", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Zapatos deportivos", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Bailarinas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Pantuflas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Zapatos de fiesta", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Mocasines", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Zapatos formales", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Botines", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Sandalias de plataforma", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Zapatos casuales", image: "https://via.placeholder.com/80", isHot: false },
  ],
  "Automotriz": [
    { name: "Accesorios para coche", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Neumáticos", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Sistemas de sonido", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Fundas para asientos", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Herramientas automotrices", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Lubricantes", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Baterías", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Luces LED", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Rines y llantas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Parabrisas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Limpiadores de autos", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Sensores de aparcamiento", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Cámaras de reversa", image: "https://via.placeholder.com/80", isHot: false },
  ],
  "Lencería y pijamas de mujer": [
    { name: "Pijamas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Ropa interior", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Batas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Conjuntos de lencería", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Sujetadores", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Bragas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Camisones", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Lencería sexy", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Pijamas de invierno", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Pantuflas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Accesorios de lencería", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Bodysuits", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Conjuntos de pijamas", image: "https://via.placeholder.com/80", isHot: false },
  ],
  "Patio, césped y jardín": [
    { name: "Herramientas de jardinería", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Muebles de jardín", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Macetas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Iluminación exterior", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Parrillas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Accesorios para jardín", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Pérgolas", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Césped artificial", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Riego automático", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Sombrillas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Casetas de jardín", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Fuentes decorativas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Setos y cercas", image: "https://via.placeholder.com/80", isHot: false },
  ],
  "Ropa de hombre": [
    { name: "Camisas", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Pantalones", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Camisetas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Sudaderas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Chaquetas", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Polos", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Trajes", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Ropa interior", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Abrigos", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Conjuntos deportivos", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Ropa casual", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Chalecos", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Pantalones cortos", image: "https://via.placeholder.com/80", isHot: false },
  ],
  "Tecnología": [
    { name: "Teléfonos móviles", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Accesorios tecnológicos", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Smartwatches", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Auriculares", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Tablets", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Laptops", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Cámaras", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Drones", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Impresoras", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Teclados", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Monitores", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Sistemas de audio", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Cargadores inalámbricos", image: "https://via.placeholder.com/80", isHot: false },
  ],
  "Calzado de hombre": [
    { name: "Zapatos de vestir", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Botas de montaña", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Sandalias", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Zapatos deportivos", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Zapatillas casuales", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Mocasines", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Pantuflas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Botines", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Zapatos de seguridad", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Zapatillas de running", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Calzado formal", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Zapatillas deportivas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Zapatos náuticos", image: "https://via.placeholder.com/80", isHot: true },
  ],
  "Negocios, industria y ciencia": [
    { name: "Equipos de oficina", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Herramientas de medición", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Artículos de papelería", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Máquinas industriales", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Material de laboratorio", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Muebles de oficina", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Ropa de seguridad", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Cajas fuertes", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Material de embalaje", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Herramientas de construcción", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Lámparas de escritorio", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Dispositivos de almacenamiento", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Impresoras 3D", image: "https://via.placeholder.com/80", isHot: false },
  ],
  "Hombre de talla grande": [
    { name: "Chaquetas", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Pantalones de talla grande", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Camisas de talla grande", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Sudaderas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Camisetas", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Polos", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Trajes de talla grande", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Abrigos", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Chalecos", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Ropa casual", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Ropa de oficina", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Conjuntos deportivos", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Ropa interior", image: "https://via.placeholder.com/80", isHot: false },
  ],
  "Herramientas y hogar": [
    { name: "Herramientas eléctricas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Kits de reparación", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Destornilladores", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Taladros", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Lijadoras", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Martillos", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Multiherramientas", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Sierra eléctrica", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Cajas de herramientas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Medidores láser", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Brocas y puntas", image: "https://via.placeholder.com/80", isHot: true },
    { name: "Cintas métricas", image: "https://via.placeholder.com/80", isHot: false },
    { name: "Llaves ajustables", image: "https://via.placeholder.com/80", isHot: false },
  ],
},

        selectedCategoryIndex: 0,
      };
    },
    computed: {
      selectedCategory() {
        return this.mainCategories[this.selectedCategoryIndex];
      },
    },
    methods: {
    closeModal() {
      this.$emit("close"); // Emite un evento para cerrar el modal
    },
    selectCategory(index) {
      this.selectedCategoryIndex = index;
      this.selectedCategory = this.mainCategories[index]; // Asigna el nombre de la categoría seleccionada
      this.fetchPhotosForCategory(this.selectedCategory);
    },
    async fetchPhotosForCategory(category) {
  try {
    const photos = await getPhotosByCategory(category);
    console.log('Fotos obtenidas para', category, photos);  // Verifica la cantidad de imágenes obtenidas
    
    this.selectedSubCategories = this.subCategoriesData[this.selectedCategory].map((subCategory, index) => {
      const photo = photos[index % photos.length] || { src: { medium: "https://via.placeholder.com/80" } };
      return {
        ...subCategory,
        image: photo.src.medium,
      };
    });
  } catch (error) {
    console.error("Error al obtener fotos para la categoría:", error);
      }
    },
  },
  async created() {
    // Obtener fotos usando la API al principio
    if (this.mainCategories.length > 0) {
      await this.fetchPhotosForCategory(this.mainCategories[0]); // Llamamos con la primera categoría al iniciar
    }
  },
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
    z-index: 9999;
  }
  
  .modal-content {
    display: flex;
    flex-direction: row; /* Alineación en columnas */
    background-color: #fff;
    width: 90%; /* Ajusta este valor si es necesario */
    max-width: 900px;
    height: 75vh;
    border-radius: 8px;
    overflow: hidden;
}
  
.left-panel {
    flex: 0 0 25%; /* Fija el ancho del panel de categorías */
    background-color: #f8f8f8;
    padding: 20px;
    border-right: 1px solid #ddd;
    overflow-y: auto;
}

  
  
  .panel-title {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 15px;
  }
  
  .left-panel ul {
    list-style-type: none;
    padding: 0;
  }
  
  .left-panel li {
    padding: 10px 15px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
  }
  
  .left-panel li:hover,
  .left-panel li.active {
    background-color: #e0e0e0;
    font-weight: bold;
  }
  
  .right-panel {
    flex: 1; /* Ocupa el resto del espacio disponible */
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

  
.sub-category-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* Permite que las columnas se adapten al espacio disponible */
    grid-gap: 20px; /* Espacio entre los elementos */
    width: 100%; /* Asegura que el contenedor ocupe todo el ancho del panel derecho */
}


  
  .sub-category {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    

  }
  
  .category-image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .category-name {
    font-size: 0.85em;
    font-weight: bold;
    color: #000000;
  }
  
  .hot-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: #ff5733;
    color: #fff;
    font-size: 0.7em;
    padding: 2px 4px;
    border-radius: 3px;
    font-weight: bold;
  }
  </style>
  