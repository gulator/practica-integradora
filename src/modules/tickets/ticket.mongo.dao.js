import { ticketModel } from "./ticket.model.js";

export default class TicketMongoDAO{
    constructor(){
        this.model = ticketModel;
    }

    async createTicket(data) {
        return await this.model.create(data);
      }
}