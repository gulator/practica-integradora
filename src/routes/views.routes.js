import { Router } from "express";
import handlebars from "express-handlebars";
import ProductManager from "../modules/products/productManager.js";
import productService from "../modules/products/product.service.js";
import productController from "../modules/products/product.controller.js";
import cartController from "../modules/carts/cart.controller.js";
import messageService from "../dao/services/message.service.js";
import { products } from "../utils.js";
import { mensajes } from "../app.js";
import { socketServer } from "../app.js";
import cartService from "../modules/carts/cart.service.js";
import { isAuth, isLogged } from "../middlewares/auth.js";
import { authToken, middlewarePassportJWT, authMailToken } from "../middlewares/jwt.middleware.js";
import passport from "passport";
import config from "../config/config.js";
const pm = new ProductManager("./products.json");



const viewsRouter = Router();

viewsRouter.get("/", middlewarePassportJWT, async (req, res) => {
  const user = req.user
  // delete user.password;
  if (req.user){
    if (user.email == config.adminMail) {
      req.user.role = 'admin';
    }
    
    try {
    
    let { limit, page, sort, brand, stock } = req.query;
    const newProductList = await productController.getAllproducts(
      limit,
      page,
      sort,
      brand,
      stock
    );

    let result = {
      status: "success",
      payload: newProductList.docs,
      totalDocs: newProductList.totalDocs,
      limit: newProductList.limit,
      totalPages: newProductList.totalPages,
      page: newProductList.page,
      pagingCounter: newProductList.pagingCounter,
      hasPrevPage: newProductList.hasPrevPage,
      hasNextPage: newProductList.hasNextPage,
      prevPage: newProductList.prevPage,
      nextPage: newProductList.nextPage,
      prevLink: newProductList.links + `page=${newProductList.prevPage}`,
      nextLink: newProductList.links + `page=${newProductList.nextPage}`,
    };
    
    res.render("home", {result, user});
  } catch (err) {
    res.status(500).send(err);
  }
}

});

viewsRouter.get("/products", middlewarePassportJWT, async (req, res) => {
  const user = req.user
 
  try {
    let { limit, page, sort, brand, stock } = req.query;
    const newProductList = await productController.getAllproducts(
      limit,
      page,
      sort,
      brand,
      stock
    );
    let result = {
      status: "success",
      payload: newProductList.docs,
      totalDocs: newProductList.totalDocs,
      limit: newProductList.limit,
      totalPages: newProductList.totalPages,
      page: newProductList.page,
      pagingCounter: newProductList.pagingCounter,
      hasPrevPage: newProductList.hasPrevPage,
      hasNextPage: newProductList.hasNextPage,
      prevPage: newProductList.prevPage,
      nextPage: newProductList.nextPage,
      prevLink: newProductList.links + `page=${newProductList.prevPage}`,
      nextLink: newProductList.links + `page=${newProductList.nextPage}`,
    };    
    res.render("home", {result, user});
  } catch (err) {
    res.status(500).send(err);
  }
});

viewsRouter.get("/carts/:cid",middlewarePassportJWT, async (req, res) => {
  const user = req.user
  try {
    let cid = req.params.cid;
    let carrito = await cartController.getCartById(cid);
    let resultado = carrito[0].products;
    // res.send(carrito)
    res.render("carts", { resultado, user });
  } catch (err) {
    res.status(500).send(err);
  }
});

viewsRouter.get("/realtimeproducts",middlewarePassportJWT, async (req, res) => {
  
  try {
    let { limit, page, sort, brand, stock } = req.query;
    const newProductList = await productController.getAllproducts(
      limit,
      page,
      sort,
      brand,
      stock
    );
    let prevL = 1;
    let nextL = 2;
    let result = {
      status: "success",
      payload: newProductList.docs,
      totalDocs: newProductList.totalDocs,
      limit: newProductList.limit,
      totalPages: newProductList.totalPages,
      page: newProductList.page,
      pagingCounter: newProductList.pagingCounter,
      hasPrevPage: newProductList.hasPrevPage,
      hasNextPage: newProductList.hasNextPage,
      prevPage: newProductList.prevPage,
      nextPage: newProductList.nextPage,
      prevLink: prevL,
      nextLink: nextL,
    };

    res.render("realtimeproducts", { result });
  } catch (err) {
    res.status(500).send(err);
  }
});

viewsRouter.get("/chat", middlewarePassportJWT, async (req, res) => {
  let messageList = await messageService.getAllMessages();
  res.render("chat", { messageList });
});

viewsRouter.get("/login", isLogged, (req, res) => {
    let error = req.session.error
    if(req.session.error){
        req.logger.error('error de sesion')
        // console.log(error)
        delete req.session.error
    }
  res.render("login", {error});
});
viewsRouter.get("/register", isLogged, (req, res) => {
  res.render("register");
});
viewsRouter.get("/userinfo",middlewarePassportJWT,async(req,res)=>{
  const user = req.user
  res.render('current',{user})
})
viewsRouter.get("/resetpassword",middlewarePassportJWT,async(req,res)=>{
  const user = req.user
  res.render('newreset',{user})
})
viewsRouter.get("/newproduct",middlewarePassportJWT,async(req,res)=>{
  const user = req.user
  res.render('newproduct',{user})
})
viewsRouter.get("/changepsw/:token", async(req,res)=>{
  let token = req.params.token
  const user = req.user
  res.render('changepsw',{token, user})
})

export { viewsRouter };
