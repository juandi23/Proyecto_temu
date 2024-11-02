import { Router } from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/userController';
import { registerUser, loginUser, verifyEmail } from '../controllers/authController'; // Ajusta el path según tu estructura
import admin from '../firebase-admin';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import { authService } from '../services/authService';
const UseRouter = Router();

const jwtSecret = process.env.JWT_SECRET || 'default_secret';

// Rutas para usuarios
UseRouter.post('/', createUser);        // Crear un nuevo usuario
UseRouter.get('/', getUsers);           // Obtener todos los usuarios
//UseRouter.get('/:id', getUserById);     // Obtener un usuario por ID
UseRouter.put('/:id', updateUser);     // Actualizar un usuario existente
UseRouter.delete('/:id', deleteUser);  // Eliminar un usuario

// Rutas para autenticación
UseRouter.post('/register', registerUser); // Registrar un nuevo usuario
UseRouter.post('/login', loginUser);       // Iniciar sesión

UseRouter.post('/auth/google', async (req, res) => {
    const { token } = req.body;

    try {
        const { user, token: jwtToken } = await authService.loginWithGoogle(token);
        res.json({
            message: 'Google authentication successful',
            user,
            token: jwtToken
        });
    } catch (error) {
        console.error('Error during Google authentication:', error);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
});
// Ruta para verificación de correo electrónico
UseRouter.get('/verify-email', verifyEmail); // Verificar el correo electrónico

export default UseRouter;
