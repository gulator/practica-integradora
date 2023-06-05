import {Router} from 'express';
import handlebars from 'express-handlebars';
import ProductManager from "../modules/productManager.js";
import productService from "../services/product.service.js";
import { products } from '../utils.js';
import { socketServer } from '../app.js';
const pm = new ProductManager('./products.json')

const viewsRouter = Router()

viewsRouter.get('/', async (req, res)=>{
    let newProductList = await productService.getAllproducts()
    console.log(newProductList)
    res.render('home', {newProductList})
})

viewsRouter.get('/realtimeproducts',async (req,res)=>{
    let newProductList = await pm.getProducts()
    products.push(newProductList)
    res.render('realTimeProducts',{newProductList})
})

export { viewsRouter }