const { Model, DataTypes, Sequelize } = require('sequelize');

const ORDER_PRODUCT_TABLE = 'orders_products';

const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'orders', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'products', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
};

class OrderProduct extends Model {
  /**
   * Added this method to prevent the "TypeError: OrderProduct.associate is not a function"
   * Even if you don't define associations inside THIS model, the method must exist
   * because your setupModels logic calls it.
   */
  static associate(models) {
    // Usually, many-to-many join tables don't need to define associations 
    // here because they are defined in the Order and Product models using 'belongsToMany'
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false
    }
  }
}

module.exports = { OrderProduct, OrderProductSchema, ORDER_PRODUCT_TABLE };