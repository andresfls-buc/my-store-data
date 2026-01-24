const express = require('express');
const CustomerService = require('../services/customer.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCustomerSchema, getCustomerSchema, updateCustomerSchema } = require('../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

// GET: Leer todos los clientes
router.get('/', async (req, res, next) => {
  try {
    //get the data from the service
    const customers = await service.find(req.query);
    //send the response
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

// --- ADDED: GET single customer by ID ---
// This handles http://localhost:3000/api/v1/customers/:id
router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'), // Validates that the ID is correct
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

// POST: Crear un nuevo cliente
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

// --- ADDED: PATCH to update a customer ---
router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

// --- ADDED: DELETE a customer ---
router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;