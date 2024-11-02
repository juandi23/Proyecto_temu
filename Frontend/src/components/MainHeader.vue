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
                <img src="../assets/icono-mas-vendidos.png" alt="Más vendidos" class="icon-small">
                <div class="text-wrapper">
                  <span class="hot">HOT</span>
                  Más vendidos
                </div>
              </router-link>
            </div>
          </div>
          <div class="menu">
            <router-link to="/CincoEstrellas">
              <img src="../assets/icono-estrella.png" alt="Icono estrella" class="icon-small"> 5 estrellas
            </router-link>
          </div>

          <!-- Menú Amor Y Amistad 
          <div class="menu">
            <router-link to="/AmoryAmistad">
              <img src="../assets/icono-corazon.png" alt="Icono corazón" class="icon-small"> Amor y Amistad
            </router-link>
          </div>
-->
          <!-- Menú OFERTAS -->
          <div class="menu">
            <router-link to="/Descuentos">
              <img src="../assets/iconsDescuento.png" alt="Icono Descuento" class="icon-small"> Día del Ahorro
            </router-link>
          </div>


          <!-- Menú Categorias -->
          <div class="menu">
            <!-- Dropdown -->
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                style="color: white; border: none;">
                Categorias
              </button>
              <ul class="dropdown-menu">
                <div class="row">
                  <div class="col-xl-9">
                    <div class="row">
                      <!-- Izquierda -->
                      <div id="Izquierda" class="col-6 col-sm-5">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                      </div>
                      <!-- Derecha -->
                      <div id="Derecha" class="col-4 col-sm-6">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                        <img src="@/assets/apple-icon.png" alt="" width="50px" height="50px">
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </nav>

        <!-- Barra de búsqueda -->
        <div class="search-bar">
          <input type="text" placeholder="camisetas de mujer en oferta">
          <button>
            <img src="../assets/icono-buscar.png" alt="Icono buscar" class="icon-small">
          </button>
        </div>

        <!-- Iconos de usuario, ayuda, idioma y carrito -->
        <div class="login_1">
          <a href="#" id="Iniciar_sesion" class="user-icon" @click="showModal = true">
            <img src="../assets/icono-usuario.png" alt="Icono usuario" class="icon">
            <span>Pedidos y<br>cuenta</span>
          </a>
        </div>

        <div class="menu">
          <router-link to="/Ayuda" class="help-icon">
            <img src="../assets/icono-ayuda.png" alt="Icono ayuda" class="icon">
            <span>Ayuda</span>
          </router-link>
        </div>

        <div class="menu">
          <a href="#" class="language-icon">
            <img src="../assets/icono-colombia.png" alt="Bandera Colombia" class="icon">
            <span>ES</span>
          </a>
        </div>
        <div class="menu">
          <a href="#" class="cart-icon">
            <img src="../assets/icono-carro-compras.png" alt="Icono carrito" class="icon">
          </a>
        </div>

        <Login v-if="showModal" @close="showModal = false" />
      </div>
    </div>
  </header>
</template>

<script>
import Login from '@/components/Login.vue'


export default {
  components: {
    Login,

  },
  data() {
    return {
      showModal: false
    }
  }
}
</script>

<style scoped>
.dropdown-menu.show {
  display: block;
}

.menu {
  display: flex;
  align-items: center;
  justify-content: center;

}

header {
  display: flex;
  flex-direction: column;
}

.menu:hover {
  /*Amor y amistad 
  background-color: #f89eac; */

  /*descuentos */
  background-color: #f58263;
  margin: 1px;
  border-radius: 20px;
  border: 1px solid #f5f4f4;
  align-items: center;
  justify-content: center;
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
  /*Amor y amistad 
  background-color: #f9697f; */

  /*descuentos */
  background-color: #f13300;

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
  margin-right: 3px;
  margin-left: 3px;
  padding: auto;

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
  padding: 5px;
  cursor: pointer;
  border-radius: 100px;
  margin: 3px;
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

.login_1 {
  margin: auto;
  display: flex;
  align-items: center;
  text-decoration: none;
  justify-content: center;
}

.login_1:hover {
  background-color: #cf596b;
  border-radius: 15px;
  padding: 5px;
}

.dropdown-menu a {
  color: black;
}

ul {
  padding: 0;
}

.row {
  background-color: #ffffff;
  width: 90vh;
  display: flex;
  justify-content: start;
  text-align: center;
  -webkit-box-shadow: 0px 3px 17px 4px rgba(0, 0, 0, 0.27);
  -moz-box-shadow: 0px 3px 17px 4px rgba(0, 0, 0, 0.27);
  box-shadow: 0px 3px 17px 4px rgba(0, 0, 0, 0.27);

}

.dropdown:hover .dropdown-menu {
  display: block;
  margin-top: 0;
  /* remove the gap so it doesn't close */
}

#Izquierda {
  background-color: #ffffff;
}

.dropdown-item:hover {
  background-color: #c7c7c7;
}

#Derecha img {
  border-radius: 100px;
  background-color: white;
  margin: 5px
}
</style>^