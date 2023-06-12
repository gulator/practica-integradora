import { Router } from "express";
import CartManager from "../dao/modules/cartManager.js";
import cartService from "../dao/services/cart.service.js";

const cm = new CartManager('./cart.json')

const cartRouter = Router();

cartRouter.post('/', async (req, res) => {
    try {
        //res.status(201).send(await cm.addCart())
        let newCart = await cartService.addCart()
        console.log (newCart._id)
        res.status(201).send(newCart._id)
    }
    catch (err) {
        res.send(err)
    }
})

cartRouter.get('/:cid', async (req, res) => {
    try {
        let cid = req.params.cid
        //let cart = await cm.getCartById(cid)
        let cart = await cartService.getCartById(cid)
        if (!cart) {
            res.status(404).send({ error: `no existe carrito con id: ${cid}` })
        } else {
            res.send(cart)
        }
    } catch (err) {
        res.send(err)
    }
})

cartRouter.get('/', async (req, res)=>{
    try{
        let carts = await cartService.getAllCarts()
        res.status(200).send(carts)
    }catch (err){
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
        let producto = { "pid": pid, "quantity": req.body.quantity }
        //let addedProduct = await cm.addProduct(parseInt(cid), cuerpo)
        let addedProduct = await cartService.addProduct(cid, producto)
        
        res.status(200).send(addedProduct)
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
        let editedQuantity = await cartService.editQuantity(cid, producto)
        
        res.status(200).send(editedQuantity)
    }
    catch (err) {
        res.send(err)
    }
})

cartRouter.put ('/:cid', async (req, res)=>{
    try{
        let cid = req.params.cid
        let producto = req.body
        let carrito = await cartService.editCart(cid, producto)
        res.status(200).send(carrito)
    }
    catch(err){
        res.status(500).send(err)
    }
})

cartRouter.delete('/:cid/product/:pid', async (req, res) => {

    try {
        let cid = req.params.cid
        let pid = req.params.pid
        // let deleteProduct = await cm.deleteProduct(parseInt(cid), parseInt(pid))
        let deleteProduct = await cartService.deleteProduct(cid, pid)
            res.status(204).send(deleteProduct)
    } catch (err) {
        res.send(err)
    }

})

cartRouter.delete('/:cid', async (req, res) => {
    try{
        let cid = req.params.cid
        let deletedCart = await cartService.deleteCart(cid)
        res.status(204).send(deletedCart)
    }catch(err){
        res.status(500).send(err)
    }
})


export { cartRouter }