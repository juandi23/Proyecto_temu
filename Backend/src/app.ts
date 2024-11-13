import express from 'express';
import { dataSource } from './data-source';
import taskRouter from './routes/taskRoutes';
import userRouter from './routes/userRoutes';
import ProductRouter from './routes/ProductRoutes';
import CategoryRouter from './routes/categoryRoutes';
import imageProductRouter from './routes/imageProductRoutes';
import * as dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

// Cargar variables de entorno
dotenv.config();
if (!process.env.JWT_SECRET) {
    console.warn('Advertencia: JWT_SECRET no está definido en .env, usando valor por defecto');
}
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const app = express();
const PORT = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET || 'default_secret';

// Configuración de CORS para permitir solo solicitudes desde http://localhost:5173
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Configuración de middlewares
app.use(express.json());

// Servir la carpeta 'uploads' como contenido estático
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Rutas
app.use('/api/categories', CategoryRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter); // Ruta que incluye la autenticación
app.use('/api/products', ProductRouter);
app.use('/api', imageProductRouter);

// Middleware de manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error en la aplicación:', err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV !== 'production' && { error: err }) // Incluye detalles del error en entornos de desarrollo y prueba
    });
});

// Inicialización de la base de datos solo si no está ya inicializada
console.log('Iniciando la aplicación...');
console.log('Configurando conexión a la base de datos...');

if (!dataSource.isInitialized) {
    dataSource.initialize()
        .then(() => {
            console.log('Conexión a la base de datos exitosa');
            // Iniciar el servidor una vez que la base de datos esté conectada
            app.listen(PORT, () => {
                console.log(`Servidor corriendo en http://localhost:${PORT}`);
            });
        })
        .catch((error: any) => {
            console.error('Error al conectar a la base de datos', error);
            // Evitar que las pruebas se interrumpan
            if (process.env.NODE_ENV !== 'test') {
                process.exit(1);
            }
        });
} else {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}

console.log('Exportando instancia de la aplicación...');
export default app; // Exporta la instancia de `app`
