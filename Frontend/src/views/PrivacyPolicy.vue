<template>
    <div class="min-h-screen bg-gray-100 py-8 px-4">
      <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border">

        <div class="text-gray-700 leading-relaxed">
            <button 
              @click="goToHome" 
              class="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-50 transition duration-300"
            >
              Inicio
            </button>
          </div>

        <!-- Header -->
        <div class="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          <h1 class="text-2xl font-semibold text-blue-700 mb-4">Política de Privacidad de Temu</h1>
         
        </div>
  
        <!-- Contenido -->
        <div class="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          <section>
            <h2 class="text-2xl font-semibold text-blue-700 mb-4">Información General</h2>
            <p class="text-gray-700 leading-relaxed">
              Última actualización: 22 de noviembre de 2024
              <br>
              Política de privacidad de Elementary Innovation Pte. Ltd. (Temu)
            </p>
          </section>
  
          <section>
            <h2 class="text-2xl font-semibold text-blue-700 mb-4">¿Qué información recopilamos?</h2>
            <div class="space-y-4 text-gray-700">
              <details class="border rounded p-4 bg-blue-50 shadow-md">
                <summary class="cursor-pointer font-semibold text-blue-800">Información proporcionada por usted</summary>
                <ul class="list-disc list-inside mt-2 space-y-2">
                  <li>Datos de cuenta y perfil</li>
                  <li>Información de compras</li>
                  <li>Actividad de atención al cliente</li>
                  <li>Contenido generado por el usuario</li>
                  <li>Información de promociones y eventos</li>
                </ul>
              </details>
  
              <details class="border rounded p-4 bg-blue-50 shadow-md">
                <summary class="cursor-pointer font-semibold text-blue-800">Información de fuentes de terceros</summary>
                <ul class="list-disc list-inside mt-2 space-y-2">
                  <li>Proveedores de datos</li>
                  <li>Socios afiliados</li>
                  <li>Socios de marketing</li>
                  <li>Fuentes públicas</li>
                  <li>Otros servicios de terceros</li>
                </ul>
              </details>
            </div>
          </section>
  
          <section>
            <h2 class="text-2xl font-semibold text-blue-700 mb-4">Cómo y por qué utilizamos su información</h2>
            <ul class="space-y-2 text-gray-700 list-disc list-inside leading-relaxed">
              <li>Crear y mantener su cuenta</li>
              <li>Procesar pedidos y entregas</li>
              <li>Mejorar y optimizar servicios</li>
              <li>Personalizar su experiencia</li>
              <li>Comunicaciones de marketing</li>
              <li>Prevención de fraude y seguridad</li>
            </ul>
          </section>
  
          <section>
            <h2 class="text-2xl font-semibold text-blue-700 mb-4">Derechos y Opciones</h2>
            <div class="space-y-4 text-gray-700">
              <details class="border rounded p-4 bg-blue-50 shadow-md">
                <summary class="cursor-pointer font-semibold text-blue-800">Sus derechos fundamentales</summary>
                <ul class="list-disc list-inside mt-2 space-y-2">
                  <li>Acceso a su información personal</li>
                  <li>Eliminación de datos</li>
                  <li>Corrección de información</li>
                  <li>Darse de baja de comunicaciones de marketing</li>
                  <li>Cambiar configuración de cookies</li>
                </ul>
              </details>
            </div>
          </section>
  
          <section>
            <h2 class="text-2xl font-semibold text-blue-700 mb-4">Contacto</h2>
            <div class="bg-blue-100 p-4 rounded shadow-md">
              <p class="text-gray-800 leading-relaxed">
                Email: <a href="mailto:privacy@temu.com" class="text-blue-600 underline">privacy@temu.com</a>
                <br>
                Dirección: Elementary Innovation Pte. Ltd., 6 Raffles Quay, #14-06, Singapore (Postal 048580)
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PrivacyPolicy',
    methods: {
      goToHome() {
        this.$router.push('/');
      },
      closeModal() {
        this.$router.go(-1);
      }
    }
  }
  </script>
  