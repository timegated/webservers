'use strict'

const {promisify} = require('util');
const { randomBytes } = require('crypto');
const timeout = promisify(setTimeout);

async function data () {
  await timeout(50);
  console.log(randomBytes(10).toString('base64'));
  return randomBytes(10).toString('base64');
};


module.exports = data;
