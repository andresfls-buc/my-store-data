const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}

  // CREATE a new order
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  /**
   * ADD ITEM to an order (The N:N logic)
   * This method saves the relationship in the 'orders_products' table.
   * Expected data: { orderId: 3, productId: 1, amount: 5 }
   */
  async addItem(data) {
    // We use the OrderProduct model which represents our pivot table
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  // GET all orders
  async find() {
    const rta = await models.Order.findAll({
      include: ['customer'] 
    });
    return rta;
  }

  // GET one order by ID
  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      // 'customer' and 'items' must match the aliases in your Order model associations
      include: [
        {
          association: 'customer',
          include: ['user'] // Fetches the user account associated with the customer
        },
        'items' // Fetches the list of products via the OrderProduct pivot table
      ]
    });
    
    if (!order) {
      throw boom.notFound('order not found');
    }
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