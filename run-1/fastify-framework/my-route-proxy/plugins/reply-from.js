'use strict'

const fp = require('fastify-plugin');

module.exports = fp(async (fastify, opts) => {
  fastify.register(require('fastify-reply-from'), {
    errorHandler: false,
  });
});
