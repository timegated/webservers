'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const { url } = request.query;
    try {
      new URL(url); // Main difference when using URL constructor is protocol and origin.
    } catch (error) {
      throw fastify.httpErrors.badRequest();
    }
    return reply.from(url);
  })
}
