const express = require('express');
const OrderService = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createOrderSchema, getOrderSchema } = require('./../schemas/order.schema');
const router = express.Router();

const service = new OrderService();

// GET all orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// GET one order
router.get('/:id', validatorHandler(getOrderSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await service.findOne(id);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// POST create a new order
router.post('/', validatorHandler(createOrderSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const newOrder = await service.create(body);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

// PATCH update order
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedOrder = await service.update(id, body);
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
});

// DELETE order
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
