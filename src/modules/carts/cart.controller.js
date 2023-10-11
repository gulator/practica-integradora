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
  async checkCart(cartId, products) {
    const cart = await this.service.getCartById(cartId);
    let filteredCart = [];
    let pending = []
    cart[0].products.forEach((element) => {
      products.forEach((item) => {
        if (element.product._id.equals(item._id)) {
          if (item.stock > 0) {
            if (element.quantity > item.stock) {
              const elementPending = {...element}
              elementPending.quantity = element.quantity - item.stock
              pending.push(elementPending)
              element.quantity = item.stock
              filteredCart.push(element);
            } else {
              filteredCart.push(element);
          }
          }else if (item.stock === 0){
            pending.push(element)
          }
        }
      });
    });
    return {filteredCart, pending}
  }

  async getAllCarts() {
    return await this.service.getAllCarts();
  }

  async addProduct(cartId, item) {
    
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
    
  }

  async deleteProduct(cartId, productId) {
    const isInCart = await this.service.findProductInCart(cartId, productId);
    if (isInCart) {
      const cart = await this.service.deleteProduct(cartId, productId);
    }
  }

  async emptyCart(cartId) {
    return await this.service.emptyCart(cartId);
  }

  async eraseCart(cartId) {
    return await this.service.eraseCart(cartId);
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
