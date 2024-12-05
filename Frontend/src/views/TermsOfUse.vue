<template>
  <div class="terms-of-use-container">

    <div class="text-gray-700 leading-relaxed">
            <button 
              @click="goToHome" 
              class="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-50 transition duration-300"
            >
              Inicio
            </button>
          </div>

    <div class="terms-of-use-content">
      <h1 class="terms-of-use-title">Términos de Uso</h1>
     
      <p class="terms-of-use-text">
        ¡Gracias por usar Temu! Estos Términos de uso ("Términos") contienen las reglas y restricciones que rigen el uso de nuestras aplicaciones, productos, servicios y sitios web ("Servicios"). Estos Términos constituyen un acuerdo vinculante entre usted y nosotros.
      </p>
      <p class="terms-of-use-text">
        Al completar el proceso de registro o explorar los Servicios, usted declara que (1) ha leído, comprende y acepta los Términos; (2) es mayor de edad para celebrar un contrato vinculante con nosotros; (3) tiene la autoridad para aceptar los Términos personalmente; y (4) si utiliza los Servicios en nombre de una empresa u otra entidad, (a) acepta que "usted" los incluye a usted y a dicha entidad, (b) es un representante autorizado de la entidad con autoridad para obligarla mediante estos Términos, y (c) acepta estos Términos en nombre de la entidad.
      </p>
      <h2 class="terms-of-use-subtitle">Descripción general</h2>
      <p class="terms-of-use-text">
        1.1 Estos Términos son entre usted y Elementary Innovation Pte. Ltd., una empresa de Singapur.
      </p>
      <p class="terms-of-use-text">
        1.2 Se hace referencia a Elementary Innovation Pte. Ltd. en estos Términos y Políticas (según se define a continuación) como "nosotros" o "nos". A efectos de estos Términos y Políticas, también nos referimos a:
      </p>
      <ul class="terms-of-use-list">
        <li class="terms-of-use-list-item">nuestro sitio web y aplicaciones móviles, que pueden ofrecer funciones, productos, servicios o contenido, incluidos intercambios de información, como "Temu" o "nuestra aplicación";</li>
        <li class="terms-of-use-list-item">los Usuarios finales, incluidos los visitantes de Temu y aquellos que utilizan Temu para comprar productos, como "usted".</li>
      </ul>
      <p class="terms-of-use-text">
        1.3 Nosotros y nuestros afiliados proporcionamos soporte técnico y operativo para nuestra aplicación. Puede pagar varios pedidos en una transacción en Temu. Se pueden entregar varios pedidos juntos en un solo paquete.
      </p>
    </div>
  </div>
</template>

<script>


export default {
  name: 'TermsOfUse',
  methods: {
      goToHome() {
        this.$router.push('/');
      }
      },
 
};

</script>

<style scoped>
.terms-of-use-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
}

.terms-of-use-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.terms-of-use-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
}

.terms-of-use-subtitle {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #555;
}

.terms-of-use-text {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #666;
}

.terms-of-use-list {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.terms-of-use-list-item {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
}
</style>
