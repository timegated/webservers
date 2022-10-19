'use strict'
const http = require('http');
const url = require('url');
const brands = ['Gazelle', 'Batavus', 'Azor', 'Cortina', 'Giant','Sparta'];


const MISSING = 3;

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
    color: brands[id % brands.length]
  }));
});

server.listen(process.env.BRAND_PORT || 0, () => {
  const {port} = server.address();
  console.log('Brand service listening on localhost on port: ' + port);
})
