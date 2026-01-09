const { Sequelize } = require('sequelize');

// Importing configuration
const { config } = require('../config/config');
// Encoding the user to handle special characters
const USER = encodeURIComponent(config.dbUser);
// Encoding the password to handle special characters
const PASSWORD = encodeURIComponent(config.dbPassword);
// Connection URI
const URI = `postgresql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: true,
});

// Test the connection
module.exports = sequelize;