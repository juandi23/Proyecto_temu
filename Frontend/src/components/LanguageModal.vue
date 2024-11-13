<template>
    <div class="language-modal">
      <h3>Idioma</h3>
      <div>
        <label>
          <input type="radio" name="language" value="es" @change="setLanguage('es')" :checked="$i18n.locale === 'es'" />
          Español-ES
        </label>
        <label>
          <input type="radio" name="language" value="en" @change="setLanguage('en')" :checked="$i18n.locale === 'en'" />
          English-EN
        </label>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      setLanguage(lang) {
        this.$i18n.locale = lang; // Cambia el idioma de la app
      }
    }
  };
  </script>
  
  <style scoped>
  .language-modal {
    /* Aquí puedes añadir estilos para que el modal se asemeje al de la imagen */
  }
  </style>
  