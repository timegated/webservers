var express = require('express');
var router = express.Router();

function convert (name) {
  const parts = name.split(' ');
  const last = parts.pop();
  const first = parts.shift();
  return  {first, last};
}

// Request, Response, Next for any callback functionality.
router.get('/', (req, res, next) => {
  if (Array.isArray(req.query.name)) {
    res.send(req.query.name.map(convert));
  } else {
    res.send(convert(req.query.name));
  }
});

module.exports = router;