// db/config.js
const { config } = require('../config/config');

// Forzamos el uso de la URL completa para producción
const URI = config.dbUrl;

module.exports = {
  development: {
    url: config.dbUrl || `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        // Obligatorio para conectar con bases de datos externas desde Vercel
        rejectUnauthorized: false
      }
    }
  }
};