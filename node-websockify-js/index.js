const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 6081; //porta padrão
var cors = require('cors')
let path =[]
var addPath = require('./webnovncService');

app.use(cors());
//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

//Lista todos os nodes
router.get('/novnc/nodes', (req, res) => {

res.json(path);

})

  router.post('/novnc/sendnodes', (req, res) => {
  const nome = req.body.nome;
  const porta = req.body.porta;
  const prefix = req.body.prefix;
  const ip = req.body.ip

  target  = (`${ip}:${porta}`)
  nodesPath = ("/"+nome+porta+prefix);
  //console.log("nodes path : " +  nodesPath);

  // if (path.includes(nodesPath)){
  //   console.log("ok")
  //  } else {
      addPath(target,nodesPath);
      path.push(nodesPath)
   // }


  res.json({message: nodesPath});

});


function timeoutFunc() {
  setInterval(function run() {
    if (path.length === 0) 
    { console.log("Array is empty!") }
    
      else{

      path = []
      console.log("path reiniciado")

    }
  
  }, 900000);
}

timeoutFunc()

app.listen(port);
console.log('API  novnc funcionando!');
