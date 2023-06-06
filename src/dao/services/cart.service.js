import { response } from "express";
import { cartModel } from "../../dao/models/cart.model.js";
import { productModel } from "../models/product.model.js";
import { products } from "../../utils.js";

class CartService{
    constructor(){
        this.model = cartModel;
    }

    async addCart() {
        return await this.model.create({})
    }

    async getCartById(cartId){
        return await this.model.find({_id: cartId}).populate('products.product')
    }

    async getAllCarts(){
        return await this.model.find()
    }

    async addProduct (cartId, item){      
        // if (!cartId || !item) {
        // throw new Error ('one or both required fields are missing')
        // }
        // else{
            let cart = await cartModel.findOne({_id: cartId})
            cart.products.push({product: item.pid, quantity: item.quantity})            
           return await cartModel.updateOne({_id: cartId}, cart)           
            
        //}
        //const cartObjectId = mongoose.Types.ObjectId(cartId)
        //let valor = this.model.updateOne({"_id":cartObjectId}, {$push:{"products":product}})
        // console.log(valor)
       // return await this.model.updateOne({"_id":cartObjectId}, {$push:{"products":product}})
        
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