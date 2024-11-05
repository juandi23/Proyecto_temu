// services/authService.js
import axios from 'axios';

// Instancia de Axios que usa la URL del backend desde el archivo .env
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL // Esto usa la URL definida en .env
});

const authService = {
  // Función para restablecer la contraseña
  async resetPassword(token, email, newPassword) {
    try {
      const response = await apiClient.post('/users/restablecer-password', {
        token,
        email,
        newPassword
      });
      return response.data;
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      throw error;
    }
  },

  // Puedes agregar aquí otras funciones que necesiten comunicarse con el backend
};

export default authService;
