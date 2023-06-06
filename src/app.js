import express from "express";
import handlebars from "express-handlebars";
import { productRouter } from "./routes/products.router.js";
import { cartRouter } from "./routes/carts.router.js";
import { viewsRouter } from "./routes/views.routes.js";
import { products, configSocketServer } from "./utils.js";
import { Server } from "socket.io";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");
app.use(express.static("./public"));

app.use("/", viewsRouter);

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
const environment = async () => {
  mongoose.connect(
    "mongodb+srv://jdascanio:jdascaniocoderback@cluster43330.crt6quf.mongodb.net/ecommerce?retryWrites=true&w=majority"
  );
};

const httpServer = app.listen(8080, () => {
  console.log("listening to port 8080");
});

environment()

const socketServer = configSocketServer(httpServer);

export { socketServer };
