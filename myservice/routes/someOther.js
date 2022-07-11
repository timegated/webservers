'use strict'
// Context dependent solution depending on what needs to be done.
// I.E. which parts of the name are we using? How do we handle family names? etc.
const convert = (name) => {
  const parts = name.split(' ');
  const last = parts.pop();
  const first = parts.shift();
  return { first, last };
};



module.exports = async function (fastify, opts) {
  fastify.get('/someOther', async function (request, reply) {
    try {
      console.log('request: ', request.query);
      if (!request.query.name) {
        let err = new Error('Bad Request');
        err.status = 400;
        throw new Error(err);
      }
      convert(request.query.name);
      console.log(convert(request.query.name));
      // probably add a regex here for sanitization purposes
      return { root: true };
    } catch (error) {
      console.error(error);
    }
  })
}
