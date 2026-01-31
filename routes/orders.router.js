const express = require('express');
const passport = require('passport');

const OrderService = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getOrderSchema } = require('./../schemas/order.schema');
const { addItemSchema } = require('./../schemas/order-product.schema');
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

router.post('/', 
  // Verify who is the user
  passport.authenticate('jwt', { session: false }),

 async (req, res, next) => {
  try {

    const user = req.user; // The user object is attached to the request by passport

    const newOrder = await service.create({

      userId: user.sub // 'sub' contains the user ID from the JWT payload
    });
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

// POST add item to an order
router.post('/add-item',
  // Protect the addition of items to authenticated users
   passport.authenticate('jwt', { session: false }),
   validatorHandler(addItemSchema, 'body'), 
  // If validation passes, this function runs
  async (req, res, next) => {
  try {
    const body = req.body;
    const newItem = await service.addItem(body);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
});

// PATCH update order
router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
   async (req, res, next) => {
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
router.delete('/:id', 
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
