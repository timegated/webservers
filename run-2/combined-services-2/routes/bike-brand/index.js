'use strict'
const got = require('got');
require('dotenv').config();

const {
  BIKE_PORT, BRAND_PORT
} = process.env;

const bikeSrv = `http://localhost:${BIKE_PORT}`;
const brandSrv = `http://localhost:${BRAND_PORT}`;
module.exports = async function (fastify, opts) {
  const { httpErrors } = fastify;
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params;
    try {
      const [bike, brand] = await Promise.all([
        got(`${bikeSrv}/${id}`).json(),
        got(`${brandSrv}/${id}`).json(),
      ]);

      return {
        id: bike.id,
        color: bike.color,
        brand: brand.name
      }
    } catch (error) {
      if (!error.response) throw error;
      if (error.response.statusCode === 404) {
        throw httpErrors.notFound();
      }
      if (error.response.statusCode === 400) {
        throw httpErrors.badRequest();
      }
      throw error;
    }
  })
}