const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  // Llave foránea hacia Categorías
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at', // Corregido a 'created_at' para consistencia con 'order_id', etc.
    defaultValue: Sequelize.NOW
  }
};

class Product extends Model {
  static associate(models) {
    // Relación 1:N - Un producto pertenece a una categoría
    this.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'categoryId'
    });

    // Relación N:N - Un producto puede estar en muchas órdenes
    // Se usa la misma tabla pivote que definimos en Order
    this.belongsToMany(models.Order, {
      as: 'orders',
      through: models.OrderProduct,
      foreignKey: 'productId', // FK de este modelo en la tabla pivote
      otherKey: 'orderId'      // FK del modelo destino en la tabla pivote
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    };
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };