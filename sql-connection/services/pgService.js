const pgDAO = require('../dao/pgres');

const dao = new pgDAO();
class PgService {
  constructor() {
    this.dao = dao;
  }

  testConnection = async () => {
    return this.dao.testConnection();
  };

}

module.exports = PgService;