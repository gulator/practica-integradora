export default class UserFileDAO {
  constructor() {
    this.model = [];
  }

  async createUser(user) {
    const newUser = { ...user, id: this.model.length + 1 };
    this.model.push(newUser);
    return newUser;
  }
  async getAll() {
    return this.model;
  }
  async getByEmail(mail) {
    console.log('aca llego el mail:', mail)
    return await this.model.find(item =>item.email === mail)
  }
  async findById(id) {
    return this.model.find(item => item.id === id)
  }

//   async addCartToUser(userId, cid) {
//     let user = await this.model.findOne({ _id: userId });
//     user.carts.push({ cart: cid });

//     return await this.model.updateOne({ _id: userId }, user);
//   }
}

//export default UserService = new UserService()
