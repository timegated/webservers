const http = require('http');
const url = require('url');
const colors = ['yellow', 'red', 'orange', 'green', 'blue', 'indigo']

const MISSING = 3;

const BIKE_PORT = process.env.BIKE_PORT;

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
    color: colors[id % colors.length]
  }))
})

server.listen(process.env.BIKE_PORT || 0, () => {
  const {port} = server.address();
  console.log(server.address());
  console.log(`Bike service listening on port: ${port}`)
});