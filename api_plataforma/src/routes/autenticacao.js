var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
const {assinaJWT, verifyJWT }= require('../validaToken');
//var assinaJWT = require('../validaToken');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//Autenticação JWT

// const jwt = require('jsonwebtoken');
//
// const jwtKey = 'my_secret_key';
// const jwtExpirySeconds = 3000;
//
// var token = '';

//authentication
router.post('/login', (req, res, next) => {
  //Autenticação JWT

  var usuario = req.body.usuario;
  var passwd = req.body.passwd;
  var userBanco = '';
  var passwdBanco = '';
  var idBanco = '';

  var sql = `SELECT * FROM user WHERE user_user="${usuario}"`;

  db.query(sql, function (err, row, fields) {
    if (err) {
      res.status(500).send({ error: err });
    }
    var resultArray = Object.values(JSON.parse(JSON.stringify(row)));

    resultArray.forEach(function (v) {
      //console.log(v.passwd_user);
      idBanco = v.id_user;
      passwdBanco = v.passwd_user;
      userBanco = v.user_user;

      if (usuario === userBanco && bcrypt.compareSync(passwd, passwdBanco)) {
        //auth ok

        // token = jwt.sign({ idBanco }, jwtKey, {
        //   expiresIn: 3000, // expires in 5min
        // });
        token = assinaJWT(idBanco)

        return res.json({token: token });
      } else {
        res.status(500).json({ message: 'Login inválido!' });
      }
    });
  });
});

router.post('/logout', function (req, res) {
  res.json({ auth: false, token: null });
});

/* get method for fetch all products. */
router.get('/', verifyJWT, function (req, res, next) {
  var sql = 'SELECT * FROM user';
  db.query(sql, function (err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' });
    }
    //res.json(rows);
    res.status(200).send({auth: true})
  });
});

module.exports = router;
