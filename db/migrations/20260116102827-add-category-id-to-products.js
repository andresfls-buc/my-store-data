'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'category_id', {
      allowNull: true, // important for now
      type: Sequelize.INTEGER
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('products', 'category_id');
  }
};
