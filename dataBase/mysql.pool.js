// const { Pool } = require('mysql');

// const pool = new Pool({
//   host: 'serviciocatalogo.cbzrro1p7ktm.us-east-1.rds.amazonaws.com',
//   port: 3306,
//   user: 'admin',
//   password: '12345678',
//   database: 'catalogo'
// });
// const mysql = require('mysql');

// const con = mysql.createConnection({
//     user: 'admin',
//     password: '12345678',
//     database: 'catalogo',
//     host: 'serviciocatalogo.cbzrro1p7ktm.us-east-1.rds.amazonaws.com',
//     port: 3306
// })

const mysql = require('mysql');
const { promisify } = require('util');

const pool = mysql.createPool({
host: 'serviciocatalogo.cbzrro1p7ktm.us-east-1.rds.amazonaws.com',
user: 'admin',
password: '12345678',
database: 'catalogo'
});

pool.getConnection(function(err, connection){
if(err){
if(err.code === 'PROTOCOL_CONNECTION_LOST'){
console.error('Database connection was closed.');
}

if(err.code === 'ER_CON_COUNT_ERROR'){
console.error('Database has to many connections');
}

if(err.code === 'ECONNREFUSED'){
console.error('Database connection was refused');
}
}

if(connection){
connection.release();
console.log('DB is Connected');
}

return;
});

pool.query = promisify(pool.query);

module.exports = pool;






