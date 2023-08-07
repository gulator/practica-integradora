import config from "../../config/config.js";

export let dao;

export async function initializeDao(){
switch (config.persistence) {
  case "MONGO":
    const { default: ProductsMongo } = await import("./product.mongo.dao.js");
    dao = new ProductsMongo();
    break;

  // case "MEMORY":
  //   const { default: ProductsMemory } = await import("./product.file.dao.js");
  //   dao = new ProductsMemory();
  //   break;
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
