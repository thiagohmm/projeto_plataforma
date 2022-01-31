const  createProxyMiddleware  = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/projetos', 
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );


  app.use(
    '/plataforma', 
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );


  app.use(
    '/nodes', 
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  ); 


  app.use(
    '/equip', 
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  ); 


  app.use(
    '/autenticacao', 
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  ); 

  app.use(
    '/usuarios', 
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );
  
  app.use(
    '/novnc', 
    createProxyMiddleware({
      target: 'http://localhost:6081',
      changeOrigin: true,
    })
  );


  
  app.use(
    '/ssh', 
    createProxyMiddleware({
      target: 'http://localhost:2222',
      changeOrigin: true,
    })
  );


};