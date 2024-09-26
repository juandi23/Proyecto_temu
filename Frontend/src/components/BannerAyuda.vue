<template>
  <div class="centro-ayuda">
    <!-- Header -->
    <div class="header">
      <div class="breadcrumb">Inicio &gt; Centro de ayuda</div>
      <h1>Hola, ¿cómo podemos ayudarte?</h1>
      <p>Selecciona un pedido para obtener ayuda con problemas de artículos, envíos, devoluciones, reembolsos, etc.</p>
    </div>

    <!-- Temas recomendados -->
    <div class="temas-recomendados">
      <h2>Temas recomendados</h2>
      <div class="temas-grid">
        <div :class="['tema', 'tema-recomendado']" v-for="tema in temasRecomendados" :key="tema">

          {{ tema }}
          <span class="arrow">></span>
        </div>
      </div>
    </div>

    <!-- Registros de atención al cliente -->
    <div class="registros-link">
      <a href="#">Registros de atención al cliente &gt;</a>
    </div>

    <!-- Sección principal con sidebar y preguntas frecuentes -->
    <div class="main-content">
      <h2>Todos los temas de ayuda</h2>
      <div class="contenedor-ayuda">
        <!-- Sidebar -->
        <div class="temas-sidebar">
          <!-- Opciones del menú lateral -->
          <div v-for="(tema, index) in temasAyuda" :key="index" class="tema-grupo">
            <div class="tema-titulo" @click="toggleTema(index)">
              <i :class="tema.icono" class="tema-icono"></i>
              {{ tema.titulo }}
              <span class="flecha" :class="{ 'abierto': tema.abierto }">▼</span>
            </div>
            <!-- Subopciones que se despliegan al hacer clic -->
            <ul v-if="tema.abierto" class="subtemas">
              <li v-for="subtema in tema.subtemas" :key="subtema" @click="seleccionarSubtema(subtema)">
                <button
                  @click="seleccionarSubtema(subtema)"
                  :class="{'subtema-boton': true, 'subtema-seleccionado': subtema === subtemaSeleccionado}"
                >
                  {{ subtema }}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <!-- Lista de preguntas frecuentes dinámicas según la subopción seleccionada -->
        <div class="preguntas-frecuentes">
          <div v-for="(pregunta, index) in preguntasFrecuentesFiltradas" :key="index">
            <button @click="togglePregunta(index)" class="pregunta-titulo">
              {{ pregunta.titulo }}
              <span class="flecha" :class="{ 'abierto': pregunta.abierta }">▼</span>
            </button>
            <p v-if="pregunta.abierta" class="pregunta-contenido">{{ pregunta.contenido }}</p>

            <!-- Opción de '¿Es útil?' dentro del bloque de cada pregunta -->
            <div v-if="pregunta.abierta">
              <p>¿Esto es útil?</p>
              <button @click="marcarUtil(pregunta, 'si')">Sí 👍</button>
              <button @click="marcarUtil(pregunta, 'no')">No 👎</button>

              <!-- Mostrar el formulario o el mensaje según la opción -->
              <div v-if="pregunta.util === 'si'">
                ¡Gracias por tus comentarios!
              </div>

              
              <div v-if="pregunta.util === 'no'">
                <form @submit.prevent="enviarFeedback(pregunta)">
                  <label>¿Por qué no fue útil?</label>
                  <select v-model="pregunta.razon">
                    <option value="informacion">No puedo entender la información</option>
                    <option value="problema">No resolvió el problema</option>
                    <option value="otro">Otro</option>
                  </select>
                  <textarea v-model="pregunta.comentarios" placeholder="Escribe más detalles..."></textarea>
                  <button type="submit">Enviar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sección de contacto -->
    <div class="contacto">
      <h3>¿Aún no se resuelve el problema?</h3>
      <button>Contáctanos</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      temaSeleccionado: null,
      temasRecomendados: [
        "Cargos desconocidos",
        "Cómo devolver o intercambiar un artículo en Temu",
        "¿Cómo puedo enviar mis artículos de regreso?",
        "Denuncia algo sospechoso",
        "Mi información de seguimiento dice que mi paquete ya fue entregado, pero no lo he recibido.",
        "¿Qué debo hacer si me faltan artículos de mi pedido?",
        "¿Cómo realizar un rastreo de mi reembolso?",
        "¿Qué sucede si recibí un artículo dañado o que no era como estaba descrito?",
        "Es seguro comprar en Temu"
      ],
      temasAyuda: [
        {
          titulo: 'Problemas con el pedido',
          icono: 'fas fa-box',
          abierto: true,
          subtemas: ['Comprar en Temu', 'Antes de tu compra', 'Buscar mi pedido', 'Cambios de pedido', 'Reseñas']
        },
        { titulo: 'Envío y entrega', icono: 'fas fa-truck', abierto: false, subtemas: [] },
        { titulo: 'Devolución y reembolso', icono: 'fas fa-dollar-sign', abierto: false, subtemas: [] },
        { titulo: 'Producto y existencias', icono: 'fas fa-box-open', abierto: false, subtemas: [] },
        { titulo: 'Administrar mi cuenta', icono: 'fas fa-user', abierto: false, subtemas: [] },
        { titulo: 'Pago y promociones', icono: 'fas fa-credit-card', abierto: false, subtemas: [] },
        { titulo: 'Tu seguridad', icono: 'fas fa-shield-alt', abierto: false, subtemas: [] },
        { titulo: 'Políticas y otros', icono: 'fas fa-ellipsis-h', abierto: false, subtemas: [] },
        { titulo: 'Solicitar un artículo', icono: 'fas fa-edit', abierto: false, subtemas: [] }
      ],
      preguntasFrecuentes: [
        { subtema: 'Comprar en Temu', 
          titulo: 'Cómo obtener ayuda antes de comprar', 
          contenido: 'Contenido de la pregunta...',
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },
        { subtema: 'Comprar en Temu', 
          titulo: 'Cómo buscar artículos en Temu', 
          contenido: 'Para comprar, sigue estos pasos...',
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },
        { subtema: 'Comprar en Temu', 
          titulo: 'Cómo comprar un artículo en Temu', 
          contenido: 'Aceptamos tarjetas de crédito, débito y PayPal...',
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },
        { subtema: 'Comprar en Temu', 
          titulo: 'Recibí un email sobre un pedido que no hice', 
          contenido: 'Aceptamos tarjetas de crédito, débito y PayPal...',
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },
        { subtema: 'Comprar en Temu', 
          titulo: 'Cómo seguir proveedores comerciales', 
          contenido: 'Aceptamos tarjetas de crédito, débito y PayPal...',
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },
        { subtema: 'Comprar en Temu', 
          titulo: 'Consejos para comprar de forma segura en Temu', 
          contenido: 'Aceptamos tarjetas de crédito, débito y PayPal...',
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },
        { subtema: 'Comprar en Temu', 
          titulo: '¿Temu apoya el envío directo?', 
          contenido: 'Aceptamos tarjetas de crédito, débito y PayPal...',
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },
      ],
      subtemaSeleccionado: 'Comprar en Temu',
    };
  },
  computed: {
    preguntasFrecuentesFiltradas() {
      if (!this.subtemaSeleccionado) return [];
      return this.preguntasFrecuentes.filter(pregunta => pregunta.subtema === this.subtemaSeleccionado);
    }
  },
  methods: {
    toggleTema(index) {
      this.temasAyuda[index].abierto = !this.temasAyuda[index].abierto;
    },
    seleccionarSubtema(subtema) {
      this.subtemaSeleccionado = subtema;
    },
    togglePregunta(index) {
      this.preguntasFrecuentesFiltradas[index].abierta = !this.preguntasFrecuentesFiltradas[index].abierta;
    },
    marcarUtil(pregunta, valor) {
      pregunta.util = valor;
    },
    enviarFeedback(pregunta) {
      console.log('Comentarios enviados:', pregunta.comentarios);
    }
  }
};
</script>




