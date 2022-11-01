'use strict'
const got = require('got');
const fs = require('fs');
const Logger = require('../utils/logger');

const bicycleSrv = `http://localhost:${process.env.BIKE_PORT}`;
const brandSrv = `http://localhost:${process.env.BRAND_PORT}`;

const logger = new Logger();
console.log('instantiated logger: ', logger);


module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const { httpErrors } = fastify;
    try {
      const { id } = request.params;

      const [bicycle, brand] = await Promise.all([
        await got(`${bicycleSrv}/${id}`).json(),
        await got(`${brandSrv}/${id}`).json()
      ]);

      if (reply.statusCode === 200) {
        console.log(reply.statusCode);
      }

      return {
        id: bicycle.id,
        color: bicycle.color,
        brand: brand.name
      };
    } catch (error) {
      console.log(error.response.statusCode);
      if (!error.response) {
        throw error;
      };
      if (error.response.statusCode === 404) {
        throw httpErrors.notFound();
      }
      throw error;
    }
  });
}
