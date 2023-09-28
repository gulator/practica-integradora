import { userModel } from "./user.models.js";

export default class UserMongoDAO {
  constructor() {
    this.model = userModel;
  }

  async createUser(user) {
    return await this.model.create(user);
  }
  async getAll() {
    return this.model.find();
  }
  async getByEmail(mail) {
    return this.model.findOne({ email: mail });
  }
  async findById(id) {
    return this.model.findOne({ _id: id });
  }
  async deleteUser(id){
    return this.model.deleteOne({_id: id})
  }

  async lastConnection (id, date){
    return await this.model.updateOne(
      { _id: id },
      { $set: { last_conection: date } }
    );
  }

  async uploadFileToUser(id, document){
    let user = await this.model.findOne({ _id: id });
    user.documents.push(document)
    const valorOpcion = document.name
    if(valorOpcion === 'identificacion'){
      await this.model.updateOne({ _id: id }, user)
      return await this.model.updateOne({ _id: id }, {$set: {identificacion: true }})
    }
    else if(valorOpcion === 'domicilio'){
      await this.model.updateOne({ _id: id }, user)
      return await this.model.updateOne({ _id: id }, {$set: {domicilio: true }})
    }
    else if(valorOpcion === 'estado'){
      await this.model.updateOne({ _id: id }, user)
      return await this.model.updateOne({ _id: id }, {$set: {estado: true }})
    }else{
      return await this.model.updateOne({ _id: id }, user)
    }
  }

  async addCartToUser(userId, cid) {
    let user = await this.model.findOne({ _id: userId });
    user.carts.push({ cart: cid });

    return await this.model.updateOne({ _id: userId }, user);
  }
  async changepsw(newpsw, userData) {
    return await this.model.updateOne(
      { _id: userData._id },
      { $set: { password: newpsw } }
    );
  }
  async changeRole(id, role) {
    return await this.model.updateOne({ _id: id }, { $set: { role: role } });
  }
}

//export default UserService = new UserService()
