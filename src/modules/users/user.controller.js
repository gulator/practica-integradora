// import UserService from "./user.mongo.dao.js";
import { userModel } from "./user.models.js";
import { comparePassword, hashPassword } from "../../utils.js";
import { initializeDao, getDao } from "./user.factory.js";
import UserRepository from "./user.repository.js";
import MailingService from "../../config/mailing.service.js";

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
  async deleteUser(id){
    return this.repository.deleteUser(id)
  }
  async deleteInactives(){
    const results = await this.repository.getAll();
    let usersInactive = 0
    results.forEach(user => {
      const dif = new Date() - new Date (user.last_conection)
      if (dif / (1000 * 60 * 60) >= 48){
        
        let mailData = {
          from: "Lighting Legs <gulator@gmail.com>",
          to: `${user.email}`,
          subject: "Deleted Account",
          html: `<p>Estimado ${user.first_name}:</p>
          <p>Su cuenta en el sitio Lighting Legs ha sido borrada debido a estar inactiva por más de 48 hs</p>
          <p>Atte,</p>
          <p>Lighting Legs Team</p>
          `,
        };
        let mailService = new MailingService();
        mailService.sendMail(mailData);
        usersInactive += 1
        this.repository.deleteUser(user._id)
      } 
    });
    return {usersInactive:usersInactive}
  }
  async lastConnection (id, date){
    await this.repository.lastConnection(id, date)
  }
  async uploadFileToUser(user, document){
    const value = document.name
    if(user[value] === true){
      return ({status: 409, message: `file ${value} has already been uploaded for this user`})   
    }else{
    await this.repository.uploadFileToUser(user._id, document)
    return ({status: 200, message: `file uploaded`})
    }
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

  async roleChange(uid, role){
    if(role === 'user'){
      await this.repository.roleChange (uid, 'premium')
      return {status:200, message: 'Role cambiado a Premium', role: 'premium'}
    }else if(role === 'premium'){
      await this.repository.roleChange (uid, 'user')
      return {status:200, message: 'Role cambiado a User', role: 'user'}
    }else if(role === 'admin'){
      return {status:401, message: 'Usuarios Admin no pueden cambiar su rol', role: 'admin'}
    }else{
      return {status:400, message: 'Rol no reconocido', role: 'unknown'}
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
