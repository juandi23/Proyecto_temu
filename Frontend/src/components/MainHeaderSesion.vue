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

    <!-- Barra inferior Blanca -->
    <div class="bottom-bar">
      <div class="bottom-bar-content">

        <div class="menu">
          <router-link to="/">
          <!-- Logo -->
          <img src="../assets/logo-temu.png" alt="Temu logo" class="logo">
          </router-link>
        </div>  

        <!-- Navegación -->
        <nav class="nav-links">
          <div class="masvendidos">

            <div class="menu">
              <router-link to="MasVendidos">
                <img src="../assets/icono-mas-vendidos1.png" alt="Más vendidos" class="icon-small">
                <div class="text-wrapper">
                  <span class="hot">HOT</span>
                  Más vendidos
                </div>
              </router-link>
            </div>
          </div>
          <div class="menu">
            <router-link to="/CincoEstrellas">
              <img src="../assets/icono-estrella1.png" alt="Icono estrella" class="icon-small"> 5 estrellas
            </router-link>
          </div>

          <!-- Menú Amor Y Amistad 
          <div class="menu">
            <router-link to="/AmoryAmistad">
              <img src="../assets/icono-corazon1.png" alt="Icono corazón" class="icon-small"> Amor y Amistad
            </router-link>
          </div>
-->
          <!-- Menú OFERTAS 
          <div class="menu">
            <router-link to="/Descuentos">
              <img src="../assets/iconsDescuento1.png" alt="Icono Descuento" class="icon-small"> Día del Ahorro
            </router-link>
          </div>                             -->

          <!-- Navidad -->
          <div class="menu">
            <router-link to="/Descuentos">
              <img src="../assets/iconfelicidad1N.png" alt="Icono Felicidad" class="icon-small"> 12.12
            </router-link>
          </div>
          
          <div class="menu">
            <Router-link to="/RecienLlegados"> Recién llegados </router-link>
          </div>
          <div class="menu">
            <a href="#" @mouseover="showCategoriasModal = true">Categorías <span>&#9660;</span></a>
            <CategoriasModal :show="showCategoriasModal" @close="showCategoriasModal = false" @mouseleave="showCategoriasModal = false" />
          </div>
        </nav>


        <!-- Barra de búsqueda -->
        <div class="search-bar">
          <input type="text" placeholder="camisetas de mujer en oferta">
          <button>
            <img src="../assets/icono-buscar.png" alt="Icono buscar" class="icon-small">
          </button>
        </div>

        <div class="login_1">
            <li class="dropdown" @mouseover="showDropdown = true" @mouseleave="showDropdown = false">
              <a href="#" id="Iniciar_sesion" class="user-icon">
                <img src="../assets/icono-usuario1.png" alt="Icono usuario" class="icon">
                <span>Hola, {{ formatEmail(session.user.email) }}</span>
              </a>

              <div v-if="showDropdown" class="dropdown-menu">
                <div class="user-header">
                  <img src="../assets/icono-usuario1.png" alt="Icono usuario" class="icon-large">
                  <p><strong>{{ formatEmail(session.user.email) }}</strong></p>
                </div>
                <hr>
                <router-link to="/TusPedidos" class="dropdown-item">Tus pedidos</router-link>
                <router-link to="/TusReseñas" class="dropdown-item">Tus Reseñas</router-link>
                <router-link to="/perfil" class="dropdown-item">Tu Perfil</router-link>
                <router-link to="/Cupones_y_Ofertas" class="dropdown-item">Cupones y Ofertas</router-link>
                <router-link to="/Saldo_y_Crédito" class="dropdown-item">Saldo y Crédito</router-link>
                <router-link to="/Proveedores" class="dropdown-item">Proveedores seguidos</router-link>
              
                <a href="#" class="dropdown-item">Historial de navegación</a>
                <router-link to="/Direccion" class="dropdown-item">Direccion</router-link>
                
                <a href="#" class="dropdown-item">Seguridad de la cuenta</a>
                <router-link to="/permisos" class="dropdown-item">Permisos</router-link>
                <a href="#" class="dropdown-item">Notificaciones</a>
                <a href="#" class="dropdown-item">Cambiar cuenta</a>
                <button @click="logout" class="dropdown-item logout-btn">Cerrar sesión</button>
              </div>
            </li>
          </div>


        <div class="menu">
          <router-link to="/Ayuda" class="help-icon">
            <img src="../assets/icono-ayuda1.png" alt="Icono ayuda" class="icon">
            <span>Ayuda</span>
          </router-link>
        </div>

        <div class="menu">
          <a href="#" class="language-icon">
            <img src="../assets/icono-colombia.png" alt="Bandera Colombia" class="icon">
            <span>ES</span>
          </a>
        </div>

        <Login v-if="showModal" @close="showModal = false" />
      </div>
    </div>
  </header>
