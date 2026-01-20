// Import Boom to handle HTTP errors (like 404) in a standard way
const boom = require('@hapi/boom');
// Import the initialized Sequelize models from our library
const { models } = require('../libs/sequelize');

class ProductsService {

  constructor() {
    // No initialization state needed for this service
  }

  /**
   * Creates a new product in the database.
   * After creation, it calls findOne to return the product 
   * WITH its associated category data.
   */
  async create(data) {
    // .create() generates the INSERT SQL command
    const newProduct = await models.Product.create(data);
    // Reuse findOne to return the full object (including the category)
    return this.findOne(newProduct.id);
  }

  /**
   * Retrieves all products from the database.
   * Uses Eager Loading to join the Category table.
   */
  async find() {
    const rta = await models.Product.findAll({
      // 'include' performs a LEFT JOIN with the categories table
      // so the response has a 'category' object instead of just a 'categoryId'
      include: ['category'],
    });
    return rta;
  }

  /**
   * Finds a specific product by its Primary Key (ID).
   * Throws a 404 error if the product doesn't exist.
   */
  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      // We include the category here so single-product views are complete
      include: ['category']
    });
    
    // Check if the database returned anything
    if (!product) {
      // Boom.notFound sends a clean 404 response to the client
      throw boom.notFound('product not found');
    }
    return product;
  }

  /**
   * Updates an existing product.
   * First, it verifies the product exists using findOne.
   */
  async update(id, changes) {
    // Logic: verify existence first. If not found, findOne throws the 404.
    const product = await this.findOne(id);
    
    // .update() only changes the fields provided in 'changes'
    const updatedProduct = await product.update(changes);
    return updatedProduct;
  }

  /**
   * Deletes a product from the database.
   */
  async delete(id) {
    // Logic: verify existence first.
    const product = await this.findOne(id);
    
    // .destroy() generates the DELETE SQL command
    await product.destroy();
    
    // Return the ID of the deleted item to confirm to the client
    return { id };
  }

}

// Export the class so it can be instantiated in the router
module.exports = ProductsService;