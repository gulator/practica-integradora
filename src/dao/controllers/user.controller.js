import UserService from "../services/user.service.js";
import { userModel } from "../models/user.models.js";

class UserController {
    constructor(){
        this.service = new UserService(userModel)
    }

    async createUser(user){
        return await this.service.createUser(user)
    }
    async getAll(){
        return this.service.getAll()
            }
    async getByEmail(mail){
        return this.service.getByEmail(mail)
    }
    async findById(id){
        return this.service.findById(id)
    }

    async addCartToUser(userId, cid) { 
          
          return await this.service.addCartToUser(userId, cid);
        
    }
}

const userController = new UserController()
export default userController