const moongose = require('mongoose');
const nodemailer = require('nodemailer');
const { handleError } = require('../utils/errorHandler.js');

const { MAIL, PASSWORD } = require('../config/configEnv.js');

// Variable "reutilizable" de transporte para envio de mensajes
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
        user: "f.burgoslobos@gmail.com",
        pass: "bqgk ybdo bjei smpn",
        }
});

// Función para enviar correos electrónicos
async function enviarEmail(to, subject, text) {
    try {
        const mailOptions = {
            from: MAIL,
            to,
            subject,
            text
        };
        console.log("Enviando correo...");
        const info = await transporter.sendMail(mailOptions);
    } catch (error) {
        handleError(error, "nodemailer.service -> enviarEmail")
    }
}
module.exports = { enviarEmail };