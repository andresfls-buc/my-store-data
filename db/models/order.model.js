// Modelo de mi dB para la tabla de órdenes

const { Model, DataTypes, Sequelize } = require('sequelize');

// Importamos el nombre de la tabla de clientes para la relación (Foreign Key)
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
    defaultValue: 'pending', // pending, paid, shipped, delivered
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
    // Una orden pertenece a un cliente
    this.belongsTo(models.Customer, { as: 'customer' });
    
    // Una orden puede tener muchos productos a través de una tabla intermedia
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct, // Esta es la tabla pivote
      foreignKey: 'orderId',
      otherKey: 'productId'
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