// api/index.js
require('dotenv').config();
const express = require('express');
const routerApi = require('../routes'); // Added ../ because the file moved to /api
const { logErrors, ormErrorHandler, boomErrorHandler, errorHandler } = require('../middlewares/error.handler'); // Added ../

const app = express();
app.use(express.json());

// Health Check route
app.get('/health', (req, res) => {
  res.json({
    status: 'active',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Initialize Routes
routerApi(app);

// Error Middlewares
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

/* IMPORTANT: For Vercel, we export the app. 
   Vercel will handle the 'app.listen' logic internally.
*/
module.exports = app;