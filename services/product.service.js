
//const boom = require('@hapi/boom');

const pool = require('../dataBase/mysql.pool');


class ProductsService {

  constructor(){
    
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  

  async create(data) {
    return new Promise((resolve, reject) =>{
      pool.query(`INSERT INTO productos SET ?`, data, (error, result) =>{
          return error ? reject(error) : resolve(result);
      })
  });

  }

  async find() {
    return new Promise((resolve, reject) =>{
      pool.query(`SELECT * FROM productos`, (error, result) =>{
          return error ? reject(error) : resolve(result);
      }, 5000)
    });
  }

  async findOne(id) {
    return new Promise((resolve, reject) =>{
      pool.query(`SELECT * FROM productos WHERE id = ${id}`, (error, result) =>{
          return error ? reject(error) : resolve(result);
      })
  });
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
