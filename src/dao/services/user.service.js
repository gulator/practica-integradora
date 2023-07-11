import { userModel } from "../models/user.models.js";

class UserService {
    constructor(){
        this.model = userModel
    }

    async createUser(user){
        return await this.model.create(user)
    }
    async getAll(){
        return this.model.find()
            }
    async getByEmail(mail){
        return this.model.findOne({email: mail})
    }
    async findById(id){
        return this.model.findOne({_id: id})
    }

    async addCartToUser(userId, cid) { 

          let user = await userModel.findOne({ _id: userId });
          console.log('user Found:', user)
          user.carts.push({ cart: cid });
          
          return await userModel.updateOne({ _id: userId }, user);
        
    }
}

export default UserService = new UserService()