<template>
    <div class="orders-page">
      <nav aria-label="breadcrumb" class="breadcrumb">
        <router-link to="/">Inicio</router-link> &gt;
          <span>Notificaciones</span>
      
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
            
            
            
  
          </div>

          
  <div class="notification-settings">
    <div class="alert">
      <p>
        ✅ Ten cuidado con los mensajes acerca de los problemas de entrega que afirman ser de 4-72.
      </p>
    </div>
    <div class="settings">
      <div v-for="item in settings" :key="item.id" class="setting-item">
        <div class="setting-info">
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
          <p v-if="item.status">
            <span v-if="item.active">Activado: {{ item.active }}</span>
            <span v-if="item.inactive"> | Desactivado: {{ item.inactive }}</span>
          </p>
        </div>
        <button @click="editSetting(item.id)" class="edit-button">Editar</button>
      </div>
    </div>
    <div class="sms-notification">
      <h3>Recibe notificaciones por SMS sobre las actualizaciones de tus pedidos</h3>
      <p>
        Pueden aplicarse tarifas por mensajes y datos. La frecuencia de los mensajes varía. Envía STOP para cancelar la suscripción y HELP para obtener ayuda.
        <a href="#">Términos de uso</a> y <a href="#">Política de privacidad y cookies</a>.
      </p>
      <div class="sms-form">
        <select v-model="countryCode">
          <option value="+57">CO +57</option>
          <option value="+1">US +1</option>
          <option value="+44">UK +44</option>
        </select>
        <input v-model="phoneNumber" type="text" placeholder="Ingresa tu número de teléfono..." />
      </div>
      <button @click="sendSms" class="submit-button">Enviar</button>
      <p class="info">✅ Tu información se mantendrá segura.</p>
    </div>
  </div>


          
          
  
          
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


.notification-settings {
  font-family: Arial, sans-serif;
  margin: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.alert {
  background-color: #dff0d8;
  color: #3c763d;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
}

.settings {
  margin-bottom: 20px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.setting-info h4 {
  margin: 0;
  font-size: 16px;
}

.setting-info p {
  margin: 5px 0;
  color: #555;
}

.edit-button {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #ddd;
}

.sms-notification {
  padding: 10px;
  background-color: #fdfdfd;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.sms-notification h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.sms-notification p {
  font-size: 14px;
  margin-bottom: 10px;
  color: #555;
}

.sms-notification a {
  color: #007bff;
  text-decoration: none;
}

.sms-notification a:hover {
  text-decoration: underline;
}

.sms-form {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.sms-form select,
.sms-form input {
  padding: 5px;
  margin-right: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.submit-button {
  background-color: #ff6a00;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #e65c00;
}

.info {
  color: #3c763d;
  font-size: 12px;
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