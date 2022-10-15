'use strict'

module.exports = async(fastify, opts) => {
  fastify.get('/', async (request, reply) => {
    // return reply.sendFile('hello.html'); not sending a file anymore
    const { greeting = 'Hello' } = request.query; // Default destructuring
    return reply.view(`hello.hbs`, { greeting }) // Second arg sets vals of template locals
  });
}
