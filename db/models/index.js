const { Customer, CustomerSchema } = require('./customer.model');
const { Order, OrderSchema } = require('./order.model');
const { User, UserSchema } = require('./user.model');
const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');

function setupModels(sequelize) {
  // 1. Inicialización (Construir las casas)
  Customer.init(CustomerSchema, Customer.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));

  // 2. Asociaciones (Conectar los cables)
  // IMPORTANTE: Se hace DESPUÉS de que todos los modelos están inicializados
  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setupModels;