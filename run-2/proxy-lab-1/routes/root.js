'use strict'
// Uppercase data from upstream service

const { Readable } = require('stream');

async function* upper(res) {
  for await (const chunk of res) {
    console.log(chunk);
    yield chunk.toString().toUpperCase();
  }
}

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    // console.log(url);
    // const { url } = request.query;
    // try {
    //   new URL(url);
    // } catch (error) {
    //   throw fastify.httpErrors.badRequest();
    // }
    // if (url) {
    //   return reply.from(url, {
    //     onResponse(request, reply, res) {
    //       reply.send(res)
    //     }
    //   });
    // }
    // return reply.send('hello');
    reply.send('hello');
  })
}

