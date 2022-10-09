const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string().min(3).max(15);
// const price = Joi.number().integer().min(10);
// const image = Joi.string().uri();

const createProductSchema = Joi.object({
  nombre: nombre.required(),

});

const updateProductSchema = Joi.object({
  nombre: nombre,
  // price: price,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
