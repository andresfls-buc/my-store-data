// routes/index.js
const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const orderRouter = require('./orders.router');
const customerRouter = require('./customers.router');

function routerApi(app) {
  // This creates a router instance for all v1 routes
  const router = express.Router();
  
  // This mounts all routes below under the /api/v1 prefix
  app.use('/api/v1', router);
  
  // These are now sub-routes of /api/v1
  router.use('/products', productsRouter); // Result: /api/v1/products
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);       // Result: /api/v1/users
  router.use('/orders', orderRouter);
  router.use('/customers', customerRouter);
}

module.exports = routerApi;