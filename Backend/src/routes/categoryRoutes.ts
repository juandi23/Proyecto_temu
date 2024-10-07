import { Router } from 'express';
import { 
    createCategory, 
    getCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
} from '../controllers/category/categoryController';

const CategoryRouter = Router();

// Rutas para categorías
CategoryRouter.post('/', createCategory);           // Crear una nueva categoría
CategoryRouter.get('/', getCategories);              // Obtener todas las categorías
CategoryRouter.get('/:id', getCategoryById);        // Obtener una categoría por su ID
CategoryRouter.put('/:id', updateCategory);         // Actualizar una categoría por su ID
CategoryRouter.delete('/:id', deleteCategory);      // Eliminar una categoría por su ID

export default CategoryRouter;
