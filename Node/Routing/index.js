const express = require('express');
const app = express();
const port = 3000;

const item = require("./routes/item")

app.use("/api",item)

// app.get('/',(req,res)=>{
//   res.send("hello world");
// });

  



app.listen(port,()=>{
  console.log(`example app listening on port ${port}`);
});