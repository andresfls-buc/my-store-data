const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProductsService {

  constructor() {
    // nothing needed here
  }

  // CREATE product in DB
  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  // GET all products
  async find() {
    const rta = await models.Product.findAll();
    return rta;
  }

  // GET one product by id
  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  // UPDATE product
  async update(id, changes) {
    const product = await this.findOne(id);
    const updatedProduct = await product.update(changes);
    return updatedProduct;
  }

  // DELETE product
  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }

}

module.exports = ProductsService;
