const express = require('express');
const CustomerService = require('../services/customer.service'); // Asegúrate de tener este servicio
const validatorHandler = require('../middlewares/validator.handler');
const { createCustomerSchema, getCustomerSchema, updateCustomerSchema } = require('../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

// GET: Leer todos los clientes
router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

// POST: Crear un nuevo cliente (Aquí es donde Insomnia enviará los datos)
router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;