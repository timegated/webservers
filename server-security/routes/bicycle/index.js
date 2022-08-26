'use strict'
const { promisify } = require('util')
const { bicycle } = require('../../model')
const { uid } = bicycle
const read = promisify(bicycle.read)
const create = promisify(bicycle.create)
const update = promisify(bicycle.update)
const del = promisify(bicycle.del)

// Structuring the data
// Data can only be created when it meets the specified criteria defined by the schema
const schema = {
  type: 'object',
  required: ['data'],
  additionalProperties: false,
  properties: {
    data: {
      type: 'object',
      required: ['brand', 'color'],
      additionalProperties: false,
      properties: {
        brand: { type: 'string' },
        color: { type: 'string' },
      }
    }
  }
};

module.exports = async (fastify, opts) => {
  const { notFound } = fastify.httpErrors

  fastify.post('/', {
    schema: {
      body: schema
    }
  }, async (request, reply) => {
    console.log("schema", schema);
    const { data } = request.body
    const id = uid()
    await create(id, data);
    // console.log(await create(id, data));
    reply.code(201)
    return { id }
  })

  fastify.post('/:id/update', async (request, reply) => {
    const { id } = request.params
    const { data } = request.body
    try {
      await update(id, data)
      reply.code(204)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

  fastify.get('/:id', async (request, reply) => {
    console.log(schema);
    const { id } = request.params
    console.log(request);
    console.log(request.params);
    try {
      return await read(id)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

  fastify.put('/:id', async (request, reply) => {
    const { id } = request.params
    const { data } = request.body
    try {
      await create(id, data)
      reply.code(201)
      return {}
    } catch (err) {
      if (err.message === 'resource exists') {
        await update(id, data)
        reply.code(204)
      } else {
        throw err
      }
    }
  })

  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params
    try {
      await del(id)
      reply.code(204)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

}
