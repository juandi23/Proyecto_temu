import { Router } from 'express';
import { uploadImage, getProductImages, deleteImage } from '../controllers/Product/imageProductController';

const router = Router();

// Ruta para cargar una imagen
router.post('/products/:productId/images', uploadImage);

// Ruta para obtener imágenes de un producto
router.get('/products/:productId/images', getProductImages);

// Ruta para eliminar una imagen
router.delete('/images/:imageId', deleteImage);

export default router;
