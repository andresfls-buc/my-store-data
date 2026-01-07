const boom = require('@hapi/boom');

// connection to postgres using pool
const pool = require('../libs/postgres.pool.js');

class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

async find() {
    try {
      // CAMBIO: usamos pool.query directamente (no client, no end)
      const rta = await pool.query(
        'SELECT * FROM task ORDER BY id ASC' 
        // CAMBIO: ORDER BY para mantener el orden de creación
      );
      return rta.rows;
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
