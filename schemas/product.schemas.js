const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string().min(3).max(50);
const precio = Joi.number();
// const image = Joi.string().uri();

const createProductSchema = Joi.object({
  nombre: nombre.required(),
  precio: precio.required(),
});

const updateProductSchema = Joi.object({
  nombre: nombre,
  precio: precio,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
