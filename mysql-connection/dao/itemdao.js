const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'winhost',
  user: 'root2',
  password: process.env.password1,
  database: 'wow_test_db',
  port: 3306,
});

export class ItemsDAO {
  constructor() {
    this.connection = connection;
  }

  getItemsByName (params) {
    const queryText = `
      SELECT item_id, name, class, subclass FROM items WHERE name="${params.name}";
    `;
    const result = this.connection(queryText, (err, results, fields) => {
      if (err) console.error('query failed: ', err);
      console.log(fields);
      return results[0];
    });

    // Any other parameters we need below with branching logic WHERE/AND/OR/IN

    return result;
  }
}