// libs/sequelize.js
const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setUpModels = require('./../db/models');
const pg = require('pg'); 

const options = {
  dialect: 'postgres',
  dialectModule: pg, 
  // Only log queries if we are in development mode
  logging: config.isProd ? false : console.log,
};

/**
 * SSL CONFIGURATION
 * We use a "Double Check" here: 
 * If config says production OR if we detect the Vercel platform.
 */
if (config.isProd || process.env.VERCEL) {
  options.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  };
}

const connectionUri = config.dbUrl 
  ? config.dbUrl 
  : `postgres://${encodeURIComponent(config.dbUser)}:${encodeURIComponent(config.dbPassword)}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

/* COMMENT: 
   Using the URI ensures all credentials (special characters) 
   are handled correctly by Sequelize. 
*/
const sequelize = new Sequelize(connectionUri, options);

setUpModels(sequelize);

module.exports = sequelize;