<template>
  
    <div class="centro-ayuda">
    <!-- Botón para traducir el contenido -->
    <button @click="traducirContenido">Traducir al ingles</button>
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
            <p v-if="pregunta.abierta" class="pregunta-contenido" v-html="pregunta.contenido"></p>


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
      <button @click="abrirChat">Contáctanos</button>
      <div v-if="mostrarChat" class="chat-modal">
        <div class="chat-content">
          <button @click="cerrarChat" class="close-btn">X</button>
          <h2>Atención al Cliente</h2>
          <p>Hola, soy el asistente virtual de Temu. Bienvenido al servicio de atención al cliente de Temu.</p>
          <p>¿En qué puedo ayudarle?</p>
          <!-- Campo de entrada del mensaje del cliente -->
          <input type="text" v-model="mensajeCliente" placeholder="Escribe tu mensaje aquí..." />
          <button @click="enviarMensaje">Enviar</button>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import { translateText } from '@/services/translateService';

export default {
  data() {
    return {
      mostrarChat: false,
      mensajeCliente:'',
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
          contenido: `<p>¿Tienes algo en mente? Estamos aquí para ayudarte.</p>
                <p>Si tienes preguntas sobre artículos específicos, envíanos un mensaje directamente desde la aplicación Temu o a través de Temu.com.</p>
                <p>Para otras preguntas sobre nuestras políticas u otros temas, te recomendamos que ingreses a nuestro Centro de Ayuda, donde respondemos las preguntas más comunes de nuestros clientes. ¡Felices compras!</p>`,
   
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },
        { subtema: 'Comprar en Temu', 
          titulo: 'Cómo buscar artículos en Temu', 
          contenido: `<p>Describe lo que buscas en la barra de búsqueda para iniciar tu búsqueda. Por ejemplo: "vestido de fiesta" o "pantalones cortos de mezclilla blanca". Ingresa varios términos descriptivos para reducir los resultados. Por ejemplo, si usas "vestido negro pequeño" como término de búsqueda generalmente esto producirá más resultados específicos que si escribes "vestido".</p>
                <p>Los resultados de la búsqueda están ordenados según la relevancia con los artículos que buscas. Puedes utilizar la opción "Clasificar por" para reordenar los resultados de la búsqueda según tus preferencias.</p>
                <p>Para las búsquedas que deseas seguir en el escritorio, puedes hacer clic en el botón naranja "Guardar" y recibir notificaciones cuando se publiquen nuevos artículos que se ajusten a tu búsqueda.</p>`,
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },
        { subtema: 'Comprar en Temu', 
          titulo: 'Cómo comprar un artículo en Temu', 
          contenido: `<p>Si tienes alguna pregunta sobre un artículo cuando compras en Temu, no dudes en enviarnos directamente un mensaje.</p>
                <p>Ten la seguridad de que puedes comprar con confianza con la política de devolución y reembolso de Temu y el Programa de Protección de Compras de Temu.</p>
                <p>Casi todos los artículos que compraste en Temu se pueden devolver y reembolsar en un plazo de 90 días si no son de tu agrado, con solo algunas excepciones:</p>
                <ul>
                  <li>Prendas de vestir que hayan sido usadas, lavadas, dañadas o a las que se les hayan quitado las etiquetas, el embalaje o las pegatinas de higiene, o que formen parte de un juego incompleto.</li>
                  <li>Artículos etiquetados específicamente como no retornables.</li>
                  <li>Artículos personalizados.</li>
                  <li>Algunos regalos.</li>
                </ul>
                <p>Además, gracias al Programa de Protección de Compras de Temu, ofrecemos reembolsos completos de cualquier artículo que no llegue, llegue dañado o no sea como se describe.</p>
                <p>En cuanto hagas clic en la compra y completes el pago, ¡felicitaciones! realizaste una compra en Temu. Te enviaremos un email confirmando los artículos en tu pedido. También puedes ver la información en "Tus pedidos" en la página de tu cuenta en la aplicación Temu o en Temu.com.</p>`,
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },
        { subtema: 'Comprar en Temu', 
          titulo: 'Recibí un email sobre un pedido que no hice', 
          contenido: `<p>Si recibiste una confirmación por email sobre un pedido que no hiciste, primero consulta con tu familia y amigos para ver si han utilizado accidentalmente los detalles de tu cuenta para realizar un pedido. También puede ser posible que:</p>
                <ul>
                  <li>Se haya escrito mal la dirección de email al registrarse para obtener una cuenta en Temu.</li>
                  <li>Se haya creado una cuenta de Temu con tu dirección de email.</li>
                  <li>Se haya hecho un pedido desde una computadora en la que iniciaste sesión en Temu.</li>
                </ul>
                <p>Si sospechas de actividad fraudulenta, te recomendamos que cambies inmediatamente la contraseña de tu cuenta para protegerla y evitar futuros pedidos no autorizados.</p>`,
    
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },
        { subtema: 'Comprar en Temu', 
          titulo: 'Cómo seguir proveedores comerciales', 
          contenido: `<p>¡Lleva un registro de los proveedores que te encantan siguiéndolos en Temu!</p>
                <p>Lo único que debes hacer es ir a la página del proveedor y hacer clic en el botón "Seguir".</p>
                <p>Puedes encontrar el proveedor que vende los artículos que amas haciendo clic en su nombre en la página de detalles del producto o en la página de detalles del pedido.</p>
                <p>Para ver los proveedores que sigues, ve a la página de tu cuenta en la aplicación Temu o en Temu.com. Haz clic en "Proveedores que sigo" para ver los proveedores que te gustaron.</p>`,
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },
        { subtema: 'Comprar en Temu', 
          titulo: 'Consejos para comprar de forma segura en Temu', 
          contenido: `<p>Estas son algunas de las prácticas recomendadas que garantizan compras seguras en Temu.</p>
                <h3>Seguridad de la tarjeta de crédito</h3>
                <ul>
                  <li>Nunca informes todo el número de tu tarjeta de crédito, número de identificación fiscal o contraseña en un email, mensaje de Temu o teléfono.</li>
                  <li>Revisa regularmente el estado de cuenta de tu tarjeta de crédito para rastrear tus gastos y la actividad de tu tarjeta.</li>
                  <li>Lleva un registro de tu tarjeta de crédito: quién está autorizado para usarla y quién tiene acceso a ella.</li>
                </ul>
                <h3>Seguridad en Internet o con la computadora</h3>
                <ul>
                  <li>Cambia tus contraseñas regularmente. Cuanto más compleja sea una contraseña, mejor estará protegida.</li>
                  <li>Si compartes tu computadora o dispositivo, cierra sesión en las cuentas de sitios web antes de permitir que otros los usen.</li>
                </ul>
                <h3>En Temu</h3>
                <ul>
                  <li>Averigua cómo la política de devolución y reembolso de Temu te ayuda a obtener un reembolso total del artículo. Casi todos los artículos que compraste en Temu pueden ser devueltos y reembolsados si no son de tu agrado, con solo algunas excepciones:</li>
                  <ul>
                    <li>(1) Prendas de vestir que hayan sido usadas, lavadas, dañadas o a las que se les hayan quitado las etiquetas, el embalaje o las pegatinas de higiene, o que formen parte de un juego incompleto.</li>
                    <li>(2) Artículos etiquetados específicamente como no retornables.</li>
                    <li>(3) Artículos personalizados.</li>
                    <li>(4) Algunos regalos.</li>
                  </ul>
                  <li>Obtén información sobre el Programa de Protección de Compras de Temu, que ofrece reembolsos completos de todo artículo que no llegue, llegue dañado o que no sea como se describe.</li>
                  <li>Registra tus transacciones en Temu. No podemos verificar ni asistir las transacciones hechas fuera de Temu.</li>
                  <li>Si recibes un email sospechoso en el que se afirma ser de Temu, comunícalo a nuestro servicio de atención al cliente.</li>
                </ul>`,
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },
        { subtema: 'Comprar en Temu', 
          titulo: '¿Temu apoya el envío directo?', 
          contenido: `<p>Temu no permite el envío directo. Conectamos a nuestros consumidores con millones de vendedores, fabricantes y marcas de todo el mundo, y vendemos exclusivamente en nuestro sitio web o en la App de Temu.</p>
                <p>Le recomendamos comprar directamente a través de nuestra plataforma para poder ayudarle con cualquier servicio posventa y para que usted pueda participar en nuestras últimas ofertas y promociones.</p>
                <p>¡Esperamos que disfrute comprando en Temu!</p>`,
   
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },

        {subtema: 'Antes de tu compra',
         titulo: '¿Qué debo saber antes de comprar en Temu?',
         contenido: `<p>Antes de realizar tu compra en Temu, revisa la disponibilidad de los artículos y la información sobre devoluciones en caso de que necesites cambiar o devolver tu producto.</p>
                    <p>Lee también nuestras políticas de compra y revisa la información de cada vendedor para asegurarte de que el producto cumpla con tus expectativas.</p>
                    <p>Si necesitas más información sobre un artículo en específico, puedes contactar al vendedor directamente desde la página del producto.</p>`,
         abierta: false,
         util: null,
         razon: '',
         comentarios: ''
        },

        {
          subtema: 'Antes de tu compra',
          titulo: '¿Qué debo saber antes de comprar en Temu?',
          contenido: `<p>Antes de realizar tu compra en Temu, revisa la disponibilidad de los artículos y la información sobre devoluciones en caso de que necesites cambiar o devolver tu producto.</p>
                      <p>Lee también nuestras políticas de compra y revisa la información de cada vendedor para asegurarte de que el producto cumpla con tus expectativas.</p>
                      <p>Si necesitas más información sobre un artículo en específico, puedes contactar al vendedor directamente desde la página del producto.</p>`,
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },

        {
          subtema: 'Buscar mi pedido',
          titulo: '¿Cómo puedo hacer un seguimiento de mi pedido?',
          contenido: `<p>Para hacer un seguimiento de tu pedido, inicia sesión en tu cuenta de Temu y dirígete a "Mis pedidos". Aquí verás el estado de todos tus pedidos en curso.</p>
                      <p>Si has recibido un número de seguimiento, puedes utilizarlo en el sitio web del transportista para obtener más información detallada sobre la ubicación de tu pedido.</p>
                      <p>Si tienes problemas para rastrear tu pedido, comunícate con nuestro equipo de soporte para recibir asistencia.</p>`,
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },

        {
          subtema: 'Cambios de pedido',
          titulo: '¿Puedo hacer cambios en mi pedido después de haberlo realizado?',
          contenido: `<p>Una vez que has realizado un pedido, no es posible modificar los artículos seleccionados, pero puedes cancelar el pedido si aún no ha sido procesado.</p>
                      <p>Para cancelar un pedido, dirígete a "Mis pedidos" en tu cuenta, selecciona el pedido que deseas cancelar y elige la opción de cancelación. Asegúrate de verificar los plazos de cancelación en nuestra política de pedidos.</p>
                      <p>Si el pedido ya fue procesado, tendrás que esperar a recibirlo y luego realizar una devolución según nuestra política de devoluciones.</p>`,
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },

        {
          subtema: 'Reseñas',
          titulo: '¿Cómo puedo dejar una reseña sobre un producto?',
          contenido: `<p>Para dejar una reseña sobre un producto que has comprado, inicia sesión en tu cuenta de Temu, ve a "Mis pedidos" y selecciona el pedido del producto que deseas reseñar.</p>
                      <p>Una vez en la página de detalles del pedido, encontrarás la opción para calificar y escribir una reseña sobre el producto. Tus opiniones ayudan a otros compradores a tomar decisiones informadas.</p>
                      <p>Gracias por compartir tu experiencia en Temu.</p>`,
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

    async traducirContenido() {
  try {
    // Traducción de temas recomendados
    for (let i = 0; i < this.temasRecomendados.length; i++) {
      if (this.temasRecomendados[i]) {
        this.temasRecomendados[i] = await translateText(this.temasRecomendados[i], 'en');
      }
    }

    // Traducción de preguntas frecuentes
    for (let i = 0; i < this.preguntasFrecuentes.length; i++) {
      if (this.preguntasFrecuentes[i].titulo) {
        this.preguntasFrecuentes[i].titulo = await translateText(this.preguntasFrecuentes[i].titulo, 'en');
      }
      if (this.preguntasFrecuentes[i].contenido) {
        // Convierte contenido HTML a texto plano si es necesario
        let contenidoTexto = this.preguntasFrecuentes[i].contenido.replace(/<[^>]+>/g, ''); // Quita etiquetas HTML
        this.preguntasFrecuentes[i].contenido = await translateText(contenidoTexto, 'en');
      }
    }

    alert('Traducción completada');
  } catch (error) {
    console.error('Error al traducir el contenido:', error);
    alert('Hubo un error al traducir el contenido. Por favor, intenta de nuevo.');
  }
},




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
    // Muestra la alerta de éxito
    alert("¡Haz realizado el comentario con éxito!");

    // Borra el contenido del textarea
    pregunta.comentarios = '';
  },
  abrirChat() {
    this.mostrarChat = true;
    
  },
  cerrarChat() {
    this.mostrarChat = false;
  },
  enviarMensaje() {
    if (this.mensajeCliente.trim() !== '') { // Asegura que el mensaje no esté vacío
      alert("¡Mensaje enviado con éxito!");
      this.mensajeCliente = ''; // Borra el contenido del campo de entrada
    } else {
      alert("Por favor, escribe un mensaje antes de enviar.");
    }
  },
  }
};
</script>




<style>
.chat-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.chat-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}


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