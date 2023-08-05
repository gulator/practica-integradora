import { response } from "express";
import { cartModel } from "./cart.model.js";
import CartService from "./cart.service.js";
import { productModel } from "../products/product.model.js";
import { products } from "../../utils.js";

class CartController {
  constructor() {
    this.service = new CartService(cartModel);
  }

  async addCart() {
    let cart = await this.service.addCart();
    return cart;
  }

  async getCartById(cartId) {
    return await this.service.getCartById(cartId);
  }

  async getAllCarts() {
    return await this.service.getAllCarts();
  }

  async addProduct(cartId, item) {
    // if (!cartId || !item) {
    // throw new Error ('one or both required fields are missing')
    // }
    // else{
    const isInCart = await this.service.findProduct(cartId, item);
    if (isInCart) {
      return await this.service.updateProduct(cartId, item);
    } else {
      return await this.service.addProduct(cartId, item);
    }
  }

  async editQuantity(cartId, item) {
    const isInCart = await this.service.findProduct(cartId, item);
    
    if (isInCart) {
      return await this.service.editQuantity(cartId, item);
    }
    // else {
    //   let cart = await cartModel.findOne({ _id: cartId });
    //   cart.products.push({ product: item.pid, quantity: item.quantity });
    //   return await cartModel.updateOne({ _id: cartId }, cart);
    // }
  }

  //}
  //const cartObjectId = mongoose.Types.ObjectId(cartId)
  //let valor = this.model.updateOne({"_id":cartObjectId}, {$push:{"products":product}})
  // console.log(valor)
  // return await this.model.updateOne({"_id":cartObjectId}, {$push:{"products":product}})

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

  async deleteProduct(cartId, productId) {
    const isInCart = await this.service.findProductInCart(cartId, productId);
    if (isInCart) {
      const cart = await this.service.deleteProduct(cartId, productId);
    }
  }

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

  async deleteCart(cartId) {
    // return await this.model.deleteOne({ _id: cartId });
    return await this.service.deleteCart(cartId);
  }
  async editCart(cartId, item) {
    const isInCart = await this.service.findProduct(cartId, item);
    if (isInCart) {
      return await this.service.updateProduct(cartId, item); 
    } else {
      return await this.service.editCart(cartId, item);
    }
  }
}

const cartController = new CartController();

export default cartController;
