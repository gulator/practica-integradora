import ProductService from "./product.service.js";
import ProductRepository from "./product.repository.js";
import { initializeDaoProducts, getDaoProducts } from "./product.factory.js";
import { productModel } from "./product.model.js";
import MailingService from "../../config/mailing.service.js";
await initializeDaoProducts()

class ProductController {
    constructor() {
      this.repository = new ProductRepository(getDaoProducts());
    }
    async getAllproducts(limit = 10, page = 1, sort="sin", brand="nada", stock) {
      // console.log(`lim: ${limit}, page: ${page}, sorting: ${sort}, category: ${category}`)
      let filtro = {}
      if (brand !== "nada"){
          filtro = {brand}
          if (stock === "true"){
            filtro = {brand, stock: {$gt: 0}}
          }
          else if (stock === "false"){
            filtro = {brand, stock: {$eq: 0}}
          }
          else{
            filtro = {brand, stock: {$gte: 0}}
          }
      }
      else if (stock === "true"){
        filtro = {stock: {$gt: 0}}
      }
      else if (stock === "false"){
        filtro = {stock: {$eq: 0}}
      }
      else{
        filtro = {stock: {$gte: 0}}
      }
      let queryResult = await this.repository.getAllproducts(limit, page, sort, filtro)
   
      
      let links
  
      if (sort === "sin"){
          if (brand === "nada"){            
              if (stock === undefined){
                links = `?limit=${limit}&`
              }
              else{
                links = `?limit=${limit}&stock=${stock}&`
              }
          }
          else{
              links = `?limit=${limit}&brand=${brand}&stock=${stock}&`
          }
      }
      else if(brand === "nada" || !brand ){
        if (stock === undefined){
          links = `?limit=${limit}&sort=${sort}&`
        }
        else{
          links = `?limit=${limit}&sort=${sort}&stock=${stock}&`
        }        
      }
      else{
        if (stock === undefined){
          links = `?limit=${limit}&brand=${brand}&sort=${sort}&`
        }
        else{
          links = `?limit=${limit}&brand=${brand}&sort=${sort}&stock=${stock}&`
        } 
      }
      return {links, ...queryResult}
  
    }
  
    async getProduct(productId) {
      return await this.repository.getProduct(productId)
    }
  
    async addProduct(product) {
      return await this.repository.addProduct(product);
    }
  
    async deleteProduct(productId) {
      if (!productId) {
        throw new Error("Faltan Campos");
      }
      const producto = await this.repository.getProduct(productId)
      if(producto[0].owner !== 'admin'){
      let mailData = {
        from: "Lighting Legs <gulator@gmail.com>",
        to: `${producto[0].owner}`,
        subject: "Producto eliminado",
        html: `<p>Estimado:</p>
        <p>El producto con id: ${producto[0]._id} (${producto[0].title}) ha sido eliminado del sitio Lighting Legs</p>
        <p>Atte,</p>
        <p>Lighting Legs Team</p>
        `,
      };
      let mailService = new MailingService();
      mailService.sendMail(mailData);
    }
      return await this.repository.deleteProduct(productId);
     
    }
  
    async updateProduct(productId, data) {
      if (!productId) {
        throw new Error("Faltan Campos");
      }
      return await this.repository.updateProduct(productId, data);
    }
    
  }
  
  const productController = new ProductController();

  export default productController;