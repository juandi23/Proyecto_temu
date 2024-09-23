<template>
    <div class="verify-email">
      <h2>Verificando correo...</h2>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'VerifyEmail',
    props: {
      token: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        message: ''
      };
    },
    async created() {
      try {
        const response = await axios.get(`/api/verify-email?token=${this.token}`);
        this.message = response.data.message;
        // Redirigir al inicio de sesión después de la verificación
        setTimeout(() => {
          this.$router.push('/login');
        }, 3000);
      } catch (error) {
        this.message = 'Error al verificar el correo. El token puede haber expirado o es inválido.';
      }
    }
  };
  </script>
  
  <style scoped>
  .verify-email {
    text-align: center;
    margin-top: 50px;
  }
  </style>
  