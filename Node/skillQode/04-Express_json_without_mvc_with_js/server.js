const express = require('express');
const userRouter = require('./router/userRouter.js')

const hostName = '127.0.0.1';
const port = 9999;
const app = express();

app.get('/',(request,response)=>{
  response.status(200);
  response.json({msg:"Welcome Express Server"});
});

app.use("/api",userRouter);

app.listen(port,()=>{
  console.log(`Server run on http://${hostName}:${port}`);
});