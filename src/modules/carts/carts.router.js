import { Router } from "express";
import CartManager from "./cartManager.js";
import cartService from "./cart.service.js";
import cartController from "./cart.controller.js";
import productController from "../products/product.controller.js";

const cm = new CartManager('./cart.json')

const cartRouter = Router();

cartRouter.post('/', async (req, res) => {
    try {
        //res.status(201).send(await cm.addCart())
        let newCart = await cartController.addCart()
        req.logger.info(`Cart created with id: ${newCart._id}`)
        res.status(201).send({payload: newCart._id})
    }
    catch (err) {
        res.send(err)
    }
})

cartRouter.get('/', async (req, res)=>{
    try{
        let carts = await cartController.getAllCarts()
        res.status(200).send(carts)
    }catch (err){
        res.status(500).send(err)
    }
})

cartRouter.get('/:cid', async (req, res) => {
    try {
        let cid = req.params.cid
        //let cart = await cm.getCartById(cid)
        let cart = await cartController.getCartById(cid)
        if (!cart) {
            req.logger.warning(`Cart not found with id ${cid}`)
            res.status(404).send({ error: `no existe carrito con id: ${cid}` })
        } else {
            res.status(200).send(cart)
        }
    } catch (err) {
        res.send(err)
    }
})

cartRouter.put ('/:cid', async (req, res)=>{
    try{
        let cid = req.params.cid
        let pid = req.body
        let carrito = await cartController.editCart(cid, pid)
        if(!carrito){
            res.status(400).send('Carrito no encontrado')
        }
        res.status(200).send(carrito)
    }
    catch(err){
        res.status(500).send(err)
    }
})

cartRouter.delete('/:cid', async (req, res) => {
    try{
        let cid = req.params.cid
        let deletedCart = await cartController.deleteCart(cid)
        if(!deletedCart){
            res.status(400).send('Carrito no encontrado')
        }
        res.status(204).send(deletedCart)
    }catch(err){
        res.status(500).send(err)
    }
})


// cartRouter.post('/:cid/product/:pid', async (req, res) => {
//     try {
//         let cid = req.params.cid
//         let pid = req.params.pid
//         let cuerpo = { "product": parseInt(pid), "quantity": req.body.quantity }

//         let addedProduct = await cm.addProduct(parseInt(cid), cuerpo)
//         if (addedProduct === 404) {
//             res.status(404).send({ error: "El producto no existe" })
//         } else if (!addedProduct) {
//             res.status(404).send({ error: "Carrito inexistente" })
//         } else {
//             res.send(addedProduct)
//         }
//     }
//     catch (err) {
//         res.send(err)
//     }
// })

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        let cid = req.params.cid
        let pid = req.params.pid
        let user = req.user
        let productFound = await productController.getProduct(pid)

        if (user.email === productFound[0].owner){
            res.send({status: 400, message: "No se puede agregar un producto creado por usted"})
        } else{
            let producto = { "pid": pid, "quantity": req.body.quantity }
        //let addedProduct = await cm.addProduct(parseInt(cid), cuerpo)
        let addedProduct = await cartController.addProduct(cid, producto)
        req.logger.info(`Product added to cart ${cid}`)
        res.send({status: 200, message: `Producto ${productFound[0].title} agregado al carrito`})
        }
        
    }
    catch (err) {
        res.send(err)
    }
})

cartRouter.put('/:cid/products/:pid', async (req, res) => {
    try {
        let cid = req.params.cid
        let pid = req.params.pid
        let producto = { "pid": pid, "quantity": req.body.quantity }
        //let addedProduct = await cm.addProduct(parseInt(cid), cuerpo)
        let editedQuantity = await cartController.editQuantity(cid, producto)
        
        res.status(200).send(editedQuantity)
    }
    catch (err) {
        res.send(err)
    }
})



cartRouter.delete('/:cid/product/:pid', async (req, res) => {

    try {
        let cid = req.params.cid
        let pid = req.params.pid
        // let deleteProduct = await cm.deleteProduct(parseInt(cid), parseInt(pid))
        let deleteProduct = await cartController.deleteProduct(cid, pid)
        
        res.status(204).send(deleteProduct)
    } catch (err) {
        res.send(err)
    }

})




export { cartRouter }