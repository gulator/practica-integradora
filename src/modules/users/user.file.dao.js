export default class UserFileDAO {
  constructor() {
    this.model = [
      {
        _id: 1,
        first_name: "Admin",
        last_name: "Coder",
        email: "adminCoder@coder.com",
        age: 21,
        password:
          "$2b$10$xk253Idjh6KlDhVOtNc78eXoIqOQCJ8dhQm36IPRs5pheRLD3zyFS",
        role: "user",
        carts: [],
      },
    ];
  }

  async createUser(user) {
    const highestId =
      this.model.length > 0 ? Math.max(...this.model.map((item) => item._id)) : 1;
    const newUser = { ...user, _id: highestId + 1, carts: [] };
    this.model.push(newUser);
    return newUser;
  }
  async getAll() {
    return this.model;
  }
  async getByEmail(mail) {
    return this.model.find((item) => item.email === mail);
  }
  async findById(id) {
    return this.model.find((item) => item._id === id);
  }

  async addCartToUser(userId, cid) {
    // let user = await this.model.findOne({ _id: userId });
    let userIndex = this.model.findIndex((item) => item._id === userId);
    if (userIndex < 0) {
      throw new Error("User not found");
    } else {
      this.model[userIndex].carts.push({ cart: cid });
      return this.model[userIndex];
    }
  }
}

//export default UserService = new UserService()
