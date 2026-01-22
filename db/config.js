// db/config.js
// Importamos la configuración centralizada
const { config } = require('../config/config');

/**
 * En Vercel y entornos modernos, es mejor usar la URL completa (URI).
 * Si config.dbUrl existe (DATABASE_URL), la usamos directamente.
 * De lo contrario, usamos la construcción manual por si estás en local.
 */
const URI = config.dbUrl || `postgres://${encodeURIComponent(config.dbUser)}:${encodeURIComponent(config.dbPassword)}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        // Requerido para bases de datos en la nube como Vercel/Neon
        rejectUnauthorized: false
      }
    }
  },
  production: {
    url: URI,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}