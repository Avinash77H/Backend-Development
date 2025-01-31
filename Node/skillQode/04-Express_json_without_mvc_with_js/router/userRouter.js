const {Router} = require("express");
const jsonfile = require('jsonfile');

const userRouter = Router();
userRouter.get('/user',(request,response)=>{
  const userJsonPath = "D:/programing/Backend-Development/Node/skillQode/04-Express_json_without_mvc_with_js/db/users.json"
  jsonfile.readFile(userJsonPath,(err,data)=>{
    if(err) response.json("Server Error");
    response.json(data);
  })
}) 

module.exports = userRouter;

