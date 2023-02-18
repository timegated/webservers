const ItemsDAO = require('../dao/itemdao');

class ItemService {
  constructor () {
    this.dao = new ItemsDAO();
  }

  getItemByName = async (name) => {
    const data = await this.dao.getItemsByName(name);
    return data;
  }
}

module.exports = ItemService;