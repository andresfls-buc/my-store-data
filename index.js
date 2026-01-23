// index.js (In the Root)
require('dotenv').config();
const express = require('express');
const routerApi = require('./routes'); // This looks for ./routes/index.js by default
const { logErrors, ormErrorHandler, boomErrorHandler, errorHandler } = require('./middlewares/error.handler');

const app = express();
app.use(express.json());

// Basic health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'active',
    dbUrl: process.env.DATABASE_URL ? 'Detected' : 'Missing' 
  });
});

// This calls the function you just sent me
routerApi(app);

// Error Middlewares
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;