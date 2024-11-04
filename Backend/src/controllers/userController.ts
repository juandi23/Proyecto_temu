import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../entity/User';
import { dataSource } from '../data-source';
import { sendPasswordResetEmail } from '../mailer';

const userRepository = dataSource.getRepository(User);

// Crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = userRepository.create(req.body);
        const result = await userRepository.save(user);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userRepository.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Obtener un usuario por ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
};

// Actualizar un usuario
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
        if (user) {
            userRepository.merge(user, req.body);
            const result = await userRepository.save(user);
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};

// Eliminar un usuario
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await userRepository.delete(parseInt(req.params.id));
        if (result.affected) {
            res.status(200).json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
};


// Función para solicitar recuperación de contraseña
export const solicitarRecuperacion = async (req: Request, res: Response) => {
    const { email } = req.body;
    const userRepository = dataSource.getRepository(User);

    try {
        const user = await userRepository.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Genera un token de recuperación que incluye el email
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        // Envía el correo de recuperación
        await sendPasswordResetEmail(email, token);
        res.status(200).json({ message: 'Correo de recuperación enviado' });
    } catch (error: any) {
        console.error('Error al enviar el correo de recuperación:', error);
        res.status(500).json({ message: 'Error al enviar el correo de recuperación', error: error.message || error });
    }
};

// Función para restablecer la contraseña
export const restablecerPassword = async (req: Request, res: Response) => {
    const { token, email, newPassword } = req.body;

    try {
        // Verifica el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };

        // Comprueba que el email en el token coincide con el email proporcionado
        if (decoded.email !== email) {
            return res.status(400).json({ message: 'Token inválido o email incorrecto' });
        }

        const userRepository = dataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Hashea y guarda la nueva contraseña
        user.password = await bcrypt.hash(newPassword, 10);
        await userRepository.save(user);

        res.status(200).json({ message: 'Contraseña restablecida correctamente' });
    } catch (error: any) {
        console.error('Error al restablecer la contraseña:', error);
        res.status(400).json({ message: 'Token inválido o expirado', error: error.message || error });
    }
};