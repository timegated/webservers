var express = require('express');
var request = require('request');
require('dotenv').config();
const router = express.Router();
/**
 * Address format: 2810+bedford,+Los+Angeles,+CA
 */
router.get('/', (req, res, next) => {
  const address = req.params.address;
  const locationData = request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.LOCATION}`,
    json: true
  }, (error, response, body) => {
      console.log(JSON.stringify(body, undefined, 2));
  });
  if (address) {
    res.send('Calling google\'s geolocation api');
    return locationData;
  }
  res.send('We want to call the geolocation api but the address is undefined');
});

module.exports = router;