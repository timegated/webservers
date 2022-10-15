var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
const debug = require('debug');
const yargs = require('yargs');
const request = require('request');

require('dotenv').config();

var app = express();

const argv = yargs
.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true,
  }
})
.help()
.alias('help', 'h')
.argv;

const address = argv.address.replace(/\s/g, "+");



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// const geometry = {
//   "bounds": {
//     "northeast": {
//       "lat": 39.9302214,
//       "lng": -75.16864199999999
//     },
//     "southwest": {
//       "lat": 39.93013120000001,
//       "lng": -75.16888639999999
//     }
//   },
//   "location": {
//     "lat": 39.9301693,
//     "lng": -75.1687429
//   },
//   "location_type": "ROOFTOP",
//   "viewport": {
//     "northeast": {
//       "lat": 39.9315252802915,
//       "lng": -75.1673453197085
//     },
//     "southwest": {
//       "lat": 39.92882731970851,
//       "lng": -75.17004328029151
//     }
//   }
// }

if (address) {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.LOCATION}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log('unable to connect to the google maps api')
    } else if (body.status === 'ZERO_RESULTS') {
      console.log('Unable to find that address');
      return;
    }
    const address = JSON.stringify(body.results[0].formatted_address, undefined, 2);
    const latitude = JSON.stringify(body.results[0].geometry.location.lat, undefined, 2);
    const longitude = JSON.stringify(body.results[0].geometry.location.lng, undefined, 2);

    console.log("Address: ", address);
    console.log("Latitude: ", latitude);
    console.log("Longitude: ", longitude);
  });
  console.log('Calling google location api');
}
 /**
  * Get port from environment and store in Express.
  */
 
 var port = normalizePort(process.env.PORT || '3000');
 app.set('port', port);
 
 /**
  * Create HTTP server.
  */
 
 var server = http.createServer(app);
 
 /**
  * Listen on provided port, on all network interfaces.
  */
 
 server.listen(port);
 server.on('error', onError);
 server.on('listening', onListening);
 
 /**
  * Normalize a port into a number, string, or false.
  */
 
 function normalizePort(val) {
   var port = parseInt(val, 10);
 
   if (isNaN(port)) {
     // named pipe
     return val;
   }
 
   if (port >= 0) {
     // port number
     return port;
   }
 
   return false;
 }
 
 /**
  * Event listener for HTTP server "error" event.
  */
 
 function onError(error) {
   if (error.syscall !== 'listen') {
     throw error;
   }
 
   var bind = typeof port === 'string'
     ? 'Pipe ' + port
     : 'Port ' + port;
 
   // handle specific listen errors with friendly messages
   switch (error.code) {
     case 'EACCES':
       console.error(bind + ' requires elevated privileges');
       process.exit(1);
       break;
     case 'EADDRINUSE':
       console.error(bind + ' is already in use');
       process.exit(1);
       break;
     default:
       throw error;
   }
 }
 
 /**
  * Event listener for HTTP server "listening" event.
  */
 
 function onListening() {
   var addr = server.address();
   var bind = typeof addr === 'string'
     ? 'pipe ' + addr
     : 'port ' + addr.port;
   debug('Listening on ' + bind);
 }
 