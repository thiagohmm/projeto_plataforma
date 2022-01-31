var express = require('express');
var router = express.Router();
const fs = require('fs')
const {promisify} = require("es6-promisify");
var db = require('../db');
var bodyParser = require('body-parser');
const Logger = require('../logger_service')
const logger = new Logger('app')

router.use(bodyParser.json())

/* get method for fetch all products. */
router.get('/', function (req, res, next) {
  try{
  var sql = 'SELECT * FROM node';
  db.query(sql, function (err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' });
    }
    res.json(rows);
    logger.info(`GET /nodes - ${JSON.stringify(rows)}`);
  });
}catch (err) {
  res.status(400).send({ error: err.message });

}

});

/*get method for fetch single product*/
router.get('/:id', function (req, res, next) {
  try{
  var id = req.params.id;
  var sql = `SELECT * FROM node WHERE id_node=${id}`;
  db.query(sql, function (err, row, fields) {

    res.json(row[0]);
    logger.info(`GET /nodes/${id} - ${JSON.stringify(row)}`);
  });
}catch (err) {
  res.status(400).send({ error: err.message });
  logger.error(`GET /nodes/${id} - error: ${err.message}`);

}
});


router.get('/plataforma/:host_plat_id', function (req, res, next) {
  try{
  var host_plat_id = req.params.host_plat_id;
  console.log(host_plat_id)
  var sql = `SELECT * FROM node WHERE host_plat_id=${host_plat_id}`;
  db.query(sql, function (err, row, fields) {

    res.json(row);
    logger.info(`GET /nodes/plataforma/${host_plat_id} - ${JSON.stringify(row)}`);
  });
}catch (err) {
  res.status(400).send({ error: err.message });

}
});

/*post method for create product*/
router.post('/create', function (req, res, next) {
  try{
  var nome = req.body.nome;
  var ssh = req.body.ssh;
  var vnc = req.body.vnc;
  var router = req.body.router;
  var host_plat_id = req.body.host_plat_id;

  var sql = `INSERT INTO node(id_node, nome_node, ssh_node, vnc_node, router_node, host_plat_id)
  VALUES(NULL, '${nome}','${ssh}', '${vnc}','${router}','${host_plat_id}')`;
  db.query(sql, function (err, result) {

    res.json({ status: 'success', id: result.insertId });
    logger.info(`POST /nodes/create/ - ${JSON.stringify({ status: 'success', id: result.insertId })}`);
  });

}catch (err) {
  res.status(400).send({ error: err.message });

}
});

/*put method for update product*/
router.put('/update/:id', function (req, res, next) {
  try{
  var id = req.params.id;
  var nome = req.body.nome;
  var ssh = req.body.ssh;
  var vnc = req.body.vnc;
  var router = req.body.router;
  var host_plat_id = req.body.host_plat_id;

  var sql = `UPDATE node SET nome_node="${nome}", ssh_node="${ssh}", vnc_node="${vnc}", router_node="${router}",
 host_plat_id="${host_plat_id}" WHERE id_node="${id}"`;
  db.query(sql, function (err, result) {

    res.json({ status: 'success' });
    logger.info(`PUT /nodes/create/ - ${JSON.stringify({ status: 'success' })}`);
  });
}catch (err) {
  res.status(400).send({ error: err.message });

}
});

/*delete method for delete product*/
router.delete('/delete/:id', function (req, res, next) {
  try{
  var id = req.params.id;
  var sql = `DELETE FROM node WHERE id_node=${id}`;
  db.query(sql, function (err, result) {

    res.json({ status: 'success' });
    logger.info(`DELETE /nodes/create/ - ${JSON.stringify({ status: 'success' })}`);
  });
}catch (err) {
  res.status(400).send({ error: err.message });

}
});

module.exports = router;
