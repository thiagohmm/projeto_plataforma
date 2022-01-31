var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

router.use(bodyParser.json()); // for parsing application/json
//router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

/* get method for fetch all products. */
router.get('/', function (req, res, next) {
  var sql = 'SELECT * FROM user';
  db.query(sql, function (err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' });
    }
    res.json(rows);
  });
});

/*get method for fetch single product*/
router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  var sql = `SELECT * FROM user WHERE id_user=${id}`;
  db.query(sql, function (err, row, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' });
    }
    res.json(row[0]);
    var obj = JSON.parse(res.json(row[0]));
    console.log(obj);
  });
});

/*post method for create product*/
router.post('/create', function (req, res, next) {
  var usuario = req.body.usuario;
  var passwd = req.body.passwd;
  let hash = bcrypt.hashSync(passwd, 10);

  console.log(usuario, passwd, hash);

  var sql = `INSERT INTO user(id_user, passwd_user, user_user) VALUES(NULL, '${hash}','${usuario}')`;
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
  var usuario = req.body.usuario;
  var passwd = req.body.passwd;
  let hash = bcrypt.hashSync(passwd, 10);

  var sql = `UPDATE user SET passwd_user="${hash}", user_user="${usuario}" WHERE id_user=${id}`;
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
  var sql = `DELETE FROM user WHERE id_user=${id}`;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' });
    }
    res.json({ status: 'success' });
  });
});

//authentication
router.post('/login', (req, res, next) => {
  var usuario = req.body.usuario;
  var passwd = req.body.passwd;
  let hash = bcrypt.hashSync(passwd, 10);

  var sql = `SELECT * FROM user WHERE user_user=${usuario}`;
  db.query(sql, function (err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' });
    }
    res.json(row);
    console.log(row);
  });

  if (req.body.user === 'luiz' && req.body.pwd === '123') {
    //auth ok
    const id = 1; //esse id viria do banco de dados
    var token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300, // expires in 5min
    });
    res.status(200).send({ auth: true, token: token });
  }

  res.status(500).send('Login inválido!');
});

router.get('/logout', function (req, res) {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;
