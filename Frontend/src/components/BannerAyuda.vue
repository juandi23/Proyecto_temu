<template>
  
    <div class="centro-ayuda">
    <!-- Botón para traducir el contenido -->
    <button @click="traducirContenido">Traducir al ingles</button>
    <!-- Header -->


    <div class="header">
      <nav class="breadcrumb">
        <router-link to="/">Inicio</router-link> &gt;
        <span>Centro de ayuda</span>
      </nav>
      <h1>Hola, ¿cómo podemos ayudarte?</h1>
      <p>Selecciona un pedido para obtener ayuda con problemas de artículos, envíos, devoluciones, reembolsos, etc.</p>
    </div>

    <!-- Temas recomendados -->
    <div class="temas-recomendados">
    <h2>Temas recomendados</h2>
    <div class="temas-grid">
      <div
        :class="['tema', 'tema-recomendado']"
        v-for="tema in temasRecomendados"
        :key="tema"
        @click="mostrarAyuda(tema)"
      >
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
        <div v-if="preguntasFrecuentesFiltradas.length > 0" class="preguntas-frecuentes">
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
        { titulo: 'Envío y entrega', icono: 'fas fa-truck', abierto: false, subtemas: ['Envío', 'Entrega'] },
        { titulo: 'Devolución y reembolso', icono: 'fas fa-dollar-sign', abierto: false, subtemas: ['Devolución', 'Reembolso'] },
        { titulo: 'Producto y existencias', icono: 'fas fa-box-open', abierto: false, subtemas: ['Existencias','Talla y ajuste'] },
        { titulo: 'Administrar mi cuenta', icono: 'fas fa-user', abierto: false, subtemas: ['Configuración de la cuenta','Inicio de sesión'] },
        { titulo: 'Pago y promociones', icono: 'fas fa-credit-card', abierto: false, subtemas: ['Pagos', 'Crédito Temu', 'Promociones'] },
        { titulo: 'Tu seguridad', icono: 'fas fa-shield-alt', abierto: false, subtemas: ['Seguridad y privacidad'] },
        { titulo: 'Políticas y otros', icono: 'fas fa-ellipsis-h', abierto: false, subtemas: ['Políticas','Comentarios y consultas de colaboración'] },
        { titulo: 'Solicitar un artículo', icono: 'fas fa-edit', abierto: false, subtemas: ['Solicitar un artículo'] }
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

        { subtema: 'Envío', 
          titulo: '¿Por qué mi pedido está tardando más tiempo de lo normal?', 
          contenido: `<p>Nuestro almacén normalmente procesa todos los pedidos en un plazo de 1 a 3 días. Sin embargo, si tu pedido tarda más tiempo en procesarse, podría deberse a artículos específicos dentro de tu pedido que tienen tiempos de procesamiento más largos de lo normal.</p>
                <p>Puedes ver el tiempo de entrega estimado para cada artículo en tu pedido en las páginas de producto específicas. Si deseas recibir los otros artículos en tu pedido lo antes posible, puedes cancelar los otros artículos de procesamiento más prolongado para obtener un reembolso. Los artículos restantes pueden enviarse inmediatamente.</p>
                <p>Sabemos que estás entusiasmado por obtener tu pedido, ¡y nosotros también lo estamos! Si tu pedido llega tarde, te emitiremos un crédito de COP 4000 (envío estándar o Punto de recogida ) a tu cuenta como un pequeño signo de agradecimiento por tu paciencia</p>`,
   
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },

        { subtema: 'Entrega', 
          titulo: '¿Por qué no hay actualización de rastreo?', 
          contenido: `<p>Si no has recibido ninguna actualización de rastreo de tu pedido desde el envío, es muy probable que se deba a que se envió desde nuestros almacenes en el extranjero. El rastreo no se actualizará hasta que tu paquete llegue a los Estados Unidos y sea retirado por nuestro repartidor de envío local para entregarlo en tu puerta. El socio de envío local escaneará tu paquete (durante los días hábiles únicamente) para actualizar su información de rastreo.</p>
                <p>Puedes hacer un rastreo de tu pedido en la página "Tus pedidos" de Temu.com o en la aplicación Temu. Desde allí, podrás encontrar tu pedido y hacer clic en "Rastrear" para ver la información de rastreo más reciente.</p>

                <p>Sabemos que estás entusiasmado por obtener tu pedido, ¡y nosotros también lo estamos! Si tu pedido llega tarde, te emitiremos un crédito de COP 4000 (envío estándar)  a tu cuenta como un pequeño signo de agradecimiento por tu paciencia.</p>`,
   
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },

        { subtema: 'Devolución', 
          titulo: '¿Cuál es el estado de mi devolución o intercambio?', 
          contenido: `<p>Puedes rastrear el estado de tu devolución si vas a tu cuenta de Temu desde la aplicación Temu o Temu.com. Ve a "Tus pedidos" > "Devoluciones". Desde allí, podrás rastrear el estado de tu devolución, cuándo recibimos tu paquete y cuándo se emitió tu reembolso.</p>`,
   
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },

        { subtema: 'Reembolso', 
          titulo: '¿Cómo realizo un rastreo de mi reembolso?', 
          contenido: `<p>Puedes realizar un rastreo del progreso de tu reembolso a través de cualquiera de las siguientes maneras:

1. Ve a "Tus pedidos" en la aplicación Temu o en Temu.com, busca el pedido correspondiente y haz clic para ver sus detalles. Desplázate hasta el artículo reembolsado y haz clic en "Detalles". A continuación, puedes checar el estado de tu reembolso y el método de reembolso para cada artículo reembolsado.</p>
                <p>2. Ve a tu cuenta en la aplicación Temu o en Temu.com, busca la sección "Mensajes" y haz clic en la notificación de tu mensaje de reembolso para ver los detalles.</p>
                <p>3. Si habilitaste las notificaciones por mensaje de texto o correo electrónico para tu pedido, también puedes hacer clic en los enlaces para realizar un rastrep del estado de tu reembolso.

Una vez que Temu emita tu reembolso, espera de 5 a 14 días hábiles (hasta 30 días) para que el reembolso se refleje en tu método de pago original, ya que los tiempos de procesamiento varían según las instituciones financieras. Si optas por un reembolso de crédito Temu, se añadirá rápidamente a tu saldo de crédito Temu en 3 minutos.</p>`,
   
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },

        { subtema: 'Existencias', 
          titulo: '¿Cómo puedo saber si un artículo está en stock?', 
          contenido: `<p>Puede verificar si un artículo está en stock yendo a la página de detalles del producto. Desde allí, puede ver qué tallas/colores están disponibles y, si el inventario está bajando, también puede ver una alerta que le indica exactamente cuántos artículos quedan.</p>
                <p>Para cualquier pregunta específica sobre un artículo o su disponibilidad, no dudes en ponerte en contacto con nosotros.</p>`,
   
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },

        { subtema: 'Talla y ajuste', 
          titulo: 'La talla es demasiado pequeña/grande y no me queda bien', 
          contenido: `<p>Lamentamos que no esté contento/a con el ajuste de su prenda. Algunas piezas pueden tener un ajuste diferente según el estilo, como sudaderas y camisetas oversize que suelen ser más grandes que las medidas generales.</p>
                <p>Si no está satisfecho/a con su prenda, puede devolverla para obtener un reembolso completo y volver a pedirla en una talla diferente, si está disponible. Casi todos los artículos pueden ser dev y devolución y reembolso, con excepción de las prendas que han sido usadas, lavadas, dañadas, y las sin etiquetas, empaque o etiqueta de higiene o en un conjunto incompleto.</p>
                 <p>Para futuros pedidos, puede contactarnos si tiene cualquier pregunta sobre las tallas y medidas de los productos.</p>
                  <p>En Temu, la inclusión y la diversidad constituyen uno de nuestros valores fundamentales y estamos constantemente tratando de mejorar nuestras ofertas para seguir permitiendo a nuestros clientes disfrutar de la mejor calidad, flexibilidad y variedad en su selección de productos</p>`,
   
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },

        { subtema: 'Configuración de la cuenta', 
          titulo: '¿Cómo configurar las preferencias de notificación?', 
          contenido: `<p>Si no quieres recibir notificaciones por email, push o SMS, puedes abrir la aplicación Temu, ir a 'Tú' > 'Configuración' > 'Notificaciones' y elegir ' Editar' para establecer tus preferencias.</p>
          <p>También puedes ir a Temu.com y hacer clic en tu nombre de usuario en la parte superior derecha de la pantalla. Haz clic en "Notificaciones" en la barra lateral izquierda y luego elige "Editar" para establecer tus preferencias.</p>`,
   
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },

        { subtema: 'Inicio de sesión', 
          titulo: 'Cómo crear una cuenta Temu', 
          contenido: `<p>¡Bienvenido a Temu! Nos encantaría ayudarte a que te unas a nuestra comunidad.</p>
          <p>Para registrarte en una cuenta de Temu:</p>
          <p>1. Descarga y abre tu aplicación Temu o visita Temu.com.</p>
          <p>2. Ingresa en el avatar del usuario en la aplicación Temu y haz clic en "Iniciar sesión/Registrarse" en la parte superior de la página, o haz clic en "Iniciar sesión/Registrarse" en la esquina superior derecha de Temu.com.</p>
          <p>3. Revisa detenidamente los Términos de uso y la Política de privacidad de Temu.</p>
                <p>4. Puedes utilizar tu dirección de email o número de teléfono para crear una cuenta y configurar una nueva contraseña, o bien puedes hacer clic en "Continuar con Google", "Continuar con Facebook", "Continuar con Twitter" o "Continuar con Apple" para iniciar sesión con tus cuentas actuales.</p>`,
   
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },

        { subtema: 'Pagos', 
          titulo: 'Cargos desconocidos', 
          contenido: `<p>El cargo desconocido es una autorización bancaria.</p>
          <p>Cuando realiza un pedido, Temu se comunica con el banco emisor para confirmar la validez del método de pago. Tu banco reserva los fondos hasta que se procese la transacción o caduque la autorización. Esta reserva aparece inmediatamente en tu estado de cuenta, pero no es un cargo real.</p>
          <p>Si cancelas tu pedido, la autorización se elimina de tu cuenta de acuerdo con las políticas de tu banco. Ponte en contacto con tu banco para aclarar cuánto tiempo tienen para poner autorizaciones en espera para pedidos en línea.</p>
          <p>Veo un cargo en mi tarjeta de crédito que no reconozco</p>
                <p>Si ves una compra o un cargo en la tarjeta de crédito que no reconoces, verifica con familiares, amigos o compañeros de trabajo que puedan haber tenido acceso a tu dispositivo o permiso para usar tu tarjeta.</p>
                <p>Si crees que tu cuenta de Temu se ha visto comprometida, inicia sesión para cambiar tu contraseña.
Desde la seguridad de tu cuenta, edita la contraseña y cambia tu contraseña de Temu.</p>
<p> Si aún necesitas ayuda, se te pedirá que proporciones la mayor cantidad de información posible para ayudarnos a resolver tu problema. Por tu seguridad, no incluyas la información completa de tu cuenta bancaria.</p>`,
   
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },

        { subtema: 'Crédito Temu', 
          titulo: '¿Qué es el crédito de Temu?', 
          contenido: `<p>Los créditos Temu son créditos de compras que se pueden utilizar para pagar pedidos en la aplicación Temu o en Temu.com. Existen varias maneras en las que puede recibir créditos Temu que incluyen:</p>
          <p>- Recompensas por participar en nuestras actividades temáticas y eventos promocionales</p>
          <p>- Créditos como parte de nuestra política de entrega tardía</p>
          <p>- Reembolso de los pagos cuando elijas créditos Temu para recibir un reembolso en un plazo de 3 minutos en lugar de recibirlo de vuelta en el método de pago original.</p>`,
   
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },


        { subtema: 'Promociones', 
          titulo: 'Cómo canjear un código de cupón', 
          contenido: `<p>Cuando realizas un pedido, nuestro sistema aplicará automáticamente el cupón óptimo que te ayudará a maximizar tus ahorros. Se puede aplicar únicamente un cupón por pedido.</p>
          <p>Asegúrate de que tus cupones no utilizados estén en tu cuenta para tu uso en la página de tu cuenta Temu desde la aplicación Temu o en Temu.com. Selecciona "Códigos de cupón" en el menú para ver tus cupones no utilizados y vencidos.</p>
          <p>Si tienes un nuevo código de cupón que deseas agregar a tu cuenta, ingrésalo en el campo de entrada en la pestaña "No usado" y haz clic en "Aplicar"</p>`,
   
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },

        { subtema: 'Seguridad y privacidad', 
          titulo: 'Protégete de los mensajes de texto no deseados y las estafas de phishing', 
          contenido: `<p>¡Cuidado con los mensajes de spam, correos electrónicos y llamadas telefónicas! Los estafadores utilizan con frecuencia estos métodos de comunicación para robar información personal y financiera. Para protegerse, te recomendamos que no respondas a estos mensajes o llamadas, y evites hacer clic en enlaces en correos electrónicos o mensajes de texto de fuentes desconocidas. Si no estás seguro de la legitimidad de un mensaje, es mejor tomar precauciones e informarnos. Si necesitas ayuda, comunícate con nuestro equipo de atención al cliente e investigaremos tus reportes a fondo para garantizar que tu información permanezca segura y protegida.</p>
          <p>Dinos si:</p>
          <p>1. Un tercero desconocido se puso en contacto contigo diciendo ser un repartidor y pidiéndote gastos de envío adicionales.</p>
          <p>2. Se te acercó un vendedor que decía ser de Temu pidiéndote que realizaras transacciones a través de otros canales ajenos a Temu (código QR, monedero electrónico, transferencia bancaria, etc.).</p>
                <p>3. Fuiste engañado para comprar artículos e iniciar pagos/transacciones en un sitio web/app falso similar al de Temu con una notificación de que habías ganado algo.</p>
                <p>4. Recibiste algun mensaje de un número desconocido ofreciéndote un servicio financiero o un trabajo de tiempo parcial, y te pidieron que rellenaras información personal (por ejemplo, la información de tu cuenta Temu o el número de transacción).</p>
                <p>5. Recibiste una llamada de un número desconocido pidiéndote que revelaras/verificaras tu información personal u ofreciéndote un reembolso que no solicitaste.</p>`,
   
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },

        { subtema: 'Políticas', 
          titulo: '¿Cuál es la política de envío de Temu?', 
          contenido: `<p>¿Cuál es la política de envío de Temu?</p>
          <p>Visita nuestra página de información de envío para ver más detalles sobre nuestra política de envío.</p>`,
   
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },

        { subtema: 'Comentarios y consultas de colaboración', 
          titulo: '¿Cómo puedo enviar mis comentarios?', 
          contenido: `<p>La experiencia de nuestros clientes es lo más importante para nosotros y agradeceríamos mucho tus comentarios. Si tienes alguna sugerencia para mejorar, comunícate con nuestro equipo de atención al cliente a través de nuestro sitio web en https://temu.com o en la aplicación Temu.</p>`,
   
          abierta: false,
          util: null,
          razon: '',
          comentarios: ''
        },

        { subtema: 'Solicitar un artículo', 
          titulo: 'Solicitar un artículo', 
          contenido: `<p>¿No encuentras lo que buscas?</p>
          <p>Puedes pegar el enlace de un artículo que quieras que esté en otras plataformas de comercio electrónico o cargar una captura de pantalla del artículo en otras plataformas.</p>`,
   
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

  mostrarAyuda(tema) {
        // Redirige o selecciona el subtema correspondiente al tema recomendado
        this.subtemaSeleccionado = tema;
      },
      seleccionarSubtema(subtema) {
        this.subtemaSeleccionado = subtema;
      },
      togglePregunta(index) {
        this.preguntasFrecuentesFiltradas[index].abierta = !this.preguntasFrecuentesFiltradas[index].abierta;
      }
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

.breadcrumb {
  font-size: 14px;
  margin-bottom: 10px;
}

.breadcrumb a {
  color: #3498db; /* Color para los enlaces */
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline; /* Subrayado al pasar el cursor */
}

</style>