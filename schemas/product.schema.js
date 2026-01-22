const Joi = require('joi');

// Individual field definitions
const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
// This is required because every Product belongs to one Category (1:N)
const categoryId = Joi.number().integer(); 

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  // We require this so the database knows which category to link this product to
  categoryId: categoryId.required(), 
});

const updateProductSchema = Joi.object({
  name,
  price,
  image,
  categoryId, // Optional on update
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema
};