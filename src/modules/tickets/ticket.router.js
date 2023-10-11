import MyRouter from "../../routes/router.js";
import ticketController from "./ticket.controller.js";
import MailingService from "../../config/mailing.service.js";
import passport from "passport";
import config from "../../config/config.js";

import jwt from "jsonwebtoken";

export default class TicketRouter extends MyRouter {
  init() {
    this.post("/", ["USER", "PREMIUM"], async (req, res) => {
      try {
        let user = req.user;
        let payload = req.body;
        
        const ticket = await ticketController.createTicket({
          "purchaser": user._id,
          ...payload,
        });
        const itemsList = payload.extras
        function Rows(items) {
          let rows = '';
          items.forEach(item => {
            rows += `
              <tr>
                <td>${item.title}</td>
                <td style="text-align: center">${item.quantity}</td>
                <td style="text-align: center">$${item.subtotal}</td>
              </tr>
            `;
          });
          return rows;
        }
        
        let mailData = {
          from: "Lighting Legs <gulator@gmail.com>",
          to: `${user.email}`,
          subject: `Detalle de su compra ${ticket.ticketData._id}`,
          html: `<p>Estimado ${user.first_name}:</p>
          <p>Su compra esta siendo preparada</p>
          <p>Detalle de su compra:</p>
          <table>
            <thead>
              <tr>
                <th >Producto</th>
                <th >Cantidad</th>
                <th >Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${Rows(itemsList)}
            </tbody>
          </table>
          <p>Total abonado: $${ticket.ticketData.amount}</p>
          `,
        };
        
        let mailService = new MailingService();
        await mailService.sendMail(mailData);
        
        res.send({status: ticket.status, msg: ticket.msg, ticket:ticket.ticketData });
      } catch (err) {
        res.status(500).send({ error: err });
      }
    });
  }
}
