var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.query);
  var greeting = 'greeting' in req.query ?
    req.query.greeting :
    'Hello';
  res.render('me', { greeting: greeting });
});

module.exports = router;