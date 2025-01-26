// modules protectes their variables and functions from leaking

console.log("sum module executed");

 let name = 'Avinash rakholiya'

 function calculateSum(a,b){
  console.log("sum is:", a + b);
}




module.exports = {name,calculateSum};  // common js module
// above line write another way
/**
 *  module.exports.name = name;
 *  module.exports.calculateSum = calculateSum;
 */