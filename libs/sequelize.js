const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setUpModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

// connection URI for PostgreSQL
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Crear la instancia de Sequelize 
const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: console.log, // Cambia true por console.log para quitar el Warning
});

setUpModels(sequelize);

// --- CAMBIO IMPORTANTE AQUÍ ---
// No uses .sync() suelto si puedes evitarlo, pero para que no te de timeout
// vamos a envolverlo en un catch para ver qué pasa realmente.
sequelize.sync()
  .then(() => console.log('Tablas sincronizadas'))
  .catch(err => console.error('Error al sincronizar:', err));

module.exports = sequelize;