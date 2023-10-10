// import UserService from "./user.mongo.dao.js";

import UserDTO from "./user.dto.js";
export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createUser(user) {
    let newUser = await this.dao.createUser(user);
    return new UserDTO(newUser);
  }
  async getAll() {
    return this.dao.getAll();
  }
  async getByEmail(mail) {
    return this.dao.getByEmail(mail);
  }
  async findById(id) {
    return this.dao.findById(id);
  }
  async deleteUser(id) {
    return this.dao.deleteUser(id);
  }
  async activeCart(userId, idCart){
    return this.dao.activeCart(userId, idCart)
  }

  async lastConnection(id, date) {
    await this.dao.lastConnection(id, date);
  }

  async uploadFileToUser(id, document){
    await this.dao.uploadFileToUser(id, document)
  }

  async changepsw(newpsw, userData) {
    return this.dao.changepsw(newpsw, userData);
  }
  async changeRole(id, role) {
    return this.dao.changeRole(id, role);
  }
  async roleChange(id, role) {
    return this.dao.roleChange(id, role);
  }

  async addCartToUser(userId, cid) {
    return await this.dao.addCartToUser(userId, cid);
  }
}

// const userController = new UserController()
// export default userController
