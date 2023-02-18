var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pgress = require('pg');

require('dotenv').config();

// services

const ItemService = require('../services/itemservice');
const PgService = require('../services/pgService');

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

var connection = mysql.createConnection({
  host: 'winhost',
  user: 'root2',
  password: process.env.password1,
  database: 'wow_test_db',
  port: 3306,
});

var pgConnection = new pgress.Pool({
  host: 'winhost',
  database: "account_notes",
  user: "postgres",
  password: "localhost",
});

const itemService = new ItemService();
const pgService = new PgService();
/**
 * GET: Fetch items by name.
 */
router.get('/', async function (req, res, next) {
  try {
    const name = req.query.name;
    if (!name) {
      connection.query(`SELECT item_id, name, class, display_id FROM items`, (err, results) => {
        if (err) throw err;
        res.json(results);
      })
    } else {
      connection.query(`SELECT item_id, name, class, display_id FROM items WHERE name = "${name}"`, (error, results, fields) => {
        if (error) throw error;
        console.log(results[0]);
        res.json(results[0]);
      });
    }
    // const result = await itemService.getItemByName(name)
    // console.log('RESULT FROM ROUTE: ', result);
    // res.status(200).send(JSON.stringify(result, getCircularReplacer()));
  } catch (error) {
    throw new Error(error, 'name field cannot be empty');
  }
});


router.get('/pg', async (req, res) => {
  try {
    const testQuery = await pgConnection.query('SELECT * from account_notes');
    res.json(testQuery.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
