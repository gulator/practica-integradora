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
    let pendiente = [];
    let products = [];
    let amount = 0;

    for (let item of data.products) {
      let productAmount = await this.repositoryProducts.getProduct(
        item.product
      );

      if (item.quantity > productAmount[0].stock) {
        delete item.amount;
        pendiente.push({
          ...item,
          code: productAmount[0].code,
          title: productAmount[0].title,
          price: productAmount[0].price,
        });
      } else {
        amount += item.amount;
        delete item.amount;
        products.push(item);
        let newStock = productAmount[0].stock - item.quantity;
        await this.repositoryProducts.updateProduct(item.product, {
          stock: newStock,
        });
      }
    }
    const newData = { ...data, amount: amount, products: products };
    const pendingData = { ...data, products: pendiente };

    const ticket = await this.repository.createTicket(newData);
    let result;
    if (!ticket) {
      result = { status: 400, msg: "error al crear ticket" };
    } else {
      result = { status: 201, msg: pendingData, ticketData: ticket };
    }

    return result;
  }
}

const ticketController = new TicketController();
export default ticketController;
