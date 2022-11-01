const express = require('express');
const model = require('../models');

const router = express.Router();

router.get('/:id', (req, res, next) => {

  model.bicycle.read(req.params.id, (err, result) => {
    if (err) {
      if (err.message === "not found") next(err)
      else next();
    }
    res.send(result);
  });
})

router.post('/', (req, res, next) => {
  const id = model.bicycle.uid();
  const { data } = req.body;
  return model.bicycle.create(id, data, (err, result) => {
    if (err) {
      if (err.message === 'resource exists') next(err)
      else next();
    }
    res.status(201).send(result);
  })
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const { data } = req.body;
  return model.bicycle.update(id, data, (err, result) => {
    if (err) {
      if (err.message === 'not found') next(err)
      else next();
    }
    console.log(result);
    res.status(204).send(result);
  });
})

router.delete('/:id', (req, res, next) => {
  return model.bicycle.del(req.params.id, (err, result) => {
    if (err) {
      if (err.message === 'not found') next(err)
      else next();
    }
    res.status(200).send('resource deleted with id: ' + req.params.id);
  });
})

module.exports = router;