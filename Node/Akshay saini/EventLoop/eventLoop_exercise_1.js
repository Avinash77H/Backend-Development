const fs = require('fs');
const a = 100;

setImmediate(()=>console.log("SetImmediate"));

fs.readFile("./text.txt","utf8",()=>{
  console.log("file Reading ");
});

setTimeout(()=>console.log("timer Expired"),0);

function printA(){
  console.log("a = ",a);
};

printA();

console.log("last line of the File");