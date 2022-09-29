var express = require('express');
var request = require('request');

require('dotenv').config();

const router = express.Router();


/**
 * Address format: 2810+bedford,+Los+Angeles,+CA
 */
router.get('/', (req, res, next) => {
  const address = req.query.address;
  console.log(JSON.stringify(req.query));
  console.log(address);
  if (address) {
    const locationData = request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.LOCATION}`,
      json: true
    }, (error, response, body) => {
      console.log('error:', error);
      console.log('statusCode: ', response && response.statusCode);
      console.log("body: ", JSON.stringify(body, undefined, 2));
    });
    res.send('Calling google location api');
    return locationData;
  }
  res.send('Please provide an address');
});

module.exports = router;