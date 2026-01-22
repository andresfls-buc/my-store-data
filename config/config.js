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
  // ESTA ES LA CLAVE: En Vercel, esta variable contiene toda la conexión.
  // Si no la agregas aquí, db/config.js dará el error "undefined".
  dbUrl: process.env.DATABASE_URL, 
};

module.exports = { config };