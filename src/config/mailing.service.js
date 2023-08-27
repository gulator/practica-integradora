import config from "./config.js";
import nodemailer from 'nodemailer'

export default class MailingService {
    constructor(){
        this.client = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: config.mail_user,
                pass: config.mail_pass
            }
        })
    }

    async sendMail ({from, to, subject, html, attachments =[]}){
        const mailOptions = {
            from,
            to,
            subject,
            html,
            attachments
        }
        const result = await this.client.sendMail(mailOptions)
        return result
    }
}