const fs = require('fs')

setImmediate(()=>console.log("SetImmediate"));

setTimeout(()=>console.log("time Expired"),0);

Promise.resolve("promise resolved").then(console.log);

fs.readFile("./text.txt","utf8",()=>{
  console.log("file reading");
});

process.nextTick(()=>{
  process.nextTick(()=>console.log("inner nextTick"));
  console.log("Process nextTick");
});

console.log("last line of the file");

