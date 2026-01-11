
const { Customer, CustomerSchema } = require('./customer.model');

const { Order, OrderSchema } = require('./order.model');

const { User, UserSchema } = require('./user.model');

const { Category, CategorySchema } = require('./category.model');

const { Product, ProductSchema } = require('./product.model');

function setupModels(sequelize) {
  // Customer model initialization
  Customer.init(CustomerSchema, Customer.config(sequelize));

  // Aquí se pueden inicializar otros modelos y sus asociaciones
  User.init(UserSchema, User.config(sequelize));

  Category.init(CategorySchema, Category.config(sequelize));

  // Product model initialization 
  Product.init(ProductSchema, Product.config(sequelize));

  // Order model initialization
  Order.init(OrderSchema, Order.config(sequelize));

}

module.exports = setupModels;