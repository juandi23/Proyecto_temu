<template>
  <div class="login-container">
    <div class="header">
      <router-link to="/" class="back-link">Inicio</router-link>
      <button @click="closeWindow" class="close-btn">✖</button>
    </div>
    <div class="login-content">
      <h1>Iniciar sesión</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <label for="username">Usuario:</label>
        <input type="text" id="username" v-model="username" placeholder="Ingresa tu usuario" />
  
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" placeholder="Ingresa tu contraseña" />
  
        <button type="submit" class="login-btn">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Login',
  setup() {
    const username = ref('');
    const password = ref('');

    const handleLogin = () => {
      console.log('Usuario:', username.value);
      console.log('Contraseña:', password.value);
    };

    const closeWindow = () => {
      if (confirm('¿Estás seguro de que deseas cerrar la ventana?')) {
        window.close();
      }
    };

    return {
      username,
      password,
      handleLogin,
      closeWindow,
    };
  },
};
</script>

<style scoped>
/* Contenedor principal */
.login-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
}

/* Encabezado con enlace y botón de cerrar */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.back-link {
  text-decoration: none;
  color: #007bff;
  font-size: 0.9rem;
}

.back-link:hover {
  text-decoration: underline;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #ff5c5c;
}

.close-btn:hover {
  color: #ff0000;
}

/* Contenido principal */
.login-content {
  text-align: center;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

/* Formulario */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-size: 0.9rem;
  color: #555;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Botón de inicio de sesión */
.login-btn {
  padding: 0.7rem;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #0056b3;
}
</style>
