import { initializeDao, getDao } from "./ticket.factory.js";
import {
  initializeDaoProducts,
  getDaoProducts,
} from "../products/product.factory.js";
import TicketRepository from "./ticket.repository.js";
import ProductRepository from "../products/product.repository.js";

await initializeDao();
await initializeDaoProducts();

class TicketController {
  constructor() {
    this.repository = new TicketRepository(getDao());
    this.repositoryProducts = new ProductRepository(getDaoProducts());
  }
  async createTicket(data) {

    for (let item of data.products) {
      let productAmount = await this.repositoryProducts.getProduct(
        item.product
      );
      // let newStock = productAmount[0].stock - item.quantity;
      //   await this.repositoryProducts.updateProduct(item.product, {
      //     stock: newStock,
      //   });
      
    }
    const newData = {purchaser: data.purchaser, products: data.products, amount: data.amount, purchase_datetime: new Date () };
    
    const ticket = await this.repository.createTicket(newData);
    let result;
    if (!ticket) {
      result = { status: 400, msg: "error al crear ticket", ticketData: 'No ticket' };
    } else {
      result = { status: 201, msg: "compra efectuada", ticketData: ticket };
    }

    return result;
  }
}

const ticketController = new TicketController();
export default ticketController;
