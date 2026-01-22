'use strict';

// Importamos los esquemas y nombres de tablas
const { UserSchema, USER_TABLE } = require('./../models/user.model');
const { CategorySchema, CATEGORY_TABLE } = require('./../models/category.model');
const { OrderSchema, ORDER_TABLE } = require('./../models/order.model');
const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/customer.model');
const { ProductSchema, PRODUCT_TABLE } = require('./../models/product.model');

/**
 * Función de utilidad para limpiar los esquemas de campos VIRTUALES.
 * PostgreSQL no reconoce el tipo 'VIRTUAL', por lo que deben ser eliminados
 * antes de ejecutar el comando createTable.
 */
function cleanSchema(schema) {
  const schemaCopy = { ...schema };
  Object.keys(schemaCopy).forEach(key => {
    // Si el tipo de dato es VIRTUAL, eliminamos la propiedad del objeto
    if (schemaCopy[key].type && schemaCopy[key].type.key === 'VIRTUAL') {
      delete schemaCopy[key];
    }
  });
  return schemaCopy;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * ARREGLO DE ORDEN LOGICO:
     * Las tablas deben crearse siguiendo sus dependencias (Foreign Keys).
     */

    // 1. Tablas base (No dependen de nadie)
    // Aplicamos cleanSchema a cada uno para evitar el error "type virtual does not exist"
    await queryInterface.createTable(USER_TABLE, cleanSchema(UserSchema));
    await queryInterface.createTable(CATEGORY_TABLE, cleanSchema(CategorySchema));
    await queryInterface.createTable(PRODUCT_TABLE, cleanSchema(ProductSchema));

    // 2. Tabla Customer (Depende de USER_TABLE)
    await queryInterface.createTable(CUSTOMER_TABLE, cleanSchema(CustomerSchema));

    // 3. Tabla Order (Depende de CUSTOMER_TABLE)
    await queryInterface.createTable(ORDER_TABLE, cleanSchema(OrderSchema));
  },

  async down(queryInterface) {
    /**
     * ARREGLO DE ORDEN EN DOWN:
     * Borrado en orden inverso para respetar restricciones de llaves foráneas.
     */
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  }
};