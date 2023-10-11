import { Router } from "express";
import CartManager from "./cartManager.js";
import cartService from "./cart.service.js";
import cartController from "./cart.controller.js";
import productController from "../products/product.controller.js";
import userController from "../users/user.controller.js";

const cm = new CartManager("./cart.json");

const cartRouter = Router();

cartRouter.post("/", async (req, res) => {
  try {
    let newCart = await cartController.addCart();
    await userController.activeCart(req.user._id, newCart._id);
    req.user.activeCart = newCart._id;
    req.logger.info(`Cart created with id: ${newCart._id}`);
    res.status(201).send({ payload: newCart._id });
  } catch (err) {
    res.send(err);
  }
});

cartRouter.post("/pending", async (req, res) => {
  try {
    let products = req.body;
    const pendientes = products.pending.pending;
    if (pendientes.length > 0) {
      let newCart = await cartController.addCart();
      req.logger.info(`Cart created with id: ${newCart._id}`);

      let items = [];
      pendientes.forEach((item) => {
        items.push({ pid: item.product._id, quantity: item.quantity });
      });

      items.forEach(async (item) => {
        await cartController.addProduct(newCart._id, item);
      });

      await userController.activeCart(req.user._id, newCart._id);
      req.user.activeCart = newCart._id;

      res.send({
        status: 201,
        msg: "carrito con pendientes creado",
        carrito: newCart._id,
      });
    } else {
      await userController.activeCart(req.user._id, "none");
      req.user.activeCart = "none";
      res.send({ status: 200, msg: "no se creo carrito con pendientes" });
    }
  } catch (err) {
    res.send(err);
  }
});

cartRouter.get("/", async (req, res) => {
  try {
    let carts = await cartController.getAllCarts();
    res.status(200).send(carts);
  } catch (err) {
    res.status(500).send(err);
  }
});

cartRouter.post("/buycart", async (req, res) => {
  const user = req.user;
  const products = req.body.filteredCart;
  res.render("buycart", { user, products });
});
cartRouter.get("/:cid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let cart = await cartController.getCartById(cid);
    if (!cart) {
      req.logger.warning(`Cart not found with id ${cid}`);
      res.status(404).send({ error: `no existe carrito con id: ${cid}` });
    } else {
      res.status(200).send(cart);
    } 
  } catch (err) {
    res.send(err);
  }
});

cartRouter.get("/checkcart/:cid", async (req, res) => {
  let cid = req.params.cid;
  let products = await productController.getAllproductsUnrestricted();
  let checkedCart = await cartController.checkCart(cid, products);
  res.send(checkedCart);
});

cartRouter.post("/closeCart", async (req, res) => {
  let newCart = await cartController.addCart();
  let products = req.body.products;
  let items = [];
  products.forEach((item) => {
    items.push({ pid: item.product, quantity: item.quantity });
  });

  items.forEach(async (item) => {
    await cartController.addProduct(newCart._id, item);
  });
  res.send({ status: 201, cid: newCart._id });
});

cartRouter.put("/:cid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let product = req.body;

    let carrito = await cartController.editCart(cid, items);
    if (!carrito) {
      res.status(400).send("Carrito no encontrado");
    }
    res.status(200).send(carrito);
  } catch (err) {
    res.status(500).send(err);
  }
});

cartRouter.delete("/:cid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let emptiedCart = await cartController.emptyCart(cid);
    if (!emptiedCart) {
      res.status(400).send("Carrito no encontrado");
    }
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});

cartRouter.delete("/erasecart/:cid", async (req, res) => {
  let cid = req.params.cid;
  let result = await cartController.eraseCart(cid);
  res.send(result);
  res.send({ status: 202, msg: "carrito borrado" });
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let user = req.user;
    let productFound = await productController.getProduct(pid);

    if (user.email === productFound[0].owner) {
      res.send({
        status: 400,
        message: "No se puede agregar un producto creado por usted",
      });
    } else if (req.user.role === 'admin'){
      res.send({
        status: 400,
        message: "Admins no pueden agregar productos al carrito",
      });
    }
    else {
      let producto = { pid: pid, quantity: req.body.quantity };
      //let addedProduct = await cm.addProduct(parseInt(cid), cuerpo)
      let addedProduct = await cartController.addProduct(cid, producto);
      req.logger.info(`Product added to cart ${cid}`);
      res.send({
        status: 200,
        message: `Producto ${productFound[0].title} agregado al carrito`,
      });
    }
  } catch (err) {
    res.send(err);
  }
});

cartRouter.put("/:cid/products/:pid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let producto = { pid: pid, quantity: req.body.quantity };
    //let addedProduct = await cm.addProduct(parseInt(cid), cuerpo)
    let editedQuantity = await cartController.editQuantity(cid, producto);

    res.status(200).send(editedQuantity);
  } catch (err) {
    res.send(err);
  }
});

cartRouter.delete("/:cid/product/:pid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    // let deleteProduct = await cm.deleteProduct(parseInt(cid), parseInt(pid))
    let deleteProduct = await cartController.deleteProduct(cid, pid);

    res.status(204).send(deleteProduct);
  } catch (err) {
    res.send(err);
  }
});

export { cartRouter };
