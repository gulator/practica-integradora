import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
            type: Number
        }
      },
    ],
    default: [],
  }
});
cartSchema.pre('find', function(){
  this.populate('products.product')
})

export const cartModel = mongoose.model("carts", cartSchema);
