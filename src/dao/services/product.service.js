import { productModel } from "../../dao/models/product.model.js";

class ProductService {
  constructor() {
    this.model = productModel;
  }
  async getAllproducts(limit = 10, page = 1, sort="sin", brand="nada") {
    // console.log(`lim: ${limit}, page: ${page}, sorting: ${sort}, category: ${category}`)
    
    let filtro = {}
    if (brand !== "nada"){
        filtro = {brand}
    }
    let queryResult
    if (sort === "sin"){
        queryResult = await productModel.paginate(filtro, {page, limit, lean:true })
    }else{
        queryResult = await productModel.paginate(filtro, {page, limit, sort:{price: sort}, lean:true })
    }
    
    let links

    if (sort === "sin"){
        if (brand === "nada"){
            links = `?limit=${limit}&`
        }
        else{
            links = `?limit=${limit}&brand=${brand}&`
        }
    }
    else if(brand === "nada" || !brand ){
        links = `?limit=${limit}&sort=${sort}&`
    }
    else{
        links = `?limit=${limit}&brand=${brand}&sort=${sort}&`
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
