import { messageModel } from "../models/message.model.js";

class MessageService{
    constructor(){
        this.model = messageModel;
    }

    async getAllMessages(){
        return this.model.find().lean()
    } 

    async insertMessage(msg){
        return this.model.create(msg)
    }

}

const messageService = new MessageService()

export default messageService