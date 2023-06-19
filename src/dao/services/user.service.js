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
}

export default UserService = new UserService()