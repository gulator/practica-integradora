import { productModel } from "../../dao/models/product.model.js";

class ProductService{
    constructor(){
        this.model = productModel;
    }
    async getAllproducts(limit){

        let query = this.model.find();
    if (limit) {
        query = query.limit(limit);
    }
    return await query.lean();
    }

    async getProduct(productId){
        return await this.model.find({_id: productId})
    }

    async addProduct(product){
        return await this.model.create(product)
    }

    async deleteProduct (productId){
        if (!productId){
            throw new Error('Faltan Campos')
        }
        return await this.model.deleteOne( { _id: productId})
    }

    async updateProduct (productId, data){
        if (!productId){
            throw new Error('Faltan Campos')
        }
        return await this.model.updateOne( {_id: productId}, data)
    }
}

const productService = new ProductService()

export default productService