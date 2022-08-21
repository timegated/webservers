'use strict'

const someAsynchronousOperation = async (req, res, next) => {
  if (!req.query.name) {
    const err = new Error('Bad Request');
    err.status = 400;
    return err;
  }
}

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    someAsynchronousOperation(request);
    const parts = request.query.name.split();
    const last = parts.pop();
    const first = parts.shift();
    return { first, last };
  })
}
