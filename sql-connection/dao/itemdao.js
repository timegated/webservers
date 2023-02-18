const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'winhost',
  user: 'root2',
  password: process.env.password1,
  database: 'wow_test_db',
  port: 3306,
});

class ItemsDAO {
  constructor() {
    this.connection = connection;
  }

  queryCallback(err, results, fields) {
    if (err) throw err;
    const result = results[0];
    console.log('FROM DAO: ', JSON.stringify(result));
    return JSON.stringify(result);
  }

  async getItemsByName(name) {
    this.connection.query = util.promisify(this.connection.query);
    console.log(name);
    const queryText = `
      SELECT item_id, name, quality, display_id FROM items WHERE name="${name}";
    `;
    const result = this.connection.query(queryText, (err, results, fields) => {
      this.queryCallback(err, results, fields);
    });
    return result;
  }
}

module.exports = ItemsDAO;