<template>
  <div v-if="!session" class="login-page" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="close-button" @click="$emit('close')">×</button>
      <h2 v-if="login">Iniciar sesión</h2>
      <h2 v-if="!login">Registrarse</h2>
      <p class="security-note">
        <img class="icon-lock" src="@/assets/lock-icon.png" alt="Seguridad" />
        Todos los datos se cifrarán
      </p>

      <div class="benefits">
        <div class="benefit">
          <img class="icon-envio-devol" src="@/assets/truck-icon.png" alt="Envío" />
          <div class="benefit-text">
            <p class="benefit-title">Envío gratis</p>
            <p class="benefit-subtitle">En todos los pedidos</p>
          </div>
        </div>
        <div class="benefit">
          <img class="icon-envio-devol" src="@/assets/return-icon.png" alt="Devoluciones" />
          <div class="benefit-text">
            <p class="benefit-title">Devoluciones: 90 días</p>
            <p class="benefit-subtitle">desde la fecha de compra</p>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleLogin">
        <input id="email" type="email" v-model="email" placeholder="Email" required @blur="validateEmail" />
        <input :class="{ 'is-invalid': !password_auth }" class="form-control" id="password" type="password"
          v-model="password" placeholder="Contraseña" required />
        <p v-if="emailError" class="error-message">{{ emailError }}</p>
        <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
        <button type="submit" class="login-button">Continuar</button>
      </form>
      

      <a href="#" class="forgot-password">¿Tienes problemas para iniciar sesión?</a>

      <div class="social-login">
        <p>O continúa de otras maneras</p>
        <div class="social-icons">
          <button v-if="showPrevButton" @click="signInWithGoogle" class="nav-button">&lt;</button>
          <div class="social-icons-container" ref="socialIconsContainer">
            <button v-for="icon in visibleIcons" :key="icon.name" @click="signInWithGoogle"
              class="social-button">
              <img :src="icon.src" :alt="icon.name" class="social-icon" />
            </button>
          </div>
          <button v-if="showNextButton" @click="nextSocialIcons" class="nav-button">&gt;</button>
        </div>
      </div>

      <p class="terms">
        Al continuar, aceptas nuestros <a href="#">Términos de uso</a> y <a href="#">Política de privacidad</a>.
      </p>
    </div>
  </div>
</template>

