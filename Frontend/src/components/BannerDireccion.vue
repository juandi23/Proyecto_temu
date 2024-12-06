<template>
    <div class="orders-page">
      <nav aria-label="breadcrumb" class="breadcrumb">
        <router-link to="/">Inicio</router-link> &gt;
          <span>Direcciones</span>
      
      </nav>
      
      <div class="main-content">
        <aside class="sidebar">
          <div class="menu-item" @click="toggleSubmenu">
            <span class="icon">&#9776;</span>
            Tus pedidos
            <span class="arrow" :class="{ 'arrow-down': showSubmenu }">&#9660;</span>
          </div>
          
          <transition name="fade">
            <ul v-if="showSubmenu">
              <li v-for="(item, index) in menuItems" :key="index" 
                  @click="selectMenuItem(index)" 
                  :class="{ active: selectedMenuItem === index }">
                {{ item }}
              </li>
            </ul>
          </transition>
  
          
          <ul class="secondary-menu">
              <li
                  v-for="(item, index) in secondaryMenuItems"
                  :key="index"
                  @click="selectSecondaryMenuItem(item.key)"
                  :class="{ active: selectedSecondaryMenuItem === item.key }"
              >
                  <span class="icon" v-html="item.icon"></span>{{ item.label }}
              </li>
          </ul>
  
        </aside>
        
        <main class="main-panel">
          <div class="user-info">

            <div class="location-container">
                <div class="icon-location">
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Círculo punteado -->
                    <circle cx="12" cy="18" r="6" stroke="#C4C4C4" stroke-width="1" stroke-dasharray="2 2" fill="none"/>
                    <!-- Marcador -->
                    <path d="M12 2C9.243 2 7 4.243 7 7C7 11.25 12 21 12 21C12 21 17 11.25 17 7C17 4.243 14.757 2 12 2ZM12 9C10.897 9 10 8.103 10 7C10 5.897 10.897 5 12 5C13.103 5 14 5.897 14 7C14 8.103 13.103 9 12 9Z" fill="#C4C4C4"/>
                    </svg>
                </div>
                <p class="message">No tienes ninguna dirección de envío guardada</p>
                <p class="secure-message">
                    <span class="lock-icon">🔒</span>
                    Todos los datos que hayas añadido estarán encriptados
                </p>
                <button class="add-address-btn">Agregar una nueva dirección</button>
                </div>

            


               
            
            
  
          </div>
          
              
           
  
          <section class="help-section">
            <h2>¿No puedes encontrar tu pedido?</h2>
            <div class="buttons">
              <button class="login-button">
                Inicia sesión con otra cuenta
                <span class="icons">
                  <span v-for="(icon, name) in socialIcons" :key="name" 
                        class="icon" :class="name" @click.stop="goTo(icon.url)">
                    <img :src="icon.src" :alt="name" width="16" height="16">
                  </span>
                </span>
              </button>
              <button class="help-button" @click="goToHelp">
                Ayuda para encontrar el pedido
                <span class="arrow">▶</span>
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  import Login from '@/components/Login.vue'
  
  export default {
    components: {
      Login,
    },
    name: 'OrdersComponent',
    data() {
      return {
        session: null,
        user: {
          avatar: "../assets/default-avatar.png", 
        },
        showSubmenu: true,
        menuItems: ['Todos', 'Procesando', 'Enviado', 'Entregado', 'Devoluciones'],
        selectedMenuItem: 0,
        selectedTab: 0,
        messages: {
          0: 'No tienes pedidos',
          1: 'No tienes ningun pedidos en procesamiento',
          2: 'No tienes pedidos enviados',
          3: 'No tienes pedidos entregados',
          4: 'No tienes pedidos para devolver',
            'reseñas': 'Aquí están tus reseñas',
            'perfil': 'Aquí puedes gestionar tu perfil',
            'cupones': 'Encuentra aquí tus cupones y ofertas',
            'saldo': 'Consulta tu saldo de crédito disponible',
            'proveedores': 'Estos son tus proveedores seguidos',
            'historial': 'Revisa tu historial de navegación',
            'direcciones': 'Gestión de tus direcciones guardadas',
            'pais': 'Configura tu país, región e idioma',
            'metodos': 'Consulta y gestiona tus métodos de pago',
            'seguridad': 'Ajustes de seguridad de la cuenta',
            'permisos': 'Administra tus permisos',
            'notificaciones': 'Configura tus notificaciones'
        },
        secondaryMenuItems: [
            { icon: '&#128172;', label: 'Tus reseñas', key: 'reseñas' },
            { icon: '&#128100;', label: 'Tu perfil', key: 'perfil' },
            { icon: '&#127915;', label: 'Cupones y ofertas', key: 'cupones' },
            { icon: '&#128176;', label: 'Saldo de crédito', key: 'saldo' },
            { icon: '&#128101;', label: 'Proveedores seguidos', key: 'proveedores' },
            { icon: '&#128340;', label: 'Historial de navegación', key: 'historial' },
            { icon: '&#127968;', label: 'Direcciones', key: 'direcciones' },
            { icon: '&#127758;', label: 'País/región e idioma', key: 'pais' },
            { icon: '&#128179;', label: 'Métodos de pago', key: 'metodos' },
            { icon: '&#128274;', label: 'Seguridad de la cuenta', key: 'seguridad' },
            { icon: '&#128275;', label: 'Permisos', key: 'permisos' },
            { icon: '&#128276;', label: 'Notificaciones', key: 'notificaciones' }
            ],
            selectedSecondaryMenuItem: null, // Nuevo estado para el menú secundario
        socialIcons: {
          google: { src: 'https://cdn.cdnlogo.com/logos/g/35/google-icon.svg', url:  'https://accounts.google.com' },
          facebook: { src: 'https://cdn.cdnlogo.com/logos/f/84/facebook.svg', url: 'https://www.facebook.com/login' },
          apple: {src: 'https://cdn-icons-png.flaticon.com/512/15/15476.png', url: ' https://appleid.apple.com​' }
        }
      }
    },
  
    created() {
      this.loadSession();
    },
  
    methods: {
        addNewAddress() {
      // Aquí puedes agregar la funcionalidad que quieras
      alert('Abriendo formulario para agregar una nueva dirección');
    },

      loadSession() {
        const sessionData = localStorage.getItem('session');
        if (sessionData) {
          this.session = JSON.parse(sessionData);
        }
      },
      formatEmail(email) {
    return email || ''; 
  },
  
  selectSecondaryMenuItem(itemKey) {
    this.selectedSecondaryMenuItem = itemKey;
    this.selectedMenuItem = null; // Reinicia la selección del menú principal
  },
  
  toggleSubmenu() {
    this.showSubmenu = !this.showSubmenu
  },
  selectMenuItem(index) {
    this.selectedMenuItem = index
    this.selectedTab = index
    this.selectedSecondaryMenuItem = null // Desactivar selección del menú secundario
  },
  selectTab(index) {
    this.selectedTab = index
    this.selectedMenuItem = index
    this.selectedSecondaryMenuItem = null // Desactivar selección del menú secundario
  },
  selectSecondaryMenuItem(itemKey) {
    this.selectedSecondaryMenuItem = itemKey // Activar el ítem del menú secundario
    this.selectedMenuItem = null // Desactivar el menú principal
    this.selectedTab = null // Desactivar la selección de tabs
  },
  goTo(url) {
    window.open(url, '_blank')  
  },
  goToHelp() {
    window.open('https://www.google.com/search?q=como+encontrar+mi+pedido', '_blank')
  },
    }
  }
  </script>
  
  <style scoped>


