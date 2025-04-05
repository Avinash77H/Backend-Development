const express = require('express');
const connectDB = require('./config/database');
const {createUser,getUserDetails} = require("./controller/userController.js");

const app = express();
const port = 9999;
app.use(express.json());



connectDB().then(()=>{
  app.listen(port,()=>{
    console.log(`Server run on http://localhost:${port}`)
  })
}).catch((error)=>{
  console.log("ERROR: ",error);
});

// createUser();
getUserDetails();