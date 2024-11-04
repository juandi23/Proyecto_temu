import nodemailer from 'nodemailer';

// Configuración del transportador de nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Cambia esto según tu proveedor de correo
    auth: {
        user: 'jhontaimal@gmail.com', // Correo electrónico estático
        pass: 'pdsekfnpkhsalqob'    // Contraseña estática
    },
    tls: {
        rejectUnauthorized: false // Ignora certificados autofirmados
    }
});

// Función para enviar el correo de verificación
export const sendVerificationEmail = async (email: string, userId: number, token: string = '' ) => {
    const verificationLink = `http://localhost:5000/api/users/verify-email?userId=${userId}`; // Cambia esto según tu URL

    console.log('Enviando correo', token);
    const mailOptions = {
        from: 'jhontaimal@gmail.com',
        to: email,
        subject: 'Verify Your Email',
        text: `Este es tu código de verificación: ${token}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        // Aquí puedes manejar el error como desees, por ejemplo, lanzando una excepción o registrando el error
    }
};

// Función para enviar el correo de recuperación de contraseña
export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `http://localhost:5173/reset-password/${token}`; // Cambia esto según tu frontend

    const mailOptions = {
        from: 'jhontaimal@gmail.com',
        to: email,
        subject: 'Recuperación de contraseña',
        text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo de recuperación enviado con éxito');
    } catch (error) {
        console.error('Error al enviar el correo de recuperación:', error);
        throw error;
    }
};
