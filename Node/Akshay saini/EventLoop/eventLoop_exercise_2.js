const fs = require('fs')

const a = 100;

setImmediate(()=>console.log("SetImmediate"));

Promise.resolve("promise resolved").then(console.log);

fs.readFile("./text.txt","utf8",()=>{
  console.log("file reading");
});

setTimeout(()=>console.log("time Expired"),0);

process.nextTick(()=>console.log("Process nextTick"));

function printA(){
  console.log("a = ",a);
};

printA();

console.log("last line of the file");

