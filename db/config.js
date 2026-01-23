// db/config.js
const { config } = require('../config/config');

// Ensure we have a fallback or a clear reference for the production URL
const URI = config.dbUrl;

module.exports = {
  development: {
    // Standard connection for local Docker/Dev
    url: config.dbUrl || `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`,
    dialect: 'postgres',
  },
  production: {
    /* FIX: Using 'use_env_variable' tells Sequelize CLI to look 
       directly at the environment variable name (e.g., 'DATABASE_URL') 
       defined in your Vercel Dashboard.
    */
    use_env_variable: 'DATABASE_URL', 
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        // Required for Prisma/Postgres on Vercel
        require: true, 
        rejectUnauthorized: false
      }
    }
  }
};