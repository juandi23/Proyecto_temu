import express from 'express';
import { dataSource } from './data-source';
import taskRouter from './routes/taskRoutes';
import userRouter from './routes/userRoutes';
import ProductRouter from './routes/ProductRoutes';
import CategoryRouter from './routes/categoryRoutes';
import imageProductRouter from './routes/imageProductRoutes';
import * as dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'; // Importación necesaria

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET || 'default_secret';

app.use(cors());
app.use(express.json());

// Sirve la carpeta 'uploads' como contenido estático
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Rutas
app.use('/api/categories', CategoryRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);
app.use('/api/products', ProductRouter);
app.use('/api', imageProductRouter);

// Middleware de manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Iniciar el servidor y conectar a la base de datos
dataSource.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });
    })
    .catch((error: any) => {
        console.error('Error al conectar a la base de datos', error);
        process.exit(1);
    });
