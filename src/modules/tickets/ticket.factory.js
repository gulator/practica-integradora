import config from "../../config/config.js";

export let dao;

export async function initializeDao(){
switch (config.persistence) {
  case "MONGO":
    const { default: TicketsMongo } = await import("./ticket.mongo.dao.js");
    dao = new TicketsMongo();
    break;

//   case "MEMORY":
//     const { default: TicketsMemory } = await import("./ticket.file.dao.js");
//     dao = new TicketsMemory();
//     break;
}}

export function getDao(){
  return dao
}

