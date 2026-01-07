const boom = require('@hapi/boom');

const getConnection = require('../libs/postgres');

class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

  async find() {
  const client = await getConnection();
  try {
    const rta = await client.query('SELECT * FROM task'); // 👈 SINGULAR
    return rta.rows;
  } catch (error) {
    console.error(error); // 👈 CLAVE
    throw error;
  } finally {
    await client.end();
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
