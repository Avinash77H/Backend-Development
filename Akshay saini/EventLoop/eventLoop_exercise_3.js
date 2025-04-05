const fs = require('fs')
setImmediate(()=>console.log("SetImmediate"));

setTimeout(()=>console.log("time Expired"),0);

Promise.resolve("promise resolved").then(console.log);

fs.readFile("./text.txt","utf8",()=>{
  setTimeout(()=>console.log("time Expired 2nd time"),0);

  process.nextTick(()=>console.log("Process nextTick 2nd time"));

  setImmediate(()=>console.log("SetImmediate 2nd time"));

  console.log("file reading");
});

process.nextTick(()=>console.log("Process nextTick"));

console.log("last line of the file");

