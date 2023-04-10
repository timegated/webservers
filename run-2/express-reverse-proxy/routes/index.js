var express = require('express');
var router = express.Router();
var got = require('got');



/* GET home page. */
router.get('/', async function(req, res, next) {
  while(true) {
    // call some third party service here
    const gotData = await got('https://jsonplaceholder.typicode.com/todos/1');
    return res.status(200).send(gotData);
  }
});

module.exports = router;
