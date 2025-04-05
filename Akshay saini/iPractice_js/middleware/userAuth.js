const jwt = require('jsonwebtoken');
const User = require('../model/user.js');

const userAuth = async(request,response,next)=>{
  try{
    const {token} = request.cookies;
    
    if(!token){
      throw new Error("Invalid Token!");
    }
    const decodedMessage = jwt.verify(token,'Avinash');

    const {_id} = decodedMessage;
   
    
    const user = await User.findById(_id);
    
    if(!user){
      throw new Error("user not found!");
    }
    request.user = user;
    next();
  }catch(error){
    response.status(500).json({error:"ERROR:" + error.message})
  }
} 

module.exports = userAuth;