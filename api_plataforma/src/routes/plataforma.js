var express = require('express');
var router = express.Router();
const fs = require('fs')
const {promisify} = require("es6-promisify");
var db = require('../db');
var bodyParser = require('body-parser');
const Logger = require('../logger_service')
const logger = new Logger('app')

router.use(bodyParser.json()); // for parsing application/json


/* get method for fetch all products. */
router.get('/', function (req, res, next) {
  var sql = 'SELECT * FROM plataforma';
  db.query(sql, function (err, rows, fields) {
    logger.info(`GET /plataforma - ${JSON.stringify(rows)}`)
    if (err) {
      res.status(500).send({ error: 'Something failed!' });
    }
    res.json(rows);
    logger.info(`GET /plataforma - ${JSON.stringify(rows)}`);
  });
});




/*get method for fetch single product*/
router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  var sql = `SELECT * FROM plataforma WHERE id=${id}`;
  db.query(sql, function (err, row, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' });
    }
    res.json(row[0]);
    logger.info(`GET /plataforma/${id} - ${JSON.stringify(row)}`);
  });
});


router.get('/api/busca', async(req, res)=> {
  var search = req.query.search;
  console.log(req.query)
  var sql =  `SELECT id, nome_plataforma from plataforma where (inf_plataforma like '%${search}%' or nome_plataforma like '%${search}%') and active_plataforma=1`;
   await db.query(sql, function (err, row, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' });
    }
    res.json(row);
    logger.info(`GET /plataforma/busca/${search} - ${JSON.stringify(row)}`);
  });
  
});


router.get('/projeto/:projt_id', function (req, res, next) {
  var projt_id = req.params.projt_id;
  console.log("lista plataforma por projeto" , projt_id)
  var sql = `SELECT * FROM plataforma WHERE host_projt_id=${projt_id} and active_plataforma=1`;
  db.query(sql, function (err, row, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' });
    }
    res.json(row);
    logger.info(`GET /plataforma/projeto/${projt_id} - ${JSON.stringify(row)}`);
  });
});


router.get('/projetoall/:projt_id', function (req, res, next) {
  var projt_id = req.params.projt_id;
  console.log("lista plataforma por projeto" , projt_id)
  var sql = `SELECT * FROM plataforma WHERE host_projt_id=${projt_id}`;
  db.query(sql, function (err, row, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' });
    }
    res.json(row);
    logger.info(`GET /plataforma/projetoall/${projt_id} - ${JSON.stringify(row)}`);
  });
});



/*post method for create product*/
router.post('/create', function (req, res, next) {
  var nome = req.body.nome_plataforma;
  var alias = req.body.alias;
  var active_plataforma = req.body.active_plataforma;
  var inf_plataforma = req.body.inf_plataforma;
  var host_projt_id = req.body.host_projt_id;
  console.log(`${nome}, ${alias} , ${active_plataforma}, ${inf_plataforma}, ${host_projt_id}`)


  var sql = `INSERT INTO plataforma(id, nome_plataforma, alias_plataforma, active_plataforma, inf_plataforma, host_projt_id)
  VALUES(NULL, '${nome}','${alias}', '${active_plataforma}', '${inf_plataforma}','${host_projt_id}')`;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' });
    }
    res.json({ status: 'success', id: result.insertId });
    logger.info(`POST /plataforma/create/ - ${JSON.stringify({ status: 'success', id: result.insertId })}`);
  });
});

/*put method for update product*/
router.put('/update/:id', function (req, res, next) {
  var id = req.params.id;
  var nome = req.body.nome_plataforma;
  var alias = req.body.alias;
  var active_plataforma = req.body.active_plataforma;
    var inf_plataforma = req.body.inf_plataforma;
  var host_projt_id = req.body.host_projt_id;
  console.log(`Atualização id=${id} nome=${nome}, alias=${alias} , active_plataforma=${active_plataforma}, projt_id=${host_projt_id}`)

  var sql = `UPDATE plataforma SET nome_plataforma="${nome}", alias_plataforma="${alias}", active_plataforma="${active_plataforma}", inf_plataforma="${inf_plataforma}", host_projt_id="${host_projt_id}" WHERE id=${id}`;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: err });
    }
    res.json({ status: 'success' });
    logger.info(`PUT /plataforma/update/${id} - ${JSON.stringify({ status: 'success' })}`);
  });
});

/*delete method for delete product*/
router.delete('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  var sql = `DELETE FROM plataforma WHERE id=${id}`;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' });
    }
    res.json({ status: 'success' });
    logger.info(`DELETE /plataforma/${id} - ${JSON.stringify({ status: 'success' })}`);
  });
});

module.exports = router;
