// config/config.js
require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  apiKey: process.env.API_KEY,
  
  /* FIX: Ensure this matches the EXACT name you used in the Vercel Dashboard.
     Vercel usually provides 'DATABASE_URL' automatically if using their Postgres,
     or you added it manually as 'DATABASE_URL'.
  */
  dbUrl: process.env.DATABASE_URL, 
};

module.exports = { config };