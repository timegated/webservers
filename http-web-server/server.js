'use strict'

const http = require('http');
const PORT = process.env.PORT || 3000;

const hello = `<html>
  <head>
  <style> body { background: black } h1 { color: grey }</style>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>`

const server = http.createServer((req, res) => { // called everytime this function receives a request.
  res.setHeader('Content-Type', 'text/html');
  res.end(hello);
});

server.listen(PORT);