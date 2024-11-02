import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { dataSource } from '../data-source';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from '../mailer'; // Asegúrate de que esta función está actualizada
import admin from '../firebase-admin';
const jwtSecret = process.env.JWT_SECRET || 'default_secret';
const userRepository: Repository<User> = dataSource.getRepository(User);

class AuthService {
    async registerUser(email: string, password: string, name: string): Promise<{ user: Partial<User>, token: string }> {
        const existingUser = await userRepository.findOneBy({ email });
        if (existingUser) {
            throw new Error('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        //crear random de 6 digitos
        const random = Math.floor(100000 + Math.random() * 900000);
        const user = userRepository.create({ email, password: hashedPassword, name, verified: false, token: random.toString() }); // Asegúrate de incluir verified
        const result = await userRepository.save(user);
        console.log('antes de enviar correo');
        console.log(result);

        // Enviar correo de verificación
        await this.sendVerificationEmail(result); // Llama a la función de envío de correo

        console.log('despues de enviar correo');
        const token = jwt.sign({ userId: result.id }, jwtSecret, { expiresIn: '1h' });
        console.log('token', token);    

        return { user: { email: result.email, name: result.name }, token };
    }

    async loginUser(email: string, password: string): Promise<{ user: Partial<User>, token: string }> {
        const user = await userRepository.findOneBy({ email });
        if (!user) {
            throw new Error('Invalid user');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

        return { user: { email: user.email, name: user.name }, token };
    }

    async loginWithGoogle(token: string): Promise<{ user: Partial<User>, token: string }> {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { email, name, uid } = decodedToken;

        let user = await userRepository.findOneBy({ email });

        if (!user) {
            const hashedPassword = await bcrypt.hash('root123', 10);
            user = userRepository.create({ email,password: hashedPassword , name, verified: true });
            user = await userRepository.save(user);
        }

        const jwtToken = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

        return { user: { email: user.email, name: user.name }, token: jwtToken };
    }


    // Método para enviar el correo de verificación
    private async sendVerificationEmail(user: User) {
        // Enviar el correo con el ID del usuario en lugar del token
        console.log('Enviando correo de verificación ', user.token);
        await sendVerificationEmail(user.email, user.id, user.token || ''); // Asegúrate de que esta función esté actualizada
    }

    // Método para verificar el correo electrónico
    async verifyEmail(userId: number): Promise<string> {
        try {
            // Busca el usuario por ID
            console.log('Verificando correo electrónico');
            const user = await userRepository.findOneBy({ id: userId });

            if (!user) {
                throw new Error('User not found');
            }

            user.verified = true; // Marcar como verificado
            await userRepository.save(user);

            return 'Email verified successfully';
        } catch (error) {
            if (error instanceof Error) {
                throw new Error('Error verifying email: ' + error.message);
            } else {
                throw new Error('Error verifying email');
            }
        }
    }

    async validateVerificationToken(userId: number, token: string): Promise<boolean> {
        try {
            // Aquí deberías tener una lógica que verifique el token almacenado en la base de datos
            const user = await userRepository.findOneBy({ id: userId });
    
            if (!user || user.token !== token) {
                return false; // El usuario no existe o el token no coincide
            }
    
            // Si existe, puedes agregar lógica para verificar si el token ha expirado, etc.
            return true; // Token válido
        } catch (error) {
            throw new Error('Error al validar el token: ' );
        }
    }
    
}

export const authService = new AuthService();
