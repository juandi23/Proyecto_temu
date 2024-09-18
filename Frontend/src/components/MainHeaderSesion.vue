<template>
  <header>
    <!-- Barra superior negra -->
    <div class="top-bar">
      <div class="top-bar-content">
        <a href="#" class="top-bar-item">
          <img src="../assets/icono-camion.png" alt="Icono envío" class="icon">
          <div class="text-group">
            <span class="green-text">Envío gratis en cada pedido</span>
            <span class="subtext">Oferta exclusiva</span>
          </div>
        </a>

        <a href="#" class="top-bar-item">
          <img src="../assets/icono-ajuste-precios.png" alt="Icono ajuste de precios" class="icon">
          <div class="text-group">
            <span class="yellow-text">Devoluciones: 90 días</span>
            <span class="subtext">desde la fecha de compra</span>
          </div>
        </a>

        <a href="#" class="top-bar-item">
          <img src="../assets/icono-descargar-app.png" alt="Icono app" class="icon">
          <span class="yellow-text">Descarga la app de Temu</span>
        </a>
      </div>
    </div>

    <!-- Barra inferior rosada -->
    <div class="bottom-bar">
      <div class="bottom-bar-content">
        <!-- Logo -->
        <img src="../assets/logo-temu.png" alt="Temu logo" class="logo">

        <!-- Navegación -->
        <nav class="nav-links">
          <div class="masvendidos">
            <a href="#">
              <img src="../assets/icono-mas-vendidos.png" alt="Más vendidos" class="icon-small">
              <div class="text-wrapper">
                <span class="hot">HOT</span>
                Más vendidos
              </div>
            </a>
          </div>

          <a href="#">
            <img src="../assets/icono-estrella.png" alt="Icono estrella" class="icon-small"> 5 estrellas
          </a>
          <a href="#">
            <img src="../assets/icono-corazon.png" alt="Icono corazón" class="icon-small"> Amor y Amistad
          </a>
          <a href="#">Recién llegados</a>
          <a href="#">Categorías <span>&#9660;</span></a>
        </nav>

        <!-- Barra de búsqueda -->
        <div class="search-bar">
          <input type="text" placeholder="camisetas de mujer en oferta">
          <button>
            <img src="../assets/icono-buscar.png" alt="Icono buscar" class="icon-small">
          </button>
        </div>

        <!-- Iconos de usuario, ayuda, idioma y carrito -->

        <li class="dropdown" @mouseover="showDropdown = true" @mouseleave="showDropdown = false">
          <a href="#" id="Iniciar_sesion" class="user-icon">
            <img src="../assets/icono-usuario.png" alt="Icono usuario" class="icon">
            <span>Pedidos y<br>cuenta</span>
          </a>
          <div v-if="showDropdown" class="dropdown-menu">
            <p>{{ session.user.email }}</p>
            <button @click="logout">Cerrar sesión</button>
          </div>
        </li>


        <a href="#" class="help-icon">
          <img src="../assets/icono-ayuda.png" alt="Icono ayuda" class="icon">
          <span>Ayuda</span>
        </a>

        <a href="#" class="language-icon">
          <img src="../assets/icono-colombia.png" alt="Bandera Colombia" class="icon">
          <span>ES</span>
        </a>

        <a href="#" class="cart-icon">
          <img src="../assets/icono-carro-compras.png" alt="Icono carrito" class="icon">
        </a>

        <Login v-if="showModal" @close="showModal = false" />
      </div>
    </div>
  </header>
</template>

<script>
import Login from '@/components/Login.vue'

export default {
  components: {
    Login

  },
  data() {
    return {
      showModal: false,
      showDropdown: false, // Controla la visibilidad del dropdown
      session: null // Nueva propiedad para la sesión actual
    }
  },

  created() {
    this.loadSession();
  },
  methods: {
    loadSession() {
      const sessionData = localStorage.getItem('session');
      if (sessionData) {
        this.session = JSON.parse(sessionData);
      }
    },
    logout() {
      // Eliminar la variable 'session' del localStorage
      localStorage.removeItem('session');
      this.session = null; // Limpia la sesión en el componente
      // Opción: si deseas eliminar todo el localStorage (esto borrará todas las claves)
      // localStorage.clear();
      // Emitir un evento o redirigir al usuario a la página de inicio de sesión
      alert('Sesión cerrada exitosamente');
      // Si deseas redirigir al usuario a la página de inicio de sesión o inicio
      this.$router.push('/'); // Suponiendo que usas Vue Router
    },
  }
}
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
}

.top-bar {
  background-color: #000000;
  color: #fff;
  display: flex;
  justify-content: center;
  padding: 5px 0;
  font-size: 0.8em;
}

.top-bar-content,
.bottom-bar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.top-bar-item {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
}

.text-group {
  display: flex;
  flex-direction: column;
}

.icon {
  height: 20px;
  margin-right: 5px;
}

.green-text {
  color: #A9F8A7;
}

.yellow-text {
  color: #E8E478;
}

.subtext {
  color: #999;
  font-size: 0.9em;
}

.bottom-bar {
  background-color: #15bee9;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  font-size: 0.9em;
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.nav-links {
  display: flex;
  gap: 15px;
  align-items: center;
}

.nav-links a {
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  font-size: 0.9em;
  white-space: nowrap;
}

.masvendidos a {
  position: relative;
}

.text-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hot {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f57d05;
  color: #ffffff;
  font-weight: bold;
  font-size: 0.8em;
  padding: 2px 4px;
  border-radius: 3px;
  white-space: nowrap;
}

.icon-small {
  height: 18px;
  margin-right: 5px;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  flex-grow: 1;
  margin: 0 15px;
}

.search-bar input {
  border: none;
  padding: 10px 15px;
  font-size: 0.9em;
  width: 100%;
  outline: none;
}

.search-bar button {
  background-color: #000;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.user-icon,
.help-icon,
.language-icon,
.cart-icon {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
  margin-left: 15px;
  font-size: 0.9em;
}

.user-icon span,
.help-icon span,
.language-icon span {
  margin-left: 5px;
  text-align: left;
}

.user-icon span {
  line-height: 1.2;
}

.icon {
  height: 24px;
}

.nav-menu {
  list-style: none;
  display: flex;
  justify-content: flex-end;
  padding: 0;
  margin: 0;
}

.nav-menu li {
  margin: 0 20px;
  position: relative;
}

.nav-menu a {
  text-decoration: none;
  font-size: 16px;
  color: black;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  width: 150px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
  font-size: 12px;
}

.dropdown-menu button {
  background-color: #ff8c00;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  margin-top: 10px;
}
.dropdown{
  list-style-type: none; /* Elimina el punto del li */
}
</style>