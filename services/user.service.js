const boom = require('@hapi/boom');

// Importamos el cliente de la base de datos
const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

async find() {
    try {
      // Obtener todos los usuarios de la base de datos
      const rta = await models.User.findAll();
      return rta;
    } catch (error) {
      console.error(error);
      throw boom.internal('Error al obtener las tareas');
    }
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
