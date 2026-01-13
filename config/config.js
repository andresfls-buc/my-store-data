require('dotenv').config();

const config ={
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER || 'root', // Cambiado de 'andres' a 'root' para desarrollo
    dbPassword: process.env.DB_PASSWORD || 'admin123',
    dbHost: process.env.DB_HOST || '127.0.0.1', // Cambiado de 'localhost' a '127.0.0.1'
    dbPort: process.env.DB_PORT || 3306,        // ¡EL CAMBIO CLAVE AQUÍ!
    dbName: process.env.DB_NAME || 'my_store',
}

module.exports = { config };