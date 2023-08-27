import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color:{
    type: String,
    required: true
  },  
  code: {
    type: String,
    unique: true,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  owner: {
    type: String,
    default: 'admin'
  }
});

productSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model("products", productSchema);
