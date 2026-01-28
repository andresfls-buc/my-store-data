'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'customer',
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('users', 'role');
  }
};
