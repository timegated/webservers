'use strict'
const { Router } = require('express')
const data = require('../data');
const router = Router()


router.get('/', async (req, res) => {
  try {
    const stringed = await data();

    res.send(JSON.stringify(stringed));
  } catch (error) {
    throw new Error('Something went wrong with the data');
  }
})

module.exports = router