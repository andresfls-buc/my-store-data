const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

// Importamos el cliente de la base de datos
const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash,
    });
   // Eliminate the password field before returning the user object
    delete newUser.dataValues.password;


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

  async findByEmail(email) {
    try {
      
      const rta = await models.User.findOne({
        where: { email }
      });
      return rta;
    } catch (error) {
      console.error(error);
      throw boom.internal('Error al obtener el usuario por email');
    }
  }

  async findOne(id) {
    // Find user by primary key
    const user = await models.User.findByPk(id , {
      include: ['customer']
    });
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
