require("babel-register");
let express = require('express');
let cors = require('cors')
let config = require('./config/config');
let env = require('node-env-file');
let helpers = require('./app/helpers/helpers');
let bodyParser = require('body-parser');
env(__dirname + '/.env');
let app = express();
app.use(cors({
  credentials: true,
  origin: true
}));
const bodyParserJsonMiddleware = function () {
  return function (req, res, next) {
    if (helpers.isMultipartRequest(req)) {
      return next();
    }
    return bodyParser.json()(req, res, next);
  };
};
app.use(bodyParserJsonMiddleware());
app.all('*', (req, res, next) => {
  let origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

module.exports = require('./config/express')(app, config);
app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});
