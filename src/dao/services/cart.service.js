import { cartModel } from "../../dao/models/cart.model.js";

class CartService{
    constructor(){
        this.model = cartModel;
    }

    async addCart() {
        let product = []
        return await this.model.create({products: product})
    }

    async getCartById(cartId){
        return await this.model.find({_id: cartId})
    }
    
    // async getAllproducts(limit){

    //     let query = this.model.find();
    // if (limit) {
    //     query = query.limit(limit);
    // }
    // return await query.lean();
    // }

    // async getProduct(productId){
    //     return await this.model.find({_id: productId})
    // }

    // async addProduct(product){
    //     return await this.model.create(product)
    // }

    // async deleteProduct (productId){
    //     if (!productId){
    //         throw new Error('Faltan Campos')
    //     }
    //     return await this.model.deleteOne( { _id: productId})
    // }

    // async updateProduct (productId, data){
    //     if (!productId){
    //         throw new Error('Faltan Campos')
    //     }
    //     return await this.model.updateOne( {_id: productId}, data)
    // }
}

const cartService = new CartService()

export default cartService