<style>
.temas-sidebar {
  width: 30%;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 10px;
}


.tema-icono {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.flecha {
  margin-left: auto; /* Para asegurar que la flecha esté alineada a la derecha */
  transition: transform 0.3s ease;
}

.flecha.abierto {
  transform: rotate(180deg); /* Rota la flecha cuando está abierta */
}

.centro-ayuda {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  background: linear-gradient(to right, #2c3e50, #3498db);
  color: white;
  padding: 20px;
  border-radius: 5px 5px 0 0;
  text-align: center;
}

.header h1 {
  font-size: 2.5rem;
}

.header p {
  margin-top: 0.5rem;
  font-size: 1.2rem;
}

.temas-recomendados {
  background-color: white;
  padding: 20px;
  margin-top: 20px;
}

.temas-recomendados h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}




.temas-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.tema {
  border: 1px solid #e0e0e0;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.arrow {
  color: #3498db;
}

.registros-link {
  text-align: left; 
  margin-top: 40px;
  margin-bottom: 40px;
  padding-right: 20px; /* Ajusta el espaciado derecho */
  font-size: 20px   ;
  
}

.registros-link a {
  color: #000000;
  text-decoration: none;
  font-weight: bold; /* Añadir peso a la fuente */
}

.contenedor-ayuda {
  display: flex;
  justify-content: space-between;
  margin-top: 40px; /* Aumenta el margen superior */
  
}

.temas-sidebar {
  width: 30%;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 10px;
}

.tema-grupo {
  border-bottom: 1px solid #e0e0e0;
}

.tema-titulo {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;;
}

.tema-icono {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.flecha {
  margin-left: auto;
}

.flecha.abierto {
  transform: rotate(180deg);
}

.subtemas {
  list-style-type: none;
  padding: 0 0 0 10px;
  margin: 0;
  padding-left: 20px;
  
}

.subtema-item {
  margin-bottom: 5px;
}

.subtema-boton {
  background-color: #ffffff; /* Fondo normal */
  color: #999999; /* Color del texto normal */
  border: none;
  padding: 10px;
  text-align: left;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-weight: bold; /* Texto en negrita */
  font-size: 14px; /* Tamaño de fuente */
  
}

.subtema-boton:hover {
  background-color: #dcd9d1; /* Fondo al pasar el cursor */
  color: #000; /* Color del texto al pasar el cursor */
}

.subtema-boton:active {
  background-color: #f5d492; /* Fondo al hacer clic */
  color: #000000; /* Color del texto al hacer clic */
}

.subtema-seleccionado {
  background-color: #f5d492; /* Color de fondo del subtema seleccionado */
  color: rgb(0, 0, 0); /* Color del texto del subtema seleccionado */
  border-left: 10px solid #ff8800; /* Añadir borde izquierdo al subtema seleccionado */
}

.subtemas li {
  padding: 5px 0;
}

.subtemas li.activo {
  color: #ea8d14;
  font-weight: bold;
}

.preguntas-frecuentes {
  width: 65%;
  font-size: 1.1rem;


}

.pregunta {
  border: none;
  background: none;
  display: flex;
  width: 100%; /* Asegúrate de que el contenedor tome el 100% del espacio disponible */
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pregunta:hover {
  background-color: #f0f0f0; /* Cambia el fondo al pasar el mouse */
}

.pregunta h3 {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  
}

.pregunta-contenido {
  padding: 10px 0;
}

.pregunta-titulo {
  width: 100%;
  display: flex; /* Flexbox para alinear texto y flecha */
  justify-content: space-between; /* Espacio entre el texto y la flecha */
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  margin: 0; /* Quita el margen predeterminado */
  padding: 15px 0;
  background-color: #ffffff;
  border: none ;
}

.pregunta-titulo:hover {
  background-color: #e7e6e3; /* Fondo al pasar el cursor */
  color: #000; /* Color del texto al pasar el cursor */
}



.contacto {
  text-align: center;
  margin-top: 40px;
}

.contacto button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.contacto h3 {
  font-size: 1.1rem;
  margin-bottom: 10px;


}

.centro-ayuda {
  font-family: Arial, sans-serif;
}

</style>