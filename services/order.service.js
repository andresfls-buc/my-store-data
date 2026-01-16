const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}

  // CREATE a new order
  async create(data) {
    // data must include customerId (and optionally other fields)
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  // GET all orders
  async find() {
    const rta = await models.Order.findAll({
      include: ['customer'] // include the customer linked to this order
    });
    return rta;
  }

  // GET one order by ID
  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: ['customer'] // optional: fetch customer info
    });
    if (!order) throw boom.notFound('order not found');
    return order;
  }

  // UPDATE order
  async update(id, changes) {
    const order = await this.findOne(id);
    const updatedOrder = await order.update(changes);
    return updatedOrder;
  }

  // DELETE order
  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }
}

module.exports = OrderService;
