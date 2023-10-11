import config from "../../config/config.js";

export let dao;

export async function initializeDao(){
switch (config.persistence) {
  case "MONGO":
    const { default: UsersMongo } = await import("./user.mongo.dao.js");
    dao = new UsersMongo();
    break;

  case "MEMORY":
    const { default: UsersMemory } = await import("./user.file.dao.js");
    dao = new UsersMemory();
    break;
}}

export function getDao(){
  return dao
}

