// db/config.js
require('dotenv').config();

// Extraemos la URL de la base de datos de las variables de entorno
const dbUrl = process.env.DATABASE_URL;

module.exports = {
  // Configuración para Vercel (Producción)
  production: {
    url: dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        // Obligatorio para conectar con bases de datos en la nube (Vercel/Neon)
        rejectUnauthorized: false
      }
    }
  },
  // Configuración para tu entorno local (Desarrollo)
  development: {
    url: dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
};