/* Contenedor principal */
.location-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  text-align: center;
  font-family: Arial, sans-serif;
}

/* Estilo del ícono */
.icon-location {
  margin-bottom: 20px;
}

/* Mensaje principal */
.message {
  font-size: 18px;
  color: #333;
  margin: 10px 0;
}

/* Mensaje de seguridad */
.secure-message {
  font-size: 14px;
  color: #28a745; /* Verde */
  margin: 5px 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Icono de candado */
.lock-icon {
  font-size: 16px;
  margin-right: 5px;
}

/* Botón */
.add-address-btn {
  background-color: #ff6a00; /* Naranja */
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-address-btn:hover {
  background-color: #e55a00; /* Un tono más oscuro */
}


.add-address-btn:hover {
  background-color: #e66a00;
}

.add-address-btn:active {
  transform: scale(0.98);
}
  
  .icon-container {
    display: flex;
    justify-content: center; /* Centra horizontalmente */
    align-items: center;    /* Centra verticalmente */
    height: 20vh;          /* Usa todo el alto de la pantalla para centrar */
  }
  
  .icon_proveedores {
    font-size: 200px; /* Tamaño 5 veces más grande */
    color: #333;      /* Color del icono */
    text-align: center;
  }
  
  
  .secondary-menu .active {
  font-weight: bold;
  color: #007bff;
  }
  
  .orders-page {
    font-family: Arial, sans-serif;
    color: #000000;
    margin: 0px;
    border-top: 1px solid #7b7878;
    background-color: #ffffff;
    font-size: 14px;
  
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .breadcrumb {
    color: #555;
    margin-bottom: 20px;
    margin: 20px;
  }
  
  
  
  .main-content {
    display: flex;
    gap: 20px;
    margin: 20px;
   
  }
  
  .sidebar {
    width: 250px;
  }
  
  .menu-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .arrow {
    margin-left: 5px;
    transition: transform 0.3s;
  }
  
  .arrow-down {
    transform: rotate(180deg);
  }
  
  .sidebar ul {
    list-style-type: none;
    padding: 0;
    margin: 0 0 20px 20px;
  }
  
  .sidebar li {
    margin-bottom: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  
  .sidebar li.active {
    color: #ff6600;
    font-weight: bold;
  }
  
  .icon {
    margin-right: 10px;
  }
  
  .icon_pedidos {
    font-size: 80px;
    margin-bottom: 20px;
  }
  
  .icons {
    display: flex;
    gap: 10px;
    
  }
  
  .main-panel {
    flex-grow: 1;
  }
  
  .tabs-and-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .tabs {
    display: flex;
  }
  
  .tabs button {
    padding: 10px 20px;
    cursor: pointer;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
  }
  
  .tabs button.active {
    color: #ff6600;
    border-bottom-color: #ff6600;
  }
  
  
  
  
  .no-returns {
    text-align: center;
    color: #888;
    margin-top: 50px;
  }
  
  
  
  .help-section h2 {
    margin-top: 80px;
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: normal;
    
  }
  
  .buttons {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    margin-right: 80px;
    
  }
  
  button {
    padding: 10px 15px;
    border: 1px solid #f69a06;
    border-radius: 8px;
    background-color: white;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 14px;
    color: #333;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #f0f0f0;
  }
  
  .login-button .icon,
  .help-button .arrow {
    margin-left: 10px;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  
  .search-bar {
    margin-right: 50px;
    margin-left: 30px;
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 50px; /* Bordes redondeados para todo el contenedor */
    padding: 0px;
    width: 100%;
    max-width: 600px; /* Limita el ancho máximo */
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Sombra sutil */
  }
  
  .search-bar input {
    flex-grow: 1; /* Hace que el input ocupe todo el espacio disponible */
    border: none;
    padding: 10px 10px; /* Más padding a los lados para que el texto se vea completo */
    font-size: 11px;
    border-radius: 50px 0 0 50px; /* Bordes redondeados a la izquierda */
    outline: none;
  }
  
  .search-bar button {
    background-color: #000000; /* Fondo negro */
    border: 0;
    border-radius: 50%; /* Hace que el botón sea un círculo */
    padding: 5px;
    margin: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px; /* Ajusta el tamaño del botón */
    height: 30px; /* Hace el botón circular */
    cursor: pointer;
  }
  
  .search-bar .icon-small {
    width: 18px;
    height:18px;
    }
  
  </style>