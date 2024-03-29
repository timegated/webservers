'use strict'
const {Readable} = require('stream');

async function * upper (res) {
  console.log(res);
  for await (const chunk of res) {
    console.log(chunk);
    yield chunk.toString().toUpperCase();
  }
}

// Most sites will issue a redirect on proxy
// This approach better suited for URLS internally
module.exports = async function (fastify, opts) {
  // Useful for mapping different endpoints to an upstream service
  fastify.get('/', async function (request, reply) {
    const { url } = request.query;
    console.log(url);
    try {
      new URL(url); // Main difference when using URL constructor is protocol and origin.
    } catch (error) {
      throw fastify.httpErrors.badRequest();
    }
    return reply.from(url, {
      onResponse (request, reply, res) {
        reply.send(Readable.from(upper(res)));
      }
    }); // Promise that resolves once the upstream URL has been sent as a response to the client.
  })
}
