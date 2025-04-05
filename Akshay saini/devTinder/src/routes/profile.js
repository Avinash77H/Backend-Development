const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js");
const {validEditProfileData} = require("../utils/validation.js")
const bcrypt = require('bcrypt');

// profile -> http://localhost:9999/profile
profileRouter.get("/profile", userAuth, async (request, response) => {
  
  try {
    const user = request.user;
    response.json({ data: user });
  } catch (error) {
    response.status(400).send("ERROR:" + error.message);
  }
});


// editProfile -> http://localhost:9999/profile/edit
profileRouter.patch("/profile/edit",userAuth,async(request,response)=>{
  try{
    
    if(!validEditProfileData(request)){
      throw new Error("Invalid Edit profile request");
    }

    const loggedInUser = request.user;

    Object.keys(request.body).forEach((key)=>loggedInUser[key] = request.body[key]);

    await loggedInUser.save();

    response.status(200).json({message:`${loggedInUser.firstName} your profile updated Successfully`,data:loggedInUser});

  }catch(error){
    response.status(500).json({error:"Internal Server Error:" + error.message});
  }
});


// forgotPassword -> http://localhost:9999/profile/forgotpassword
profileRouter.patch("/profile/forgotpassword",userAuth,async(request,response)=>{
  try{
    const loginUser = request.user;
    const {password} = request.body;

    const passwordHash = await bcrypt.hash(password,10);

    loginUser.password = passwordHash;

    await loginUser.save();

    response.status(200).json({message:"updated password successfully"})
    
  }catch(error){
    response.status(500).json({error:"Internal Server Error:" + error.message})
  }
});


module.exports = profileRouter;