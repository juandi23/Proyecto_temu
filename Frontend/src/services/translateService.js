import axios from 'axios';

// Cargar la clave de API desde el entorno
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://translation.googleapis.com/language/translate/v2';

export async function translateText(text, targetLanguage) {
  try {
    const response = await axios.post(BASE_URL, null, {
      params: {
        q: text,
        target: targetLanguage,
        format: 'text',
        key: API_KEY
      }
    });
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Error al traducir el texto:', error);
    throw error;
  }
}
