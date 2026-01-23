// libs/sequelize.js
const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setUpModels = require('./../db/models');
/* FIX: Manually require 'pg' to solve the "Please install pg package manually" error on Vercel */
const pg = require('pg'); 

const options = {
  dialect: 'postgres',
  /* FIX: Explicitly provide the pg module to Sequelize */
  dialectModule: pg, 
  logging: config.env === 'dev' ? console.log : false,
};

// SSL configuration for production
if (config.env === 'production') {
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

const sequelize = new Sequelize(connectionUri, options);

setUpModels(sequelize);

module.exports = sequelize;