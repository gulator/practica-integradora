export default class ProductRepository{
    constructor(dao) {
        this.dao = dao;
      }
      async getAllproducts(limit, page, sort, filtro) {
        
        return await this.dao.getAllproducts(limit, page, sort, filtro)
       
      }
    
      async getProduct(productId) {
        return await this.dao.getProduct(productId);
      }
    
      async addProduct(product) {
        return await this.dao.addProduct(product);
      }
    
      async deleteProduct(productId) {
        return await this.dao.deleteProduct(productId);
      }
    
      async updateProduct(productId, data) {
        return await this.dao.updateProduct(productId, data);
      }

    }