const { Pool } = require('pg');


class PgSQL {
  constructor() {
    this.connection = new Pool({
      host: "localhost",
      database: "account_notes",
      password: "localhost",
    });
  }

  async testConnection() {
    try {
      const connection = await this.testConnection();

      return connection;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = PgSQL;