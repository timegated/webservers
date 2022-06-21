'use strict'
const got = require('got');

const {
  BICYCLE_SERVICE_PORT = 4000,
  BRAND_SERVICE_PORT = 5000,
} = process.env;

console.log({ BICYCLE_SERVICE_PORT });

const bicycleSrv = `http://localhost:${BICYCLE_SERVICE_PORT}`;
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`;

console.log({ bicycleSrv });
console.log({ brandSrv });

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params;
    // Requests in serial
    const bicycle = await got(`${bicycleSrv}/${id}`).json();
    const brand = await got(`${brandSrv}/${id}`).json();
    return {
      id: bicycle.id, // XSS protection, taken from the bicycle object instead of the request
      color: bicycle.color,
      name: brand.name
    };
  });

  fastify.get('/brand/:id', async function (request, reply) {
    const { id } = request.params;
    const brand = await got(`${brandSrv}/${id}`).json();

    return brand;
  });
}
