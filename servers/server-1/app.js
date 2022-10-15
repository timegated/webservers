const http = require('http');
const fs = require('fs');

// const server = http.createServer((req, res, error) => {
//   req.body = {
//     prop1: 'this',
//     prop2: 'r',
//     prop3: 'some',
//     prop4: 'properties'
//   }
//   if (error) {
//     res.end('Error');
//     ;
//   }
//   res.end(`Hello \n
//   ${JSON.stringify(req.url)},
//   ${JSON.stringify(req.method)},
//   ${JSON.stringify(req.headers)},
//   ${JSON.stringify(req.body)},
//   `);
// });

const html = `
<html>
  <h1>Aaron Schwarz did nothing wrong</h1>
  <body>
    <form action="/message" method="POST"> 
    <label for="msg" name="message"><textarea width="250" height="250" name="msg" type="text" placeholder="message"></textarea></label>
    <button type="submit">Send</button>
    </form>
  </body>
  </html>
`
function logger(req) {
  const body = [];
  req.on('data', (chunk) => {
    console.log(chunk);
    body.push(chunk);
  });
  req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString();
    const message = parsedBody.split('=')[1];
    fs.writeFileSync('messageLog.txt', message.replace(/\+|%/g, " "));
  });
}

const server2 = http.createServer((req, res, error) => {
  res.setHeader('Content-Type', 'text/html');
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    return res.end(html);
  }

  // This is alot for parsing a simple txt message, but the underlying logic here
  // remains the same between libraries that abstract this away.
  if (url === '/message' && method === 'POST') {
  logger(req);
  res.statusCode = 302;
  res.setHeader('Location', '/');
  return res.end();
}

  res.end();
});


// server.listen(3000);
server2.listen(3001);