import { userModel } from "./user.models.js";

export default class UserMongoDAO {
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

          let user = await this.model.findOne({ _id: userId });
          user.carts.push({ cart: cid });
          
          return await this.model.updateOne({ _id: userId }, user);
        
    }
}

//export default UserService = new UserService()