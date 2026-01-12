// Necesitamos importar Boom para convertir los errores de Sequelize
const { conflict, badRequest } = require('@hapi/boom');

/**
 * 1. logErrors:
 * Su única función es mostrar el error en la consola del servidor
 * para que nosotros como desarrolladores sepamos qué pasó.
 */
function logErrors (err, req, res, next) {
  console.error(err);
  next(err); // Pasa el error al siguiente middleware
}

/**
 * 2. ormErrorHandler:
 * Específico para Sequelize. Identifica errores de la base de datos
 * y los transforma en errores tipo "Boom" para que el cliente
 * reciba un mensaje claro (ej: "email ya existe").
 */
function ormErrorHandler(err, req, res, next) {
  // Errores de campos únicos (como el email duplicado)
  if (err.name === 'SequelizeUniqueConstraintError') {
    next(conflict(`${err.errors[0].path} ya existe.`));
  } 
  // Errores de validación en el modelo de Sequelize
  else if (err.name === 'SequelizeValidationError') {
    next(badRequest(err.errors[0].message));
  } 
  // Errores de llaves foráneas (relaciones entre tablas)
  else if (err.name === 'SequelizeForeignKeyConstraintError') {
    next(badRequest('Restricción de llave foránea: el registro está vinculado.'));
  } 
  // Si no es un error de Sequelize, sigue al siguiente middleware
  else {
    next(err);
  }
}

/**
 * 3. boomErrorHandler:
 * Identifica si el error es de tipo Boom (ya sea porque vino de Joi
 * o porque ormErrorHandler lo convirtió). Si es así, responde al cliente.
 */
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err); // Si no es Boom, pasa al errorHandler genérico
  }
}

/**
 * 4. errorHandler:
 * El "atrapalo-todo". Si el error no fue manejado por los anteriores,
 * aquí se envía como un Error 500 (Internal Server Error).
 */
function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    // Ocultamos el stack si no estamos en desarrollo por seguridad
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
}

module.exports = { 
  logErrors, 
  ormErrorHandler, 
  boomErrorHandler, 
  errorHandler 
};