var express = require('express');
var router = express.Router();

function convert (name) {
  var parts = name.split(' ');
  var last = parts.pop();
  var first = parts.shift();
  return {first: first, last: last};
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  const name = req.query.name;

  if (!name) {
    res.status(404).send('Name not present in query.');
    return;
  }

  res.json(
    convert(name)
  );
  res.end();
});

module.exports = router;
