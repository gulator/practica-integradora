import { Server } from "socket.io"
import { mensajes } from "./app.js";
import messageService from "./dao/services/message.service.js";

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
      
  
      // socket.on('update', (updatedProducts) => {
      //   socketServer.emit('enviado', console.log(updatedProducts));
      // });
    });
  
    return socketServer;
  }
