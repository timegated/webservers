const mysql = require('mysql');

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

  async getItemsByName(params) {
    console.log(params);
    try {
      const queryText = `
      SELECT item_id, name, quality, display_id FROM items WHERE name="${params}";
    `;

      return this.connection.query(queryText, async (err, results, fields) => {
        if (err) console.error('query failed: ', err);
        return await results[0];
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = ItemsDAO;