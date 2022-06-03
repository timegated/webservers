'use strict'
const { promisify } = require('util');
const { bicycle } = require('../../model');
const read = promisify(bicycle.read);

/**
 * Restful GET Criterion:
 * Respond with valid JSON payload
 * Respond w/ application/json Content-Type header
 * Response with 200 code when successful
 * Respond with 404 when resource is not available
 * 400, 404, 405 for unsupported methods. POST would respond with one of these codes
 * 500 for unknown errors (Internal Server Error)
 * 
 * @param {*} fastify 
 * @param {*} opts 
 */
// module.exports = async function (fastify, opts) {
//   fastify.get('/:id', async function (request, reply) {
//     const {id} = request.params;
//     console.log(reply)
//     bicycle.read(id, (err, result) => {
//       if (err) {
//         if (err.message === 'not found') reply.notFound();
//         else reply.send(err);
//       } else reply.send(result);
//     });
//     await reply;
//   })
// }

// Syntactic sugariness for above.
// Arguably more "readable"
module.exports = async (fastify, opts) => {
  const { notFound } = fastify.httpErrors;

  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      return await read(id);
    } catch (error) {
      if (error.message === 'not found') throw notFound();
      throw error;
    }
  });
}