<script>
import { auth, GoogleAuthProvider, signInWithPopup } from '@/firebase';
export default {
  name: 'LoginComponent',
  
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      password_auth: true,
      login: true,
      isModalOpen: true,
      socialIcons: [
        { name: 'Google', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQExly8Xk3GWUOkmUGETvVobduKHck3ivnVA&s', link: 'https://accounts.google.com/signin' },
        { name: 'Facebook', src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg', link: 'https://www.facebook.com/login/' },
        { name: 'Apple', src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', link: 'https://appleid.apple.com/' },
        { name: 'Twitter', src: 'https://cdn.icon-icons.com/icons2/936/PNG/512/twitter-black-shape_icon-icons.com_73358.png', link: 'https://twitter.com/login' },
      ],
      currentIconIndex: 0,
      visibleIconCount: 3,
    };
  },
  computed: {
    visibleIcons() {
      return this.socialIcons.slice(this.currentIconIndex, this.currentIconIndex + this.visibleIconCount);
    },
    showPrevButton() {
      return this.currentIconIndex > 0;
    },
    showNextButton() {
      return this.currentIconIndex < this.socialIcons.length - this.visibleIconCount;
    },
  },

  created() {
    this.isSessionActive();
    
  },
      // Método para autenticación con Google


  methods: {
    async handleLogin() {
      this.emailError = '';
      this.passwordError = '';


      if (!this.email.trim() || !this.password.trim()) {
        alert('Por favor, ingrese su correo y contraseña.');
        return;
      }

      if (this.password.length < 8) {
        this.passwordError = 'La contraseña debe tener al menos 8 caracteres.';
        return;
      }

      if (!this.validateEmail()) {
        return;
      }

      // Crear el cuerpo de la solicitud
      const userData = {
        email: this.email,
        password: this.password,
        ...(this.login === false && { name: this.email })
      };

      try {
        // Enviar los datos al servidor
        let endpoint = this.login ? 'http://localhost:5000/api/users/login' : 'http://localhost:5000/api/users/register';
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (response.ok) {
          const token = data.token; // Extraer el token de la respuesta
          const email = data.user.email; // Extraer el email de la respuesta

          const userData = {
            user: {
              email: email,
              name: email // Puedes cambiar esto si 'name' es diferente en la respuesta
            },
            token: token
          };

          // Guardar en el localStorage
          localStorage.setItem('session', JSON.stringify(userData));
          // Emitir el evento de inicio de sesión con los datos del usuario
          this.$emit('login', { email: email });
          // Limpiar los campos después del inicio de sesión
          this.email = '';
          this.password = '';

          // Cerrar el modal usando la referencia
          this.$emit('close'); // Suponiendo que 'modal' es el ref del modal
          this.isSessionActive();
        } else {
          if (data.message == 'Invalid credentials') {
            this.password_auth = false;
          } else if (data.message == 'Invalid user') {
            this.login = false;
          }
        }
      } catch (error) {
        console.error('Error al conectarse al servidor:', error);
        alert('Hubo un problema al conectarse con el servidor.');
      }
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.emailError = 'Por favor, ingrese un correo electrónico válido.';
        return false;
      } else {
        this.emailError = '';
        return true;
      }
    },

    async signInWithGoogle() {
      try {
        console.log("Iniciando sesión con Google...");
        const provider = new GoogleAuthProvider(); // Crea una instancia del proveedor
        const result = await signInWithPopup(auth, provider);
        const token = await result.user.getIdToken();

        // Envía el token al backend para verificar y almacenar la sesión
        const response = await fetch("http://localhost:5000/api/users/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        if (response.ok) {
          // Guardar los datos de usuario en localStorage
          const userData = {
            user: {
              email: data.user.email,
              name: data.user.name,
            },
            token: data.token,
          };

          localStorage.setItem("session", JSON.stringify(userData));
          this.session = userData;

          // Emitir el evento de login
          this.$emit("login", userData.user);
          this.$emit("close"); // Cierra el modal
        } else {
          console.error("Error en autenticación con Google:", data.message);
        }
      } catch (error) {
        console.error("Error al iniciar sesión con Google:", error);
      }
    },

    prevSocialIcons() {
      if (this.currentIconIndex > 0) {
        this.currentIconIndex--;
      }
    },
    nextSocialIcons() {
      if (this.currentIconIndex < this.socialIcons.length - this.visibleIconCount) {
        this.currentIconIndex++;
      }
    },
    redirectToLink(link) {
      window.open(link, '_blank', 'noopener,noreferrer');
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

    isSessionActive() {
      // Obtener el ítem 'session' del localStorage
      const sessionData = localStorage.getItem('session');

      // Si no hay datos en localStorage, no hay sesión activa
      if (!sessionData) {
        console.log('No session data found');
        this.$router.push('/');  // Redirigir a la página de inicio de sesión si no hay sesión
        return false;
      }

      try {
        // Parsear los datos
        const parsedData = JSON.parse(sessionData);

        // Verificar si el token está presente y es válido
        if (parsedData && parsedData.token) {
          console.log('Session is active');
          this.$router.push('/HomeSesion');  // Redirigir a la página del usuario si la sesión está activa
          return true;
        } else {
          this.$router.push('/');  // Redirigir a la página de inicio de sesión si no hay token
          return false;
        }
      } catch (e) {
        // En caso de error al parsear, consideramos que no hay sesión activa
        console.error('Error parsing session data:', e);
        this.$router.push('/');  // Redirigir a la página de inicio de sesión si ocurre un error
        return false;
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 500px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.security-note {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #259a29;
  margin-bottom: 20px;
  font-size: 14px;
}

.benefits {
  display: flex;
  margin-left: 35px;
  margin-right: 35px;
  justify-content: space-between;
  gap: 20px;
}

.benefit {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.icon-envio-devol {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.icon-envio-devol {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
  background-color: #ebeac3;
  border-radius: 50%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.login-button {
  padding: 10px;
  background-color: #ff8c00;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.forgot-password {
  text-align: center;
  font-size: 14px;
  color: #1a0dab;
  text-decoration: none;
  margin: 10px 0;
  display: block;
}

.social-login {
  text-align: center;
  margin-top: 20px;
}

.social-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.social-icons-container {
  display: flex;
  transition: transform 0.3s ease;
  overflow: hidden;
  width: 120px;
  /* Ajusta según el número de iconos visibles */
}

.social-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.social-icon {
  width: 30px;
  height: 30px;
  margin: 0 5px;
}

.nav-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.terms {
  font-size: 12px;
  text-align: center;
  margin-top: 20px;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: -5px;
  margin-bottom: 10px;
}

.icon-lock {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.google-login-button {
  background-color: #4285f4;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>