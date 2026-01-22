// Import Boom to handle HTTP errors (like 404) in a standard way
const boom = require('@hapi/boom');
// Import the initialized Sequelize models from our library
const { models } = require('../libs/sequelize');

const { Op } = require('sequelize');

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
  async find(query) { //  Ahora recibimos 'query' como parámetro
    const options = {
      include: ['category'],
      where: {}
    };

    const { price } = query || {}; //  Extraemos 'price' del objeto 'query'
    if (price) {
      options.where.price = price; //  Filtramos por precio si se proporciona
    }

    const { price_min, price_max } = query || {}; // Extraemos price_min y price_max del objeto query
    if (price_min && price_max) {
      options.where.price = {
        
        [Op.gte]: price_min,
        [Op.lte]: price_max
      };
    }

    // Extraemos limit y offset del objeto query recibido
    const { limit, offset } = query || {}; 

    if (limit && offset) {
      // Convertimos a Number para asegurar que Sequelize lo procese bien
      options.limit = parseInt(limit);
      options.offset = parseInt(offset);
    }

    // Todo este bloque ahora está dentro del scope de la función find
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