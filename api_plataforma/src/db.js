var mysql = require('mysql');
const Logger = require('./logger_service')
const logger = new Logger('db')
require('dotenv').config({ path: '.env' })


var connection = mysql.createPool({
  connectionLimit : 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'plataforma_db',

});

connection.getConnection((err,connection)=> {
  if(err)
  throw err;
  console.log('Database connected successfully');
  connection.release();
});

module.exports = connection;
