const ItemsDAO = require('../dao/itemdao');

class ItemService {
  constructor () {
    this.dao = new ItemsDAO();
  }

  getItemByName = async (params) => {
    return await this.dao.getItemsByName(params);
  }
}

module.exports = ItemService;