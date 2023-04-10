'use strict'
const http = require('http');
const url = require('url');
const colors = ['yellow', 'red', 'orange', 'green', 'blue', 'indigo'];
require('dotenv').config();

const MISSING = 2;

// created with http core module
const server = http.createServer((req, res) => {
  const  {pathname} = url.parse(req.url);
  let id = pathname.match(/^\/(\d+)$/);
  if (!id) {
    res.statusCode = 400;
    return void res.end();
  }

  id = Number(id[1]);

  if (id === MISSING) {
    res.statusCode = 404;
    return void res.end();
  }

  res.setHeader('Content-Type', 'application/json');

  res.end(JSON.stringify({
    id: id,
    color: colors[id % colors.length]
  }));
});

server.listen(process.env.BIKE_PORT || 0, () => {
  console.log(process.env);
  const {port} = server.address();
  console.log('Bicycle service listening on localhost on port: ' + port);
})
