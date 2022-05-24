'use strict'

const root = `<html>
<head>
  <style>
   body { background: #333; margin: 1.25rem }
   a { color: yellow; font-size: 2rem; font-family: sans-serif }
  </style>
</head>
<body>
  <a href='/hello'>Hello</a>
</body>
</html>
`

// Fastify plugins only called at initialization time
module.exports = async function (fastify, opts) {
  // All HTTP methods can be called here: .post(), .put(), .patch()
  fastify.get('/', async function (request, reply) {
    // Can accept a sync || async function --> auto sent as content of HTTP res
    reply.type('text/html');
    return root;
  })
}
