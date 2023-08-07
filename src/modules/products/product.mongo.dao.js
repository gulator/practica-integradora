import { productModel } from "./product.model.js";

export default class ProductMongoDAO {
  constructor() {
    this.model = productModel;
  }
  async getAllproducts(limit, page, sort, filtro) {
   
    let queryResult
    if (sort === "sin"){
        queryResult = await this.model.paginate(filtro, {page, limit, lean:true })
    }else{
        queryResult = await this.model.paginate(filtro, {page, limit, sort:{price: sort}, lean:true })
    }    
    
    return queryResult
   
  }

  async getProduct(productId) {
    return await this.model.find({ _id: productId });
  }

  async addProduct(product) {
    return await this.model.create(product);
  }

  async deleteProduct(productId) {
    return await this.model.deleteOne({ _id: productId });
  }

  async updateProduct(productId, data) {
    return await this.model.updateOne({ _id: productId }, data);
  }
}

// const productService = new ProductService();

// export default ProductService;
