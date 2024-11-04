<template>
    <div class="reset-password">
      <h1>Restablecer Contraseña</h1>
      <form @submit.prevent="resetPassword">
        <div>
          <label for="newPassword">Nueva Contraseña:</label>
          <input type="password" v-model="newPassword" required />
        </div>
        <div>
          <label for="confirmPassword">Confirmar Contraseña:</label>
          <input type="password" v-model="confirmPassword" required />
        </div>
        <button type="submit">Restablecer Contraseña</button>
      </form>
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <p v-if="successMessage">{{ successMessage }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import authService from '../services/authService'; // Asegúrate de tener un servicio para el backend
  
  export default {
    setup() {
      const route = useRoute();
      const router = useRouter();
      const newPassword = ref('');
      const confirmPassword = ref('');
      const errorMessage = ref('');
      const successMessage = ref('');
  
      const resetPassword = async () => {
        if (newPassword.value !== confirmPassword.value) {
          errorMessage.value = 'Las contraseñas no coinciden';
          return;
        }
  
        const token = route.params.token;
        const email = route.query.email; // Puede venir como parámetro de la URL
        
        try {
          await authService.resetPassword(token, email, newPassword.value);
          successMessage.value = 'Contraseña restablecida con éxito';
          setTimeout(() => {
            router.push('/login');
          }, 2000); // Redirecciona después de 2 segundos
        } catch (error) {
          errorMessage.value = 'Error al restablecer la contraseña';
        }
      };
  
      return {
        newPassword,
        confirmPassword,
        resetPassword,
        errorMessage,
        successMessage
      };
    }
  };
  </script>
  
  <style scoped>
  /* Estilos básicos */
  .reset-password {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  