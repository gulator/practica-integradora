import config from "../../config/config.js";

export let dao;

export async function initializeDao(){
switch (config.persistence) {
  case "MONGO":
    const { default: UsersMongo } = await import("./user.mongo.dao.js");
    dao = new UsersMongo();
    break;

  case "MEMORY":
    const { default: UsersMemory } = await import("./user.file.dao.js");
    dao = new UsersMemory();
    break;
}}

export function getDao(){
  return dao
}

// export default class UserFactory {
//   constructor() {
//     this.dao = dao;
//   }
//   async createUser(user) {
//     return await this.dao.createUser(user);
//   }
//   async getAll() {
//     return await this.dao.getAll();
//   }
//   async getByEmail(mail) {
//     console.log(dao)
//     return await this.dao.getByEmail(mail);
//   }
//   async findById(id) {
//     return await this.dao.findById(id);
//   }

  // async addCartToUser(userId, cid) {

  //       return await this.dao.addCartToUser(userId, cid);

  // }
//}
