'use strict'

// Idempotency - multiple identical operations always lead to the same result.

// Storing state in process violates the Statelessness
// for instruction purposes
module.exports = {
  bicycle: bicycleModel()
}


// we could also write this as a class
// in which case db would live in the constructor and the rest of the
// operations would be methods that operate on the values defined
// within the constructor.
function bicycleModel() {
  const db = {
    1: { brand: 'Veloretti', color: 'green' },
    2: { brand: 'Batavus', color: 'yellow' },
    3: { brand: 'Cannondale', color: 'blue', year: '1984' }
  };

  return {
    read,
    create,
    update,
    del,
    uid
  }

  function uid() {
    return Object.keys(db)
      .sort((a, b) => a - b)
      .map(Number)
      .filter((n) => !isNaN(n))
      .pop() + 1 + '';
  }

  // CRUD
  // CREATE
  function create(id, data, cb) {
    if (db.hasOwnProperty(id)) {
      const err = Error('resource exists');
      setImmediate(() => { cb(err) });
      return
    }
    db[id] = data;
    setImmediate(() => cb(null, id));
  }

  // READ
  function read(id, cb) {
    if (!(db.hasOwnProperty(id))) {
      // sub par
      const err = Error('not found');
      // simulates async operations
      setImmediate(() => cb(err));
      return;
    }
    setImmediate(() => cb(null, db[id]));
  }

  // UPDATE
  function update(id, data, cb) {
    if (!db.hasOwnProperty(id)) {
      const err = Error('not found');
      setImmediate(() => cb(err));
      return;
    }
    db[id] = data;
    setImmediate(() => cb())
  }

  // DELETE
  function del(id, cb) {
    if (!db.hasOwnProperty(id)) {
      const err = Error('not found');
      setImmediate(() => cb(err));
      return;
    }
    delete db[id];
    setImmediate(() => cb());
  }
}
