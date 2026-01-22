// index.js (Raíz)
require('dotenv').config();
const express = require('express');
const routerApi = require('./routes');
const { logErrors, ormErrorHandler, boomErrorHandler, errorHandler } = require('./middlewares/error.handler');

const app = express();
app.use(express.json());

// Ruta de salud: Si esta funciona, el servidor está bien, el problema es Sequelize
app.get('/health', (req, res) => {
  res.send('Servidor activo');
});

routerApi(app);

// Middlewares de error
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;