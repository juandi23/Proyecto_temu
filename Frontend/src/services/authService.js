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
      const response = await apiClient.post('/api/users/restablecer-password', {
        token,
        email,
        newPassword,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        // Errores específicos del backend
        const { status, data } = error.response;
        console.error(`Error ${status}: ${data.message}`);
        throw new Error(data.message || 'Error desconocido al restablecer la contraseña');
      } else if (error.request) {
        // Error en la comunicación con el servidor
        console.error('No se recibió respuesta del servidor:', error.request);
        throw new Error('No se pudo conectar con el servidor');
      } else {
        // Otro tipo de error
        console.error('Error:', error.message);
        throw new Error('Error al procesar la solicitud');
      }
    }
  }
  

  // Puedes agregar aquí otras funciones que necesiten comunicarse con el backend
};

export default authService;
