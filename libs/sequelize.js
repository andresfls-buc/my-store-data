const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setUpModels = require('./../db/models');

const options = {
  dialect: 'postgres',
  logging: config.env === 'dev' ? console.log : false, // Log only in dev mode
};

// CRITICAL: Add SSL configuration for production (Vercel)
if (config.env === 'production') {
  options.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false // Required for most cloud DBs
    }
  };
}

/* FIX: Check if we have a full dbUrl (DATABASE_URL). 
  If we do, use it directly. Otherwise, build it from parts.
*/
const connectionUri = config.dbUrl 
  ? config.dbUrl 
  : `postgres://${encodeURIComponent(config.dbUser)}:${encodeURIComponent(config.dbPassword)}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(connectionUri, options);

setUpModels(sequelize);

module.exports = sequelize;