
import {NextFunction , Request ,Response} from "express";
import { email } from '../models/email';
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kavindu009lakshan@gmail.com',
        pass: 'qlmlipkxjwrxgfdi',
    },
});

const mailOptions = {
    from    : 'kavindu009lakshan@gmail.com',
    to: '',
    subject: '',
    text: '',
};
 export const sendEmail = async ( req: Request, res: Response , err: NextFunction) => {
    try {
        const reqMailOptions : email = req.body
        mailOptions.subject = reqMailOptions.subject
        mailOptions.text = reqMailOptions.body
        mailOptions.to = reqMailOptions.to
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
}