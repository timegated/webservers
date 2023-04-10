var express = require('express');
var router = express.Router();
var got = require('got');


const buildPromises = () => {
  const promises = [];
  let id = 1;
  // for(let id = 0; id <= 10; id++) {
  //   if (id === 1) {
  //     promises.push(got(`https://jsonplaceholder.typicode.com/todos/${id}`).json())
  //   } else {
  //     promises.push(got(`https://jsonplaceholder.typicode.com/todos/${id += 1}`).json())
  //   }
  // }
  while (id <= 100) {
      promises.push(got(`https://jsonplaceholder.typicode.com/todos/${id}`).json())
      id += 1;
  }
  return promises;
}

/* GET home page. */
router.get('/', async function (req, res, next) {
  const built = buildPromises();
  try {
    res.send(await Promise.allSettled(built));
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send('Bad Request');
  }
});

module.exports = router;
