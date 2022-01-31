var express = require('express');
var router = express.Router();
const fs = require('fs')
const {promisify} = require("es6-promisify");
var db = require('../db');
var bodyParser = require('body-parser');

const Logger = require('../logger_service')
const logger = new Logger('app')



router.use(bodyParser.json()); // for parsing application/json
//router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

/* get method for fetch all products. */
router.get('/', function (req, res, next) {
  try{
  var sql = 'SELECT * FROM equipamentos';
  db.query(sql, function (err, rows, fields) {
    res.json(rows);
    logger.info(`GET /equip - ${JSON.stringify(rows)}`);
  });
  }catch (err) {
    res.status(400).send({ error: err.message });



}
});

/*get method for fetch single product*/
router.get('/:id', function (req, res, next) {
  try{
  var id = req.params.id;
  var sql = `SELECT * FROM equipamentos WHERE id_equip=${id}`;
  db.query(sql, function (err, row, fields) {

    res.json(row[0]);
    logger.info(`GET /equip/${id} - ${JSON.stringify(row)}`);
  });
}catch (err) {
  res.status(400).send({ error: err.message });
}
});

router.get('/plataforma/:equip_plat_id', function (req, res, next) {
  try{
  var equip_plat_id = req.params.equip_plat_id;
  console.log(equip_plat_id)
  var sql = `SELECT * FROM equipamentos WHERE equip_plat_id=${equip_plat_id}`;
  db.query(sql, function (err, row, fields) {

    res.json(row);
    logger.info(`GET /equip/${equip_plat_id} - ${JSON.stringify(row)}`);

  });
}
catch (err) {
  res.status(400).send({ error: err.message });
}
});

/*post method for create product*/
router.post('/create', function (req, res, next) {
  try{
  var nome = req.body.nome;
  var tipo = req.body.tipo;
  var local = req.body.local;
  var inf = req.body.inf;
  var equip_plat_id = req.body.equip_plat_id;

  var sql = `INSERT INTO equipamentos(id_equip, nome_equip, tipo_equip, local_equip, inf_equip, equip_plat_id)
  VALUES(NULL, '${nome}','${tipo}', '${local}','${inf}','${equip_plat_id}')`;
  db.query(sql, function (err, result) {

    res.json({ status: 'success', id: result.insertId });
    logger.info(`POST /equip/create - ${JSON.stringify({ status: 'success', id: result.insertId })}`);
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
  var tipo = req.body.tipo;
  var local = req.body.local;
  var inf = req.body.inf;
  var equip_plat_id = req.body.equip_plat_id;

  var sql = `UPDATE equipamentos SET nome_equip="${nome}", tipo_equip="${tipo}", local_equip="${local}",
  inf_equip="${inf}", equip_plat_id="${equip_plat_id}" WHERE id_equip="${id}"`;

  db.query(sql, function (err, result) {

    res.json({ status: 'success' });
    logger.info(`PUT /update/${id} - ${JSON.stringify({ status: 'success' })}`);
  });
}catch (err) {
  res.status(400).send({ error: err.message });
}

});

/*delete method for delete product*/
router.delete('/delete/:id', function (req, res, next) {
  try{
  var id = req.params.id;
  var sql = `DELETE FROM equipamentos WHERE id_equip=${id}`;
  db.query(sql, function (err, result) {

    res.json({ status: 'success' });
    logger.info(`DELETE /delete/${id} - ${JSON.stringify({ status: 'success' })}`);
  });
}catch (err) {
  res.status(400).send({ error: err.message });
}
});

module.exports = router;
