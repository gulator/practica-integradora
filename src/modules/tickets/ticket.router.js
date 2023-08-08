import MyRouter from "../../routes/router.js";
import ticketController from "./ticket.controller.js";
// import { generateToken } from "../../middlewares/jwt.middleware.js";
import passport from "passport";
import config from "../../config/config.js";

// import UserFactory from "./user.factory.js";
import jwt from "jsonwebtoken";

// let userController = new UserFactory ()

export default class TicketRouter extends MyRouter {
  init() {
    this.post("/", ["USER"], async (req, res) => {
      try {
        let userMail = req.user.email;
        let payload = req.body;
        
        const ticket = await ticketController.createTicket({
          "purchaser": userMail,
          ...payload,
        });
        
        res.status(ticket.status).send({ msg: ticket.msg, ticket:ticket.ticketData });
      } catch (err) {
        res.status(500).send({ error: err });
      }
    });
  }
}
