import express from "express";
import handlebars from "express-handlebars";
import { productRouter } from "./routes/products.router.js";
import { cartRouter } from "./routes/carts.router.js";
import { viewsRouter } from "./routes/views.routes.js"; 
import { products, configSocketServer } from "./utils.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'
import cookieRouter from "./routes/cookies.router.js";
import session from 'express-session'
import fileStore from 'session-file-store'
import sessionRouter from "./routes/session.router.js";
import userRouter from "./routes/users.router.js";
import MongoStore from "connect-mongo"
import passport from "passport";
import initializePassport from "./config/passport.config.js";

const app = express();
const fileStorage = fileStore(session)
const mensajes = []
export { mensajes }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('privateKey'))
app.use(session({
  store:MongoStore.create({
    mongoUrl:"mongodb+srv://jdascanio:jdascaniocoderback@cluster43330.crt6quf.mongodb.net/ecommerce?retryWrites=true&w=majority",
    mongoOptions:{useNewUrlParser: true, useUnifiedTopology: true},
    ttl: 3600
  }),
  secret:'privateKey',
  resave: true,
  saveUninitialized: true
}))
initializePassport();
app.use(passport.initialize())
app.use(passport.session())
app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");
app.use(express.static("./public"));

app.use("/", viewsRouter);

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use('/api/users', userRouter)
app.use("/cookies", cookieRouter);
app.use('/session', sessionRouter)
const environment = async () => {
  mongoose.connect(
    "mongodb+srv://jdascanio:jdascaniocoderback@cluster43330.crt6quf.mongodb.net/ecommerce?retryWrites=true&w=majority"
  );
};

environment()
const httpServer = app.listen(8080, () => {
  console.log("listening to port 8080");
});


const socketServer = configSocketServer(httpServer);

export { socketServer };
