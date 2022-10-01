
const request = require('request');
request({
  url: 'https://jsonplaceholder.typicode.com/todos/1',
  json: true
}, (err, response, body) => {
  if (err) {
    console.log(err);
  }
  console.log(body)
})