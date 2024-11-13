import axios from 'axios';

const API_KEY = 'BQmHuvOloOCAos1mpWS8FOSHCWQ3IYPdEN3ttzdfMvDFntJedlm8P2nR';
const BASE_URL = 'https://api.pexels.com/v1/';

const pexelsService = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: API_KEY,
  },
});

export const getPhotosByCategory = async (category) => {
  try {
    const response = await pexelsService.get(`search`, {
      params: {
        query: category,
        per_page: 1, // Define cuántas fotos quieres traer por categoría
      },
    });
    return response.data.photos;
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
};