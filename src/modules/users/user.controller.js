// import UserService from "./user.mongo.dao.js";
import { userModel } from "./user.models.js";
import { comparePassword, hashPassword } from "../../utils.js";
import { initializeDao, getDao } from "./user.factory.js";
import UserRepository from "./user.repository.js";

await initializeDao();

// const daoModel = dao
class UserController {
  constructor() {
    this.repository = new UserRepository(getDao());
    // this.repository = new UserRepository(dao)
  }

  async createUser(user) {
    return await this.repository.createUser(user);
  }
  async getAll() {
    return this.repository.getAll();
  }
  async getByEmail(mail) {
    return this.repository.getByEmail(mail);
  }
  async findById(id) {
    return this.repository.findById(id);
  }

  async changeRole (id){
    const user = await this.findById(id);
    if (user.role === 'user'){
      await this.repository.changeRole(id, 'premium')
      return {status:200, message: 'Role cambiado a Premium', role: 'premium'}
    }else if (user.role === 'premium'){
      await this.repository.changeRole(id, 'user')
      return {status:200, message: 'Role cambiado a User', role: 'user'}
    }else{
      return {status:400, message: 'Admin no puede cambiar de Role'}
    }
  }

  async changepsw (newpsw, userData){
    const hashPsw = hashPassword(newpsw)
    return await this.repository.changepsw(hashPsw, userData)
  }

  async addCartToUser(userId, cid) {
    return await this.repository.addCartToUser(userId, cid);
  }

  async checkpsw(newpsw, user){
    let userData = await this.findById(user._id)
    let result = comparePassword(userData, newpsw)
    if (result !== false){
        return ({status: 400, message: 'New password is the same as the current password'})
    }else{
        const newPsw = await this.changepsw(newpsw, userData)
        return ({status: 200, message: 'Password changed succesfully'})
    }
    

  }
}

const userController = new UserController();
export default userController;
