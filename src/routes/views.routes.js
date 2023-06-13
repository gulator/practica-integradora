import {Router} from 'express';
import handlebars from 'express-handlebars';
import ProductManager from "../dao/modules/productManager.js";
import productService from "../dao/services/product.service.js";
import messageService from '../dao/services/message.service.js';
import { products } from '../utils.js';
import { mensajes } from '../app.js';
import { socketServer } from '../app.js';
import cartService from '../dao/services/cart.service.js';
const pm = new ProductManager('./products.json')

const viewsRouter = Router()

viewsRouter.get('/products', async (req, res)=>{
    
    try{
        let {limit, page, sort, brand, stock} = req.query;
    const newProductList = await productService.getAllproducts(limit, page, sort, brand, stock);
    
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
        nextLink: newProductList.links + `page=${newProductList.nextPage}`
      }
      
      res.render('home', result)
    }

    catch(err){
        res.status(500).send(err)
    }
    
    
})

viewsRouter.get('/carts/:cid', async (req, res)=>{
    
    try{
        let cid = req.params.cid
        let carrito = await cartService.getCartById(cid)
        let resultado = carrito[0].products
        // res.send(carrito)
        res.render('carts', {resultado})
    }
    catch(err){
        res.status(500).send(err)
    }
})


viewsRouter.get('/realtimeproducts',async (req,res)=>{
    //let newProductList = await pm.getProducts()
    // let newProductList = await productService.getAllproducts()
    // products.push(newProductList)
    // res.render('realTimeProducts',{newProductList})
    try{
        let {limit, page, sort, brand, stock} = req.query;
    const newProductList = await productService.getAllproducts(limit, page, sort, brand, stock);
    let prevL = 1
    let nextL =2
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
        nextLink: nextL
      }
      
      res.render('realtimeproducts', {result})
    }

    catch(err){
        res.status(500).send(err)
    }
})

viewsRouter.get('/chat', async (req, res)=>{
    let messageList = await messageService.getAllMessages()
    res.render('chat', {messageList})
})

export { viewsRouter }