import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { authService } from '../services/authService';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import { getRepository } from 'typeorm';

// Middleware para registrar un nuevo usuario
export const registerUser = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password, name } = req.body;
            console.log(email, password, name);
            const result = await authService.registerUser(email, password, name);
            res.status(201).json(result);
        } catch (error) {
            if ((error as Error).message === 'Email already in use') {
                return res.status(400).json({ message: (error as Error).message });
            }
            res.status(500).json({ message: 'Error registering user', error: (error as Error).message });
        }
    }
];

// Middleware para iniciar sesión
export const loginUser = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').exists().withMessage('Password is required'),

    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password } = req.body;
            const result = await authService.loginUser(email, password);
            res.status(200).json(result);
        } catch (error) {
            if ((error as Error).message === 'Invalid credentials' || (error as Error).message === 'Invalid user') {
                return res.status(400).json({ message: (error as Error).message });
            }
            res.status(500).json({ message: 'Error logging in', error: (error as Error).message });
        }
    }
];

export const verifyEmail = async (req: Request, res: Response) => {
    console.log('Verificando correo electrónico');
    console.log(req.query);
    const { token } = req.query;

    // Verificar que se proporcionó el token


    try {
        // Verificar y decodificar el token
    let userId = req.query.userId;
        // Obtén el repositorio de User
       const result = await authService.verifyEmail(Number(userId));
    
        // Verifica si el usuario existe
        if (!result) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

  
        // Respuesta exitosa
        return res.redirect('http://localhost:5173');
        res.json({ message: 'Correo verificado correctamente' });
    } catch (error) {
        // Manejo de errores más específico
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(400).json({ message: 'Token inválido o expirado' });
        }
        return res.status(500).json({ message: 'Error en el servidor', error: (error as Error).message });
    }
};
