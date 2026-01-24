const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async find(query) {
    const options = {
      include: ['user'], // includes related user
    };
   // Pagination
  if (limit && offset) {
    options.limit = Number(limit);
    options.offset = Number(offset);
  }

  // THIS LOG IS CRITICAL - Look at your terminal!
  console.log("Sequelize Options:", JSON.stringify(options, null, 2));
    const rta = await models.Customer.findAll(options);
    return rta;
  }

  async create(data) {

    // Create a new customer along with the associated user
    const newCustomer = await models.Customer.create(data,{
      include: ['user']
    });
    return newCustomer;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      include: ['user'] // includes related user
    });
    if (!customer) throw boom.notFound('customer not found');
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const updatedCustomer = await customer.update(changes);
    return updatedCustomer;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
