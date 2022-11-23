'use strict'

const fp = require('fastify-plugin');
// black list
const bannedIps = [
  '127.0.0.1'
  // any other banned ips
]
module.exports = fp(async function (fastify, opts) {
  fastify.addHook('onRequest', async function (request) {
    if (bannedIps.includes(request.ip)) { // ban myself
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }
  })
})