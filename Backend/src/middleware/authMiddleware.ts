import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno

// Obtén JWT_SECRET y muestra un mensaje claro si no está definido
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    console.error('Error: JWT_SECRET no está definido en el archivo .env');
    // Puedes optar por lanzar un error o continuar de otra forma si es necesario.
}

interface JwtPayload {
    userId: number;
}

interface CustomRequest extends Request {
    user?: JwtPayload;
}

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // `Bearer token`

    if (token == null) return res.status(401).json({ message: 'Token requerido' });

    // Verifica el token solo si jwtSecret está definido
    if (jwtSecret) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Token inválido' });

            // Añadir user al objeto de solicitud
            req.user = decoded as JwtPayload;
            next();
        });
    } else {
        return res.status(500).json({ message: 'Error en el servidor: JWT_SECRET no está configurado' });
    }
};
