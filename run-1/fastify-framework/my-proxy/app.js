'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const proxy = require('@fastify/http-proxy');
const sensible = require('@fastify/sensible')

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(sensible)
  fastify.register(proxy, { // Registering a callback here that fires whenever localhost:3001/ is hit
    upstream: 'https://news.ycombinator.com',
    async preHandler(request, reply) {
      if (request.query.token !== 'abc') {
        throw fastify.httpErrors.unauthorized()
      }
    }
  })
}
