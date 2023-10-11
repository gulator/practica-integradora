import { response } from "express";
import { cartModel } from "./cart.model.js";
import { productModel } from "../products/product.model.js";
import { products } from "../../utils.js";

class CartService {
  constructor(model) {
    this.model = model;
  }

  async addCart() {
    let cart = await this.model.create({});
    return cart;
  }

  async getCartById(cartId) {
    return await this.model
      .find({ _id: cartId })
      .lean()
      .populate("products.product");
  }

  async getAllCarts() {
    return await this.model.find();
  }

  async findProduct(cartId, item) {
    const isInCart = await this.model.findOne({
      _id: cartId,
      "products.product": { $in: [item.pid] },
    });
    return isInCart;
  }
  async findProductInCart(cartId, productId) {
    const isInCart = await this.model.findOne({
      _id: cartId,
      "products.product": { $in: [productId] },
    });

    return isInCart;
  }

  async updateProduct(cartId, item) {
    return await this.model.findOneAndUpdate(
      {
        _id: cartId,
        "products.product": item.pid,
      },
      {
        $inc: { "products.$.quantity": item.quantity },
      },
      { new: true }
    );
  }
  async addProduct(cartId, item) {
    let cart = await this.model.findOne({ _id: cartId });
    cart.products.push({ product: item.pid, quantity: item.quantity });
    return await this.model.updateOne({ _id: cartId }, cart);
  }

  async editQuantity(cartId, item) {
    return await this.model.findOneAndUpdate(
      {
        _id: cartId,
        "products.product": item.pid,
      },
      {
        $set: { "products.$.quantity": item.quantity },
      },
      { new: true }
    );
  }

  async deleteProduct(cartId, productId) {
    const cart = await this.model.findOneAndUpdate(
      { _id: cartId },
      { $pull: { products: { product: productId } } },
      { new: true }
    );
    return cart;
  }

  async emptyCart(cartId) {
    return await this.model.findOneAndUpdate(
      {
        _id: cartId,
      },
      {
        $set: { products: [] },
      },
      { new: true }
    );
  }

  async eraseCart(cartId) {
    return await this.model.deleteOne({ _id: cartId });
  }

  async editCart(cartId, item) {
    let cart = await this.model.findOne({ _id: cartId });
    cart.products.push({ product: item.pid, quantity: item.quantity });
    return await this.model.updateOne({ _id: cartId }, cart);
  }
}

export default CartService;
