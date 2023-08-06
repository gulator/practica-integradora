// import UserService from "./user.mongo.dao.js";
import { userModel } from "./user.models.js";
import { initializeDao, getDao } from "./user.factory.js";
import UserRepository from "./user.repository.js";

await initializeDao()

// const daoModel = dao
class UserController {
    constructor(){
        this.repository = new UserRepository(getDao())
        // this.repository = new UserRepository(dao)
    }

    async createUser(user){
        return await this.repository.createUser(user)
    }
    async getAll(){
        return this.repository.getAll()
            }
    async getByEmail(mail){
        return this.repository.getByEmail(mail)
    }
    async findById(id){
        return this.repository.findById(id)
    }

    async addCartToUser(userId, cid) { 
          
          return await this.repository.addCartToUser(userId, cid);
        
    }
}

const userController = new UserController()
export default userController