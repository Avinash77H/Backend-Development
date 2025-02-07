const express = require('express');

const app = express();

app.get('/home/:id',(request,response)=>{
  console.log(request.params);
  response.send("Home page");
});

app.get('/test',(request,response)=>response.send("Test page"));

app.get('/',(request,response)=>{
  response.send("welcome to express Server");
});

app.listen(3000,()=>console.log(`server run on 3000 port`));