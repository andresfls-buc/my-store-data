const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize'); // Importamos la conexión a la DB

class CustomerService {
  constructor() {}

  // Función para buscar a todos los clientes
  async find() {
    const rta = await models.Customer.findAll({
        include: ['user'] // Esto trae también la info del usuario relacionado
    });
    return rta;
  }

  // Función para crear un cliente nuevo
  async create(data) {
    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  // Función para buscar un solo cliente
  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }
}

module.exports = CustomerService;