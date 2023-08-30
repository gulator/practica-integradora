import express from "express";
import handlebars from "express-handlebars";
// import { productRouter } from "./modules/products/products.router.js";
import { cartRouter } from "./modules/carts/carts.router.js";
import { viewsRouter } from "./routes/views.routes.js";
import { products, configSocketServer} from "./utils.js";
import { addLogger } from "./logger.js";
import { Server } from "socket.io";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cookieRouter from "./routes/cookies.router.js";
import session from "express-session";
import fileStore from "session-file-store";
import sessionRouter from "./routes/session.router.js";
import userRouter from "./modules/users/users.router.js";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import config from "./config/config.js";
import UserRouter from "./modules/users/users.router.js";
import ProductRouter from "./modules/products/products.router.js";
import TicketRouter from "./modules/tickets/ticket.router.js";

const app = express();
const fileStorage = fileStore(session);
const mensajes = [];
export { mensajes };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(addLogger)
app.use(cookieParser(config.cookieKey));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        config.mongoUrl,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true } ,
      ttl: 3600,
    }),
    secret: config.cookieKey,
    resave: true,
    saveUninitialized: true,
  })
);



initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const swaggerOptions = {
  definition:{
    openapi:'3.0.1',
    info:{
      title:'Documentacion para Lighting Legs Ecommerce',
      version: '1.0.0',
      description: 'Lighting legs API Information'
    }
  },
apis:['**/docs/**/*.yaml']
}



const spects = swaggerJsDoc(swaggerOptions)


const handlebarsInstance = handlebars.create({
  helpers: {
      ifEquals: function(arg1, arg2, options) {
          return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
      }
  }
});




app.engine("handlebars", handlebarsInstance.engine);
app.set("views", "./views");
app.set("view engine", "handlebars");
app.use(express.static("./public"));

app.use("/", viewsRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(spects))
app.use("/api/products", new ProductRouter().getRouter());
app.use("/api/carts", cartRouter);
app.use("/api/users", new UserRouter().getRouter());
app.use("/api/tickets", new TicketRouter().getRouter())
app.use("/cookies", cookieRouter);
app.use("/session", sessionRouter);
app.get("/loggerTest", (req,res) => {
  try{
    req.logger.debug('debug msg')
    req.logger.info('debug msg')
    req.logger.warning('warning msg')
    res.send('loggerTest')
  }catch(err){
    req.logger.error('error msg')
    req.logger.fatal('fatal msg')
    res.status(500).send('err')
  }
})
const environment = async () => {
  mongoose.connect(config.mongoUrl);
};

environment();
const httpServer = app.listen(config.port, () => {
  console.log(`Listening to port ${config.port}`);
});

const socketServer = configSocketServer(httpServer);

export { socketServer };
 