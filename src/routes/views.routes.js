import {Router} from 'express';
import handlebars from 'express-handlebars';
import ProductManager from "../dao/modules/productManager.js";
import productService from "../dao/services/product.service.js";
import { products } from '../utils.js';
import { socketServer } from '../app.js';
const pm = new ProductManager('./products.json')

const viewsRouter = Router()

viewsRouter.get('/', async (req, res)=>{

    let limit = parseInt(req.query.limit);
    let newProductList;
    if (limit) {
        //newProductList = await pm.getproducts(limit);
        newProductList = await productService.getAllproducts(limit);
    } else {
        newProductList = await productService.getAllproducts();
    }
    res.render('home', {newProductList})
})

viewsRouter.get('/realtimeproducts',async (req,res)=>{
    //let newProductList = await pm.getProducts()
    let newProductList = await productService.getAllproducts()
    products.push(newProductList)
    res.render('realTimeProducts',{newProductList})
})

export { viewsRouter }