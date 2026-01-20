'use strict';

// Ensure this path correctly points to where PRODUCT_TABLE is defined
const { PRODUCT_TABLE } = require('../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // We only add 'created_at' because your model has 'timestamps: false'
    // and only defines 'createdAt' in its schema.
    await queryInterface.addColumn(PRODUCT_TABLE, 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });
  },

  async down (queryInterface, Sequelize) {
    // Reverting only the column we added
    await queryInterface.removeColumn(PRODUCT_TABLE, 'created_at');
  }
};