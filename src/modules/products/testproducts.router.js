import { Router } from "express";
import ProductManager from "./productManager.js";
import productService from "./product.service.js";
import productController from "./product.controller.js";
import { generateProduct } from "../../utils.js";
import { socketServer } from "../../app.js";
import MyRouter from "../../routes/router.js";
const pm = new ProductManager('./products.json')

// const productRouter = Router();
export default class TestProductRouter extends MyRouter{
init(){
this.get('/',['PUBLIC'], async (req, res) => {
    try {
        let {limit, page, sort, category} = req.query;
        const newProductList = await productController.getAllproducts(limit, page, sort, category);
        let prevL = 1
        let nextL =2
        res.status(200).send({
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
          })

        
        }
    //     
     
    catch (err) {
        res.send(err)
    }
})
this.get("/mockingproducts",['PUBLIC'], async (req, res) => {
    try{
        let mockProducts = []
        for(let i= 0; i < 100; i++){
            mockProducts.push(generateProduct())
            // console.log(i)
        }
        // console.log('hola')
        res.send(mockProducts)
        
    }catch(err){
        res.status(500).send({err})
    }
})

this.get("/:pid", ['PUBLIC'],async (req, res) => {
    try {
        let pid = req.params.pid
        let producto = await productController.getProduct(pid)
        if (producto === false) {
            res.status(400).send({ error: 'ID no encontrado' })
        } else {
            res.send(producto)
        }

    } catch (err) {
        res.send(err)
    }
})

this.post("/",['PUBLIC'], async (req, res) => {
    try {
        // console.log(req.body)
        let value = await productController.addProduct(req.body)
        console.log(value)
        if (value === false) {
            res.status(400).send({ status: 400, error: 'Campos incompletos o incorrectos' })
        } else if (value === 'code repeated') {
            res.status(400).send({ status: 400, error: 'El campo code ya se encuentra cargado para otro producto' })
        }   
        else {
            //socketServer.emit('update', await pm.getproducts())
            socketServer.emit('update', await productController.getAllproducts())
            req.logger.info(`Product ${value._id} created by ${value.owner} on ${new Date().toLocaleString()}`);
            res.status(201).send(value)
        }

    } catch (err) {
        res.send(err)
    }
})


this.put("/:pid",['PUBLIC'], async (req, res) => {
    try {
        let pid = req.params.pid
        //let productEdit = await pm.updateProduct(pid, req.body)
        let productEdit = await productController.updateProduct(pid, req.body)
        if (!productEdit) {
            res.status(400).send({ error: 'Uno o más campos no son válidos' })
        } else if (productEdit === 400) {
            res.status(400).send({ error: 'el campo ID no puede ser modificado' })
        } else if (productEdit === 404) {
            res.status(404).send({ error: 'El id indicado no corresponde a un producto valido' })
        }
        else{
            //socketServer.emit('update', await pm.getproducts())
            socketServer.emit('update', await productController.getAllproducts())
            res.send(productEdit)
        }
    }
    catch (err) {
        res.send(err)
    }
})

this.delete("/:pid",['PUBLIC'], async (req, res) => {
    try {
        let pid = req.params.pid
        //let productDelete = await pm.deleteProduct(pid)
        let productDelete = await productController.deleteProduct(pid)
        if (!productDelete) {
            res.status(404).send({ error: 'El id indicado no corresponde a un producto valido' })
        }        
        else{
            //socketServer.emit('update', await pm.getproducts())
            socketServer.emit('update', await productController.getAllproducts())
            res.send({message:`se borró producto con id: ${pid}`})
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
})



}
}
// export { productRouter }

