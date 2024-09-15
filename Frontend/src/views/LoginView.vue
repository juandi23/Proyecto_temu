<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" />
  
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
  
        <button type="submit">Login</button>
      </form>
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
        // Manejo del inicio de sesión
        console.log('Username:', username.value);
        console.log('Password:', password.value);
      };
  
      return {
        username,
        password,
        handleLogin
      };
    }
  }
  </script>
  
  <style>
  /* Estilos para la vista Login */
  </style>
  