'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')

const pointOfView = require('point-of-view');
const handlebars = require('handlebars');

const dev = process.env.NODE_ENV !== 'production'

const fastifyStatic = dev && require('fastify-static')

module.exports = async function (fastify, opts) {
  // With this server performs on the fly dynamic rendering
  fastify.register(pointOfView, {
    engine: { handlebars },
    root: path.join(__dirname, 'views'),
    layout: 'layout.hbs',
  });

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
