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
   */
  async create(data) {
    const newProduct = await models.Product.create(data);
    return this.findOne(newProduct.id);
  }

  /**
   * Retrieves all products with optional pagination.
   * @param {Object} query - Contains limit and offset for pagination
   */
  async find(query) { // <-- CORRECCIÓN: Ahora recibimos 'query' como parámetro
    const options = {
      include: ['category'],
      where: {}
    };

    // CORRECCIÓN: Extraemos limit y offset del objeto query recibido
    const { limit, offset } = query || {}; 

    if (limit && offset) {
      // CORRECCIÓN: Convertimos a Number para asegurar que Sequelize lo procese bien
      options.limit = parseInt(limit);
      options.offset = parseInt(offset);
    }

    // CORRECCIÓN: Todo este bloque ahora está dentro del scope de la función find
    const rta = await models.Product.findAll(options);
    return rta;
  }

  /**
   * Finds a specific product by its Primary Key (ID).
   */
  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category']
    });
    
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  /**
   * Updates an existing product.
   */
  async update(id, changes) {
    const product = await this.findOne(id);
    const updatedProduct = await product.update(changes);
    return updatedProduct;
  }

  /**
   * Deletes a product from the database.
   */
  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductsService;