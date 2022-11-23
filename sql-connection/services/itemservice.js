const ItemsDAO = require('../dao/itemdao');

class ItemService {
  constructor () {
    this.dao = new ItemsDAO();
  }

  getItemByName = async (params) => {
    return this.dao.getItemsByName(params).then((data) => data);
  }
}

module.exports = ItemService;