var express = require('express');
var router = express.Router();


router.get('/', (req, res, next) => {
  if (err) {
    throw new Error('something went wrong');
  }
  res.send({msg: 'this route is ready to go'});
});

module.exports = router;