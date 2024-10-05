import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { dataSource } from '../data-source';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from '../mailer'; // Asegúrate de que esta función está actualizada

const jwtSecret = process.env.JWT_SECRET || 'default_secret';
const userRepository: Repository<User> = dataSource.getRepository(User);

class AuthService {
    async registerUser(email: string, password: string, name: string): Promise<{ user: Partial<User>, token: string }> {
        const existingUser = await userRepository.findOneBy({ email });
        if (existingUser) {
            throw new Error('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = userRepository.create({ email, password: hashedPassword, name, verified: false }); // Asegúrate de incluir verified
        const result = await userRepository.save(user);
        console.log('antes de enviar correo');

        // Enviar correo de verificación
        await this.sendVerificationEmail(result); // Llama a la función de envío de correo

        const token = jwt.sign({ userId: result.id }, jwtSecret, { expiresIn: '1h' });

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

    // Método para enviar el correo de verificación
    private async sendVerificationEmail(user: User) {
        // Enviar el correo con el ID del usuario en lugar del token
        await sendVerificationEmail(user.email, user.id);
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
}

export const authService = new AuthService();
