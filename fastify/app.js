'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')

// Exporting an async function (returns a promise);
// Everything is a plugin with fastify.
// Distinction between plugins and routes is mostly convention.
module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
  // We're passing fastify in as an argument as part of the plugin pattern or whatever it is.
  fastify.setNotFoundHandler((request, reply) => {
    if (request.method !== 'GET') {
      reply.status(405);
      return 'Method Not Allowed\n';
    }
    return 'Not Found\n';
  });
}
