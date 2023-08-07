import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  purchase_datetime: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true
  },
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
ticketSchema.pre('find', function(){
    this.populate('products.product')
})
export const ticketModel = mongoose.model("tickets", ticketSchema);
