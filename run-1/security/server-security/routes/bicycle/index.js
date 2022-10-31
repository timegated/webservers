'use strict'
const { promisify } = require('util');
const { bicycle } = require('../../model');
const { uid } = bicycle;
const read = promisify(bicycle.read);
const create = promisify(bicycle.create);
const update = promisify(bicycle.update);
const del = promisify(bicycle.del);

function convert (name) { // we use this here to parse out an array if it's passed in as part of the query
  var parts = name.split(' ');
  var last = parts.pop();
  var first = parts.shift();
  return {first: first, last: last};
}


module.exports = async (fastify, opts) => {
  // Structuring the data
  // Data can only be created when it meets the specified criteria defined by the schema
  const dataSchema = {
    type: 'object', // type
    required: ['brand', 'color'], // required properties
    additionalProperties: false, // extended properties option
    properties: { // specific properties themselves
      brand: { type: 'string' }, 
      color: { type: 'string' },
    }
  };

  const bodySchema = {
    type: 'object',
    required: ['data'],
    additionalProperties: false,
    properties: {
      data: dataSchema
    }
  };

  const paramsSchema = {
    id: {
      type: 'integer',
    }
  };

  const { notFound } = fastify.httpErrors

  fastify.post('/', {
    schema: {
      body: bodySchema
    }
  }, async (request, reply) => {
    console.log("schema", schema);
    const { data } = request.body;
    const id = uid()
    await create(id, data);
    // console.log(await create(id, data));
    reply.code(201);
    return { id };
  })

  fastify.post('/:id/update', {
    schema: { // takes in schema property as an object and defines rules for body (any data on the request) and parameters (url)
      body: bodySchema,
      params: paramsSchema,
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const { data } = request.body;
    try {
      await update(id, data);
      reply.code(204)
    } catch (err) {
      if (err.message === 'not found') throw notFound();
      throw err;
    }
  })

  fastify.get('/:id', { // we can define the schema as opts here and pass it in
    schema: {
      params: paramsSchema,
      response: {
        200: dataSchema,
      }
    }
  }, async (request, reply) => {
    console.log(schema);
    const { id } = request.params;
    console.log(request);
    console.log(request.params);
    try {
      return await read(id)
    } catch (err) {
      if (err.message === 'not found') throw notFound();
      throw err;
    }
  })

  fastify.put('/:id', {
    schema: {
      params: paramsSchema,
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const { data } = request.body;
    try {
      await create(id, data);
      reply.code(201);
      return {};
    } catch (err) {
      if (err.message === 'resource exists') {
        await update(id, data);
        reply.code(204);
      } else {
        throw err;
      }
    }
  })

  fastify.delete('/:id', {
    schema: {
      params: paramsSchema,
    }
  }, async (request, reply) => {
    const { id } = request.params;
    try {
      await del(id);
      reply.code(204);
    } catch (err) {
      if (err.message === 'not found') throw notFound();
      throw err;
    }
  })

}
