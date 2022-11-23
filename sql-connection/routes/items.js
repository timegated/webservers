var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pgress = require('pg');

require('dotenv').config();

// services

const ItemService = require('../services/itemservice');
const PgService = require('../services/pgService');

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
  user: "localhost",
  password: "localhost",
});

const itemService = new ItemService();
const pgService = new PgService();
/**
 * GET: Fetch items by name.
 */
router.get('/', async function (req, res, next) {
  try {
    // connection.query(`SELECT item_id, name, class, display_id FROM items WHERE name = "${req.query.name}"`, (error, results, fields) => {
    //   if (error) throw error;
    //   res.json(results[0]);
    // });
     return await itemService.getItemByName(req.query.name).then((data) => {
      console.log('data', data);
      res.json(data);
     });
  } catch (error) {
    throw new Error(error, 'name field cannot be empty');
  }
});


router.get('/pg', async (req, res) => {
  try {
    const testQuery = await pgConnection.query('SELECT * from acc_notes');
    res.json(testQuery);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
