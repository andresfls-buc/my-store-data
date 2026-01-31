const nodemailer = require('nodemailer');
require('dotenv').config();


async function sendEmail() {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    // Detalles del envío del correo
    let info = await transporter.sendMail({
        // CORREGIDO: Eliminada la 'e' de egmail y cerrada la comilla correctamente
        from: `"Andres" <${process.env.MAIL_USER}>`, 
        to: "andresf.cadc@gmail.com", // Verifica si esto también lleva 'e' o es gmail.com
        subject: "Mensaje propio jeje",
        text: "Hola Andres metale ganas a la vuelta.",
        html: "<b>Recupera tu contraseña siguiendo este enlace</b>",
    });

    console.log("Message sent: %s", info.messageId);
}

sendEmail().catch(console.error);