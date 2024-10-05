import nodemailer from 'nodemailer';

// Configuración del transportador de nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Cambia esto según tu proveedor de correo
    auth: {
        user: 'jhontaimal@gmail.com', // Correo electrónico estático
        pass: 'uiay swpc xhgm hvga'    // Contraseña estática
    }
});

// Función para enviar el correo de verificación
export const sendVerificationEmail = async (email: string, userId: number) => {
    const verificationLink = `http://localhost:5000/api/users/verify-email?userId=${userId}`; // Cambia esto según tu URL

    const mailOptions = {
        from: 'jhontaimal@gmail.com',
        to: email,
        subject: 'Verify Your Email',
        text: `Please verify your email by clicking the link: ${verificationLink}`
    };

    await transporter.sendMail(mailOptions);
};
