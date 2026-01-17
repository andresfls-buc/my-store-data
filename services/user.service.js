const boom = require('@hapi/boom');

// Importamos el cliente de la base de datos
const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

async find() {
    try {
      // Obtener todos los usuarios de la base de datos
      const rta = await models.User.findAll({
        include: ['customer']
      });
      return rta;
    } catch (error) {
      console.error(error);
      throw boom.internal('Error al obtener las tareas');
    }
  }

  async findOne(id) {
    // Find user by primary key
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }

    return user;
  }

  async update(id, changes) {
    // Find user by findOne method
    const user = await this.findOne(id);
    
    // Update user with the provided changes
    const updatedUser = await user.update(changes);
    return updatedUser;
  }

  async delete(id) {
    // Find user by primary key
      const user = await models.User.findByPk(id);
      
      await user.destroy();
    return { id };
  }
}

module.exports = UserService;
