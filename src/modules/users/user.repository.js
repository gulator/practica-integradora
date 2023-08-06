// import UserService from "./user.mongo.dao.js";

import UserDTO from "./user.dto.js"
export default class UserRepository {
    constructor(dao){
        this.dao = dao
    }

    async createUser(user){
        let newUser = await this.dao.createUser(user)
        return new UserDTO(newUser)
    }
    async getAll(){
        return this.dao.getAll()
            }
    async getByEmail(mail){
        return this.dao.getByEmail(mail)
    }
    async findById(id){
        return this.dao.findById(id)
    }

    async addCartToUser(userId, cid) { 
          
          return await this.dao.addCartToUser(userId, cid);
        
    }
}

// const userController = new UserController()
// export default userController