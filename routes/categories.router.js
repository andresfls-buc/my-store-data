const express = require('express');
const passport = require('passport');

const CategoryService = require('./../services/category.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { checkRoles } = require('./../middlewares/auth.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/category.schema');

const router = express.Router();
const service = new CategoryService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer' , 'seller'),
  async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer' , 'seller'),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin' , 'seller'),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  checkRoles('admin', 'seller'),
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  checkRoles('admin', 'seller'),
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      // Capture the result if needed
      const result =await service.delete(id);
      //If nothing was deleted (like null or 0 ) ,trigger 404.
      if (!result) {
        return res.status(404).json({ 
          message: `Category with id ${id} not found`
         });
      }
      res.status(200).json({
        message: 'Category deleted successfully',
        id
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
