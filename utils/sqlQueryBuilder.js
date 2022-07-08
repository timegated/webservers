function queryBuilder(params) {
  if (typeof params !== 'object') throw new Error('params must be an object');

  const baseQuery = ['SELECT', '*', 'FROM', 'TABLE_1', 'ut.id as id', 'ut.name as name', 'ut.price as price'];

  params = {
    id: params.id,
    name: params.name,
    price: params.price,
  };

  if (params.id) {
    baseQuery.push('WHERE id in some_other_table');
  }
  if (params.name) {
    baseQuery.push('WHERE name in some_other_table');
  }
  if (params.price) {
    baseQuery.push('WHERE price in some_other_table');
  }

  return baseQuery.join(' ');
};

// Usage
const testParams = {
  id: 1,
  name: 'borgir',
  price: 3.99,
};

console.log(queryBuilder(testParams));