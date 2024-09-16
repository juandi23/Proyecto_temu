<template>
    <div class="register-page" @click.self="$emit('close')">
        <div class="modal-content">
            <button class="close-button" @click="$emit('close')">×</button>
            <h2>Registro</h2>
            <p class="security-note">
                <img class="icon-lock" src="@/assets/lock-icon.png" alt="Seguridad" />
                Todos los datos se cifrarán
            </p>

            <form @submit.prevent="handleRegistration">
                <input type="email" v-model="email" placeholder="Email" required @blur="validateEmail" />
                <input type="password" v-model="password" placeholder="Contraseña" required />
                <p v-if="emailError" class="error-message">{{ emailError }}</p>
                <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
                <button type="submit" class="register-button">Registrarse</button>
            </form>

            <p class="terms">
                Al registrarte, aceptas nuestros <a href="#">Términos de uso</a> y <a href="#">Política de
                    privacidad</a>.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RegisterComponent',
    data() {
        return {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
        };
    },
    methods: {
        async handleRegistration() {
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
            };

            try {
                // Enviar los datos al servidor para el registro
                const response = await fetch('http://localhost:5000/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                const data = await response.json();

                if (response.ok) {
                    alert(`Registro exitoso para ${this.email}`);
                    this.$emit('register', { email: this.email });
                    // Limpiar campos después del registro
                    this.email = '';
                    this.password = '';
                } else {
                    alert(`Error: ${data.message}`);
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
    },
};
</script>

<style scoped>
.register-page {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 20px;
    left: 20px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}

/* Resto del CSS se mantiene igual */
</style>
