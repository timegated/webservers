var express = require('express');
var router = express.Router();
var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
  host: 'winhost',
  user: 'root2',
  password: process.env.password1,
  database: 'wow_test_db',
  port: 3306,
});

/**
 * GET: Fetch items by name.
 */
router.get('/', function(req, res, next) {
  if (req.query.name) {
  
    connection.query(`SELECT item_id, name, class, subclass FROM items WHERE name = "${req.query.name}"`, (error, results, fields) => {
      if (error) throw error;
      res.json(results[0]);
    });
    
  } else {
    throw new Error('name field cannot be empty');
  }
});

module.exports = router;
