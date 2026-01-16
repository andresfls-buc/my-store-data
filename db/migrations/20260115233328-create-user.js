'use strict';

// Importamos los esquemas y nombres de tablas
const { UserSchema, USER_TABLE } = require('./../models/user.model');
const { CategorySchema, CATEGORY_TABLE } = require('./../models/category.model');
const { OrderSchema, ORDER_TABLE } = require('./../models/order.model');
const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/customer.model');
const { ProductSchema, PRODUCT_TABLE } = require('./../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    /**
     * ARREGLO DE ORDEN LOGICO:
     * Las tablas deben crearse siguiendo sus dependencias (Foreign Keys).
     */
    
    // 1. Tablas base (No dependen de nadie)
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);

    // 2. Tabla Customer (Depende de USER_TABLE por el campo user_id)
    // Se debe crear ANTES que las órdenes.
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);

    // 3. Tabla Order (Depende de CUSTOMER_TABLE por el campo customer_id)
    // Ahora sí encontrará la relación porque Customers ya existe.
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
  },

  async down (queryInterface) {
    /**
     * ARREGLO DE ORDEN EN DOWN:
     * Para borrar, se hace en orden inverso (de la que más depende a la que menos)
     * para evitar errores de restricción de llaves foráneas.
     */
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  }
};