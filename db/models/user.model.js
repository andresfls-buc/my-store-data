const { Model, DataTypes, Sequelize} = require('sequelize');

// Definición de la estructura de la tabla de usuarios
const USER_TABLE = 'users';

// Definición del esquema de la tabla de usuarios
const UserSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  
    password: {
    allowNull: false,
    type: DataTypes.STRING
    
  },
  
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  
  }
}

class User extends Model {
  static associate() {
    // Definir asociaciones aquí si es necesario
  }

   // Configuración del modelo
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User };