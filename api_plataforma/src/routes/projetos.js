var express = require('express');
var router = express.Router();
const fs = require('fs')
const {promisify} = require("es6-promisify");
var db = require('../db');
var bodyParser = require('body-parser');
const Logger = require('../logger_service')
const logger = new Logger('app')

router.use(bodyParser.json()); // for parsing application/json

router.get('/', function (req, res, next) {
  try{

  const sql = 'SELECT * FROM projetos';
  
  db.query(sql, function (err, rows, fields) {
    res.json(rows);
    logger.info(`GET /projetos - ${JSON.stringify(rows)}`);
  });
  
  
  
}catch (err) {
  res.status(400).send({ error: err.message });
	
}
});

/*get method for fetch single product*/
router.get('/:id', function (req, res, next) {
  let id = req.params.id;
  var sql = `SELECT * FROM projetos WHERE id_projeto=${id}`;
  db.query(sql, function (err, row, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' });
    }
    res.json(row[0]);
  });
});

/*post method for create product*/
router.post('/create', function (req, res, next) {
  var nome = req.body.nome;

  var sql = `INSERT INTO projetos(id_projeto, nome_projeto) VALUES(NULL, '${nome}')`;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' });
    }
    res.json({ status: 'success', id: result.insertId });
  });
});

/*put method for update product*/
router.put('/update/:id', function (req, res, next) {
  var id = req.params.id;
  var nome = req.body.nome;
  console.log("id update", id);

  var sql = `UPDATE projetos SET nome_projeto="${nome}" WHERE id_projeto=${id}`;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' });
    }
    res.json({ status: 'success' });
  });
});

/*delete method for delete product*/
router.delete('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  console.log("id para ser deletado", id);
  var sql = `DELETE FROM projetos WHERE id_projeto=${id}`;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' });
    }
    res.json({ status: 'success' });
  });
});

module.exports = router;
