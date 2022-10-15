'use strict'
const { promisify } = require('util');
const { bicycle } = require('../../model');

const { uid } = bicycle;
const read = promisify(bicycle.read);
const create = promisify(bicycle.create);
const del = promisify(bicycle.del);
const update = promisify(bicycle.update);

// const { uid, read, create, del, update } = bicycle;

// const promUid = promisify(uid);
// const promRead = promisify(read);
// const promCreate = promisify(create);
// const promDel = promisify(del);
// const promUpdate = promisify(update);

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
// module.exports = async (fastify, opts) => {
//   const { notFound } = fastify.httpErrors;

//   fastify.get('/:id', async (request, reply) => {
//     const { id } = request.params;
//     try {
//       return await read(id);
//     } catch (error) {
//       if (error.message === 'not found') throw notFound();
//       throw error;
//     }
//   });
// }
// new methods PUT, POST, DELETE


module.exports = async (fastify, opts) => {
  const { notFound } = fastify.httpErrors;

  fastify.post('/', async (request, reply) => {
    const { data } = request.body;
    const id = uid();
    await create(id, data);
    console.log(id)
    reply.code(201); // Successful POST
    return { id };
  });

  fastify.post('/:id/update', async (request, reply) => {
    const { id } = request.params;
    const { data } = request.body;
    try {
      await update(id, data);
      reply.code(204)
    } catch (error) {
      if (error.message === 'not found') throw notFound();
      throw error;
    }
  });

  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      return await read(id);
    } catch (error) {
      if (error.message === 'not found') throw notFound();
      throw error;
    }
  });

  fastify.put('/:id', async (request, reply) => {
    const { id } = request.params;
    const { data } = request.body;
    try {
      await create(id, data);
      reply.code(201);
      return {};
    } catch (error) {
      if (error.message === 'resource exists') {
        await update(id, data);
        reply.code(204); // No content to send back (request is successful)
      } else {
        throw error;
      }
    }
  });

  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      await del(id);
      reply.code(204);
    } catch (error) {
      if (error.message === 'not found') throw notFound();
      throw error;
    }
  });
}
