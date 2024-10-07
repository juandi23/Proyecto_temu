import { Router } from 'express';
import {createProduct,getProducts,getProductById,updateProduct,deleteProduct} from '../controllers/Product/ProductController';

const ProductRouter = Router();

// Rutas para productos
ProductRouter.post('/', createProduct);             // Crear un nuevo producto
ProductRouter.get('/', getProducts);               // Obtener todos los productos con paginación
ProductRouter.get('/:id', getProductById);        // Obtener un producto por su ID
ProductRouter.put('/:id', updateProduct);         // Actualizar un producto por su ID
ProductRouter.delete('/:id', deleteProduct);      // Eliminar un producto por su ID

export default ProductRouter;
