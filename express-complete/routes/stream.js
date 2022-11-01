const express = require('express');
const { Readable, Transform, finished } = require('stream')

const router = express.Router();

function stream() {
  const readable = Readable.from([
    'this', 'is', 'a', 'stream', 'of', 'data'
  ].map((s) => s + '<br>'))
  const delay = new Transform(({
    transform(chunk, enc, cb) {
      setTimeout(cb, 500, null, chunk)
    }
  }))
  return readable.pipe(delay)
}

router.get('/', async (req, res, next) => {
  try {
    const streem = stream();
    streem.pipe(res, {end:false});
    finished(streem, err => { // native function that handles all cases of the stream
      if (err) {
        next(err);
        return
      }
      res.end();
    })
  } catch (error) {
    console.error(error);
    res.status(400).send('Bad Request');
  }
})


module.exports = router;