const express = require('express');

const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schemas');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();

  res.json(products);
});

router.get('/filter', (req, res) =>{
  res.send('filtroooo');
});

//Encontrar un producto por su ID
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next)=> {
    try {
      const { id }= req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
      //Atrapamos de forma explicita el error con el middleware
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const rta = await service.delete(id, body);
  res.json(rta);
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
