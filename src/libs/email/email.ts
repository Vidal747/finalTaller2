// Sources
import { SendEmailProps } from './types';
import { ResponseApi } from '@/types/app';
import { generateResponseApi } from '@/utils/functions';
import nodemailer from 'nodemailer';

const sendEmail = async ({ fromName, toEmail, subject, text, html }: SendEmailProps): Promise<ResponseApi> => {
    try {        
        const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

        if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
            return generateResponseApi({status: 500, message: '¡Ups! Error al enviar el email.'});   
        }

        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT),
            secure: true,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS
            }
        })

        const data = await transporter.verify();
        if (!data) {
            return generateResponseApi({status: 500, message: '¡Ups! Error al enviar el email.'});  
        }

        const info = await transporter.sendMail({
            from: fromName,
            to: toEmail,
            subject: subject,
            text: text,
            html: html,
        });

        return generateResponseApi({ok: true, message: '¡Bien hecho! Email enviado exitosamente.', data: [info]});
    } catch (error) {
        return generateResponseApi({});
    }
};

export { sendEmail };