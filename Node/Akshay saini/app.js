require("./xyz") // common js module
const data = require("./data.json");
// const {name,calculateSum} = require("./calculate/sum") // common js module
// const {multi} = require("./calculate/multi");

  /* insence of above two line we create index file module and get calculatesum,multi like under*/

  const{calculateSum,multi} = require("./calculate"); // here not require like require("./calculate/index")
  console.log("dir:",__dirname);

// import {name,calculateSum} from './sum.js' // ES module

console.log("i am app module")
 z = 'hello world'; // common js module follow non strict mode that's why no require let ,var or const
let x = 10;
let y = 20;

// here try to access variable and method which define in sum.js but we can't access here because module protect their variable and method for leaking that's why we need explicitly export and import use for accessed variable and methods

console.log(data);
calculateSum(x,y);
multi(x,y);