import { productModel } from "../../dao/models/product.model.js";

class ProductService {
  constructor() {
    this.model = productModel;
  }
  async getAllproducts(limit = 10, page = 1, sort="sin", brand="nada", stock) {
    // console.log(`lim: ${limit}, page: ${page}, sorting: ${sort}, category: ${category}`)
    console.log(brand)
    let filtro = {}
    if (brand !== "nada"){
        filtro = {brand}
        if (stock === "true"){
          filtro = {brand, stock: {$gt: 0}}
        }
        else if (stock === "false"){
          filtro = {brand, stock: {$eq: 0}}
        }
        else{
          filtro = {brand, stock: {$gte: 0}}
        }
    }
    else if (stock === "true"){
      filtro = {stock: {$gt: 0}}
    }
    else if (stock === "false"){
      filtro = {stock: {$eq: 0}}
    }
    else{
      filtro = {stock: {$gte: 0}}
    }
    let queryResult
    console.log(filtro)
    if (sort === "sin"){
        queryResult = await productModel.paginate(filtro, {page, limit, lean:true })
    }else{
        queryResult = await productModel.paginate(filtro, {page, limit, sort:{price: sort}, lean:true })
    }
    
    let links

    if (sort === "sin"){
        if (brand === "nada"){            
            if (stock === undefined){
              links = `?limit=${limit}&`
            }
            else{
              links = `?limit=${limit}&stock=${stock}&`
            }
        }
        else{
            links = `?limit=${limit}&brand=${brand}&stock=${stock}&`
        }
    }
    else if(brand === "nada" || !brand ){
      if (stock === undefined){
        links = `?limit=${limit}&sort=${sort}&`
      }
      else{
        links = `?limit=${limit}&sort=${sort}&stock=${stock}&`
      }        
    }
    else{
      if (stock === undefined){
        links = `?limit=${limit}&brand=${brand}&sort=${sort}&`
      }
      else{
        links = `?limit=${limit}&brand=${brand}&sort=${sort}&stock=${stock}&`
      } 
    }
    return {links, ...queryResult}


    // let queryProductos =
    //   category !== undefined
    //     ? await productModel.paginate(
    //         { brand: { $in: [category] } },
    //         { limit: limit, page: page, lean:true} //sort: {price: sort }
    //       )
    //     : await productModel.paginate(
    //         {},
    //         { limit: limit, page: page, lean:true}
    //       );

    // let busqueda = await this.model.find().lean();
    // let objeto = {"status": "success", "payload":queryProductos.docs, ...queryProductos}

    // return queryProductos;

    // if (limit) {
    //     query = query.limit(limit);
    // }
  }

  async getProduct(productId) {
    return await this.model.find({ _id: productId });
  }

  async addProduct(product) {
    return await this.model.create(product);
  }

  async deleteProduct(productId) {
    if (!productId) {
      throw new Error("Faltan Campos");
    }
    return await this.model.deleteOne({ _id: productId });
  }

  async updateProduct(productId, data) {
    if (!productId) {
      throw new Error("Faltan Campos");
    }
    return await this.model.updateOne({ _id: productId }, data);
  }
}

const productService = new ProductService();

export default productService;
