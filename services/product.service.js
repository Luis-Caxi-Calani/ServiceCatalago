const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const pool = require('../dataBase/mysql.pool');


class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++){
      this.products.push({
         id: faker.datatype.uuid(),
         name: faker.commerce.productName(),
         price: parseInt(faker.commerce.price(), 10),
         image: faker.image.imageUrl(),
         isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct ={
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;

  }

  async find() {
    return new Promise((resolve, reject) =>{
      pool.query(`SELECT * FROM productos`, (error, result) =>{
          return error ? reject(error) : resolve(result);
      }, 5000)
    });
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock){
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {

    return new Promise((resolve, reject) =>{
      pool.query(`UPDATE productos SET ?  WHERE id = ${id}`, [changes], (error, result) =>{
          return error ? reject(error) : resolve(result);
      })
  });
  }

  async delete(id) {

    return new Promise((resolve, reject) =>{
      pool.query(`DELETE FROM productos WHERE id = ${id}`, (error, result) =>{
          return error ? reject(error) : resolve(result);
      })
  });
  }
}

module.exports = ProductsService;
