const { User, UserSchema } = require('./user.model');

function setupModels(sequelize) {
  // Aquí se pueden inicializar otros modelos y sus asociaciones
  User.init(UserSchema, User.config(sequelize));

}

module.exports = setupModels;