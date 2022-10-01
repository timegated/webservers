const fs = require('fs');
const os = require('os');

const user = os.userInfo();


console.log('lol user info: ', user);

fs.appendFile(
  'greetings.txt',
  `Hey there ${user.username}`,
  (err) => {
    if (err) {
      console.log('Unable to write file');
    }
  }
)


const jsFileContent = `
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
`;

fs.appendFileSync('someJs.js', jsFileContent);

console.log('App is running');
