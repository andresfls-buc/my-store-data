const Joi = require('joi');

// Definimos las reglas para cada campo
const id = Joi.number().integer();
const customerId = Joi.number().integer();
const status = Joi.string().valid('pending', 'paid', 'shipped', 'delivered');

// const get order by id
const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  status,
});

module.exports = {
  getOrderSchema,
  createOrderSchema,
};