// Modelo de mi dB para la tabla de clientes
const { Model, DataTypes, Sequelize } = require('sequelize');

// El nombre de la tabla en la base de datos (Postgres)
const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
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
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name', // En JS es lastName, en la DB es last_name
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  /** * ARREGLO 1: Campo userId
   * Sin esto, Insomnia te daba error 500 porque no encontraba dónde guardar el ID del usuario
   */
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true, // Un usuario solo puede ser UN cliente (relación 1 a 1)
    references: {
      model: 'users', // Nombre de la tabla de usuarios
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Customer extends Model {
  static associate(models) {
    /** * ARREGLO 2: Asociación con User
     * Esto permite que cuando busques un cliente, puedas ver también los datos de su usuario
     */
    this.belongsTo(models.User, { as: 'user' });

    // Un cliente puede tener muchas órdenes (esto ya lo tenías bien)
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'customerId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE };