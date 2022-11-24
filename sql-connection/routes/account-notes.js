const express = require('express');
const pg = require('pg');



const router = express.Router();

var pgConnection = new pg.Pool({
  host: 'winhost',
  database: "account_notes",
  user: "postgres",
  password: "localhost",
});

router.get('/', async (req, res) => {
  try {
    const testQuery = await pgConnection.query('SELECT * from account_notes');
    res.json(testQuery.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;