import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  role:{
    type: String,
    default: 'user'
  },
  carts:{
    type:[
      {
        cart:{
          type: mongoose.Schema.Types.ObjectId,
          ref:"carts",
        }
      }
    ],
    default:[]
  }
});
userSchema.pre('find', function(){
  this.populate('carts.cart')
})
export const userModel = mongoose.model("users", userSchema);
