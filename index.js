// index.js (Debe estar en la RAÍZ de tu proyecto)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, ormErrorHandler, boomErrorHandler, errorHandler } = require('./middlewares/error.handler');

const app = express();
// Vercel asignará el puerto automáticamente
const port = process.env.PORT || 3000;

app.use(express.json());

// CORS: Permitimos todo temporalmente para que Insomnia no falle por origen
app.use(cors()); 

app.get('/', (req, res) => {
  res.send('Hola mi server en express está vivo en Vercel');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

// Aquí se cargan tus rutas complejas (/api/v1/customers, etc)
routerApi(app);

// Middlewares de error (El orden importa)
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Esto sirve para local, pero Vercel usará el export de abajo
app.listen(port, () => {
  console.log('Mi port ' + port);
});

// VITAL: Sin esta línea, Vercel no puede "levantar" tu app de Express
module.exports = app;

// Solo corre el listen si NO estás en Vercel
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
}