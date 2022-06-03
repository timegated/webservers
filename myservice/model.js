'use strict'

// Storing state in process violates the Statelessness
// for instruction purposes
module.exports = {
  bicycle: bicycleModel()
}

function bicycleModel () {
  const db = {
    1: { brand: 'Veloretti', color: 'green' },
    2: { brand: 'Batavus', color: 'yellow' },
  };

  return {
    read
  }

function read (id, cb) {
    if(!(db.hasOwnProperty(id))) {
      // sub par
      const err = Error('not found');
      // simulates async operations
      setImmediate(() => cb(err));
      return;
    }
    setImmediate(() => cb(null, db[id]));
  }
}
