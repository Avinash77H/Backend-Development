const jwt = require('jsonwebtoken')
const userModel = require("../models/user.js");

const userAuth = async(request,response,next)=>{
  try{
   
    const {token} = request.cookies;
    if(!token){
      return response.status(401).json({message:"Please Login!"});
    }
    
    const isValidToken =  jwt.verify(token,process.env.JWT_SECRET);

    if(!isValidToken){
      throw new Error("invalid Token");
    }
    const {_id} = isValidToken;

    const user = await userModel.findById(_id);

    if(!user){
      throw new Error("Invalid User");
    }
    request.user = user;
    
    next();


  }catch(error){
    response.status(500).json({msg:"Internal Server Error:" + error});
  }
}

module.exports = {
  userAuth
}