

module.exports = async function (fastify, opts) {
  fastify.get('/', async (request, reply) => {
    try {
      if (request.query) {
        console.log(request.query);
      }
      return 'the root';
    } catch (error) {
      throw fastify.httpErrors.badRequest();
    }
  })
}