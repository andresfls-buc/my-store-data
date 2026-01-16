const boom = require('@hapi/boom');

// Importamos el cliente de la base de datos
const { models } = require('../libs/sequelize');

class CategoryService {

  constructor(){
  }
 async create(data) {
  const newCategory = await models.Category.create(data);
  return newCategory;
}


  async find() {
  const rta = await models.Category.findAll({
    include: [
      {
        model: models.Product,
        as: 'products'
      }
    ]
  });
  return rta;
}


  async findOne(id) {
  const category = await models.Category.findByPk(id, {
    include: ['products']
  });

  if (!category) {
    throw boom.notFound('Category not found');
  }

  return category;
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

module.exports = CategoryService;