</template>

<script>
import Login from '@/components/Login.vue'
import CategoriasModal from './CategoriasModal.vue';


export default {
  components: {
    Login,
    CategoriasModal,

  },
  data() {
    return {
      showModal: false,
      showDropdown: false, // Controla la visibilidad del dropdown
      session: null, // Nueva propiedad para la sesión actual
      isCartOpen: false, // Controla la visibilidad del carrito
      showCategoriasModal: false, // Controla la visibilidad del modal de categorías
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

    formatEmail(email) {
      if (!email) return '';

      const parts = email.split('@');
      if (parts.length !== 2) return email; // Retorna el email original si no tiene formato correcto

      const name = parts[0];
      const domain = parts[1];

      // Obtén las dos primeras y las dos últimas letras/números
      const formattedName = name.slice(0, 2) + '***' + name.slice(-2);
      return formattedName + '@' + domain;
    },

    formatEmail(email) {
      if (!email) return '';

      const parts = email.split('@');
      if (parts.length !== 2) return email; // Retorna el email original si no tiene formato correcto

      const name = parts[0];   // Nombre del email antes del @
      const domain = parts[1]; // Dominio después del @

      // Obtener las dos primeras letras del nombre y las dos últimas letras del dominio
      const formattedEmail = name.slice(0, 2) + '***' + domain.slice(-3, -1);
      return formattedEmail;
    }



  }
}
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
}

.menu:hover {
  background-color: #d0cfcf;
  margin: 1px;
  border-radius: 20px;
  border: 1px solid #f5f4f4;
  padding: 3px;
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
  color: #ffffff;
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
  background-color: #ffffff;
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
  color: #0c0c0c;
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
  color: #020202;
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
  border-radius: 20px;
  overflow: hidden;
  flex-grow: 1;
  margin: 0 15px;
  border: 2px solid #080808;
}

.search-bar input {
  border: none;
  padding: 10px 15px;
  font-size: 0.9em;
  width: 100%;
  outline: none;
}

.search-bar button {
  background-color: #000000;
  border: none;
  padding: 5px;
  cursor: pointer;
  margin: 3px;
  border-radius: 100%;
}

.user-icon,
.help-icon,
.language-icon,
.cart-icon {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000000;
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
  background-color: #e8e8e8;
  border: 1px solid #131212;
  padding: 15px;
  width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  font-size: 14px;
  z-index: 1000;
}

.dropdown-menu .user-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.dropdown-menu .user-header .icon-large {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.dropdown-item {
  display: block;
  padding: 8px 12px;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
  width: 100%;
}

.dropdown-item:hover {
  background-color: #aca9a9;
}

.logout-btn {
  background: none;
  border: none;
  color: #d9534f;
  text-align: left;
  width: 100%;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
}

.logout-btn:hover {
  background-color: #ffffff;
}

.dropdown {
  display: flex;
  align-items: center;
}

.login_1 {
  margin: auto;
  display: flex;
  align-items: center;
  text-decoration: none;
  justify-content: center;
}

.login_1:hover {
  background-color: #f57d05;
  border-radius: 15px;
  padding: 5px;
}

</style>