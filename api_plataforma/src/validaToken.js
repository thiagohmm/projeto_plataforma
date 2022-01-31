var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//Autenticação JWT

const jwt = require('jsonwebtoken');

const jwtKey = 'my_secret_key';
const jwtExpirySeconds = 600;

function verifyJWT(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, jwtKey, function (err, decoded) {
    if (err)
      return res
        .json({ auth: false, message: 'Failed to authenticate token.' });

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}


function assinaJWT(param) {
  console.log(param)
  token = jwt.sign({param: param} , jwtKey, {
     expiresIn: jwtExpirySeconds // expires in 5min
   });
  return token
}

exports.assinaJWT =assinaJWT;
exports.verifyJWT = verifyJWT;
