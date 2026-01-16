const Joi = require('joi');

// Definimos las reglas para cada campo
const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone = Joi.string();
const userId = Joi.number().integer();

// Regla para CREAR un cliente
const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  userId: userId.required(),
});

// Regla para ACTUALIZAR un cliente
const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId,
});

// Regla para BUSCAR un cliente por ID
const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };