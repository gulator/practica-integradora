import config from "../../config/config.js";

export let dao;

export async function initializeDaoProducts(){
switch (config.persistence) {
  case "MONGO":
    const { default: ProductsMongo } = await import("./product.mongo.dao.js");
    dao = new ProductsMongo();
    break;

  // case "MEMORY":
  //   const { default: ProductsMemory } = await import("./product.file.dao.js");
  //   dao = new ProductsMemory();
  //   break;
}}

export function getDaoProducts(){
  return dao
}

