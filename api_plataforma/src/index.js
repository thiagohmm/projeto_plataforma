const express = require('express');
const app = express();
const fs = require('fs')
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const port = 3001; //porta padrão
var cors = require('cors');
const Logger = require('./logger_service')
const logger = new Logger('app')

app.use(cors());

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


//definindo as rotas
const router = express.Router();

var user = require('./routes/usuarios');
app.use('/usuarios', user);

var plataforma = require('./routes/plataforma');
app.use('/plataforma', plataforma);

var node = require('./routes/nodes');
app.use('/nodes', node);

var equip = require('./routes/equipamentos');
app.use('/equip/', equip);

var projetos = require('./routes/projetos');
app.use('/projetos/', projetos);

var autenticacao = require('./routes/autenticacao');
app.use('/autenticacao/', autenticacao);




app.listen(port, () => {
  logger.info("API de dados funcionando na porta 3001")
 
;});
