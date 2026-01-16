// Modelo de mi dB para la tabla de productos

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

  // ✅ FOREIGN KEY (THIS WAS MISSING)
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
    field: 'create_at', // ✅ fixed typo
    defaultValue: Sequelize.NOW
  }
};

class Product extends Model {
  static associate(models) {
    // ✅ Product belongs to Category
    this.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'categoryId'
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
