const http = require('http');
const url = require('url');
const name = ['Cannondale', 'Gary', 'Trek', 'Bianchi']

const MISSING = 2;


const server = http.createServer((req, res) => {
  const  {pathname} = url.parse(req.url);
  console.log('url pathname parsed', pathname);
  let id = pathname.match(/^\/(\d+)$/);
  if (!id) {
    res.statusCode = 404;
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
    name: name[id % name.length]
  }))
})

server.listen(process.env.BRAND_PORT || 0, () => {
  console.log(process.env.BRAND_PORT);
  console.log(process.env);
  const {port} = server.address();
  console.log(`Server listening on ${port}`)
});