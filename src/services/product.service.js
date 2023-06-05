import { productModel } from "../models/product.model.js";

class ProductService{
    constructor(){
        this.model = productModel;
    }
    async getAllproducts(){
        
        return await this.model.find().lean()
    }

    async addProduct(product){
        console.log(product)
        return await this.model.create(product)
    }

    async removeProduct (productId){
        return await this.model.findOneAndDelete( { _id: productId})
    }

    async editProduct (productId, data){
        return await this.model.updateOne( {_id: productId}, data)
    }
}

const productService = new ProductService()

export default productService