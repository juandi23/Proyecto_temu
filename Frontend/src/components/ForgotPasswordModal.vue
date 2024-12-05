<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">✖</button>
        <h2>¿Tienes problemas para iniciar sesión?</h2>
        <p>
          Si registraste una cuenta con tu dirección de email, pero olvidaste tu contraseña, puedes restablecerla.
        </p>
        <button class="action-button">Restablecer contraseña</button>
        <p>
          Si olvidaste tu cuenta, puedes intentar encontrar tu cuenta por email, número de teléfono celular o número de pedido.
        </p>
        <button class="action-button">Encontrar cuenta</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .modal-content {
    background: white;
    border-radius: 8px;
    padding: 20px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  .close-button {
    background: none;
    border: none;
    font-size: 18px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  .action-button {
    display: block;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    background: white;
    border: 1px solid black;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;
  }
  </style>
  