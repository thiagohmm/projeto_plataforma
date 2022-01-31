const Websockify = require('.');

const http = require('http');
let webServer = http.createServer();
webServer.listen(6080);



async function addPath(target,prefix){
  console.log("target:  - " + target);
  console.log("prefix:  - " + prefix);
  let wsockify1 = new Websockify(
      {
          webServer,
          target: target,
          path: prefix,
      }
        );

          await wsockify1.start();


}






module.exports = addPath
