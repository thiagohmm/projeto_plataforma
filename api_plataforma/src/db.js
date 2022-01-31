var mysql = require('mysql');
const Logger = require('./logger_service')
const logger = new Logger('db')
require('dotenv').config({ path: '.env' })


var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'plataforma_db',

});

connection.connect(function (err) {
  // try {

  //   console.log('connected!');
  //   logger.info('Conexão com banco de dados iniciada');

  //   setInterval(function () {
  //     connection.query('SELECT 1');
  // }, 5000);

  // } catch (err) {
  //   console.log(err);
  //   logger.err(`erro de banco de dados ${err}`)

  if (err) throw err;
  console.log("Connected!");
  
});
module.exports = connection;
