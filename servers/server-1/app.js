const http = require('http');


// const server = http.createServer((req, res, error) => {
//   req.body = {
//     prop1: 'this',
//     prop2: 'r',
//     prop3: 'some',
//     prop4: 'properties'
//   }
//   if (error) {
//     res.end('Error');
//     return;
//   }
//   res.end(`Hello \n
//   ${JSON.stringify(req.url)},
//   ${JSON.stringify(req.method)},
//   ${JSON.stringify(req.headers)},
//   ${JSON.stringify(req.body)},
//   `);
// });

const html = `
  <h1>Aaron Schwarz did nothing wrong</h1>
  <body>
    <form action="POST"> 
    <label for="msg" name="message"><input name="msg" type="text" placeholder="message"></input></label>
    <button type="submit">Send</button>
    </form>
  </body>
`

const server2 = http.createServer((req, res, error) => {
  res.setHeader('Content-Type', 'text/html');
  const url = req.url;

  if (url === '/') {
    return res.end(html);
  }

  res.end();
});


// server.listen(3000);
server2.listen(3001);