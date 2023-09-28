import { Server } from "socket.io"
import { mensajes } from "./app.js";
import messageService from "./dao/services/message.service.js";
import config from "./config/config.js";
import bcrypt from 'bcrypt';
import {faker} from '@faker-js/faker'
import winston from 'winston'

let products = []
export {products}


export function configSocketServer(httpServer) {
    const socketServer = new Server(httpServer);
  
    socketServer.on('connection', async (socket) => {
      console.log('nuevo usuario conectado'); 
      let messageList = await messageService.getAllMessages()
      socket.emit('messages', messageList)
      socket.on('message', async (msj)=>{
        // mensajes.push(msj)
        await messageService.insertMessage(msj)
        let messageList = await messageService.getAllMessages()
        socketServer.emit('messages', messageList)
      })
    });
  
    return socketServer;
  }

  export const hashPassword = (password) => {
   return bcrypt.hashSync (password, bcrypt.genSaltSync(10))
  }
  export const comparePassword = (user, pass) => {
   return bcrypt.compareSync (pass, user.password)
  }

  export function generateProduct(){
  
    const producto = {
      id: faker.database.mongodbObjectId(),
      title: faker.commerce.productName(),
      price: faker.commerce.price({min:6000, max: 9000, dec: 0}),
      color: faker.color.human(),
      code: faker.string.numeric(6)
    }
    return producto
  }

 