var express = require('express');
var request = require('request');
require('dotenv').config();
const router = express.Router();

router.get('/', (req, res, next) => {
  const locationData = request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=2810+bedford,+Los+Angeles,+CA&key=${process.env.LOCATION}`,
    json: true
  }, (error, response, body) => {
      console.log(body);
  });
  res.send('Calling google location api');
  return locationData;
});

module.exports = router;