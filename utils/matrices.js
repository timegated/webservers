const matrix = [
  [1,2,3],
  [3,4,5],
  [7,8,9]
];

const matrix2 = [
  [7,5,4],
  [7,8,9],
  [2,3,4]
];

const resultArr = [];
const resultArr2 = [];
console.time();
const flatMap = matrix.flatMap(item => item);
const flatMap2 = matrix2.flatMap(item => item);
console.log('flatmap: ', flatMap);
console.timeEnd();
console.log('flatMap timeEnd ^');

console.time();
for (let item of matrix) {
  for (let sub of item) {
    resultArr.push(sub);
  }
};

for (let otherItem of matrix2) {
  for (let subVal of otherItem) {
    resultArr2.push(subVal);
  }
}
console.timeEnd();
console.log('for of timeEnd ^');

// const combined = [...resultArr, ...resultArr2];
const combinedFlatMap = [...flatMap, ...flatMap2];
console.log('COMBINED ARRAYS FROM MATRIX: ', combinedFlatMap);

const omegaResult = combinedFlatMap.reduce((acc, curr) => {
  console.log('accumulator: ', acc);
  console.log('current: ', curr);
  return acc * curr;
}, 1);

console.log(omegaResult);