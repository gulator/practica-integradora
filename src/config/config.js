import dotenv from 'dotenv'

dotenv.config()

export default{
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PSW,
    adminMail: process.env.ADMIN_MAIL,
    cookieKey: process.env.COOKIE_KEY,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALL_BACK_URL
}