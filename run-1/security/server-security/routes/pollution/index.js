'use strict'
// Parameters pollution is a vulnerability that appears when we fail to handle
// query string inputs from a user. Both String and Array can be passed into query params
// and if we don't handle both cases we could send our services/API into an infite loop.
// Why it's important to handle errors.
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
