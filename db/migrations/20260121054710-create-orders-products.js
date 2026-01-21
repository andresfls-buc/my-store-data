'use strict';

const ORDER_PRODUCT_TABLE = 'orders_products';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        field: 'order_id', // DB column name
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'orders', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      // THIS IS THE MISSING COLUMN:
      productId: {
        field: 'product_id', // DB column name
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};