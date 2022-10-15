'use strict'

// This is a route defined in a subfolder
// --> therefore renders whatever is in the index.js file.
// Fastify plugins only called at initialization time
// Each route has an index.js file that exports an async function
module.exports = async function (fastify, opts) {
  // this function can be sync or async meaning we 
  // have flexibility on the kinds of objects we can return Promise or otherwise.
  fastify.get('/', async function (request, reply) {
    return 'this is an example'
  })
}
