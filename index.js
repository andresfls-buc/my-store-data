const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, ormErrorHandler ,  boomErrorHandler, errorHandler} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);  // 1 Logging errors
app.use(ormErrorHandler);  // 2 ORM error handling convert SQL errors to Boom
app.use(boomErrorHandler);  // 3 Boom error handling
app.use(errorHandler);  // 4 500 response if nothing else work


app.listen(port, () => {
  console.log('Mi port' +  port);
});
