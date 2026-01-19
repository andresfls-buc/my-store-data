const { Model, DataTypes, Sequelize } = require('sequelize');

const CUSTOMER_TABLE = 'customers'; 
const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    field: 'customer_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'pending', 
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Order extends Model {
  static associate(models) {
    // Relación 1:1 o N:1 - Una orden pertenece a un solo cliente
    this.belongsTo(models.Customer, { as: 'customer' });
    
    // Relación N:N - Una orden tiene muchos productos
    this.belongsToMany(models.Product, {
      as: 'items', // Nombre de la relación para los includes (e.g., { include: ['items'] })
      through: models.OrderProduct, // Modelo de la tabla pivote
      foreignKey: 'orderId', // FK hacia este modelo (Order)
      otherKey: 'productId'  // FK hacia el otro modelo (Product)
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}

module.exports = { Order, OrderSchema, ORDER_TABLE };