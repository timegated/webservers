// We want to check if an incoming object has the necessary/required properties to update fields on the merge target.

// ex. we have a form where users send a new status/active on a object that already exists in a database

const target = {
  status: 'active',
  active: true,
  name: 'Long',
  lifetime: 'short',
};

const updateFields = {
  status: 'whatever',
  active: false,
};

// Seems gross but it works.
const updateObject = (target, updateFields) => {
  let newTarget = {};

  const fieldsExist = Object.keys(updateFields).map(entry => {
    console.log(entry);

    if (target.hasOwnProperty(entry)) return true;

    return false;
  }).every(val => !!val);

  console.log(fieldsExist)

  if (fieldsExist) {
    newTarget = { ...target, ...updateFields };
  }

  // run some other code here that updates the object wherever it's persisted
  return newTarget;
};

console.log(updateObject(target, { hotdog: 'yes', active: false, status: 'YEE' }));