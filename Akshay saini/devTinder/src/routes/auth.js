const express = require('express');
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation.js");
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

// signup user  -> http://localhost:9999/signup
authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignUpData(req);

    // Encrypt the password
    const { firstName, lastName, emailId, password,age,gender,photoUrl,about,skills } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    // creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,gender,
      photoUrl,
      about,
      skills
    });
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(500).send("ERROR:" + err.message);
  }
});

// login user -> http://localhost:9999/login
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    // check password is valid
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // create a JWT Token
      const token = await user.getJWT();

      //add token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      res.json({message:"Login Successfully!",data:user});
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(500).send("ERROR:" + err.message);
  }
});

// logout user -> http://localhost:9999/logout
authRouter.post("/logout",async(req,res) => {
  try{
    res.cookie('token',null,{expires:new Date(Date.now())});
    res.status(200).json({msg:"Logout Successfully!"});
  }catch(error){
    res.status(500).json({error:"Internal Server Error:" + error})
  }
});


module.exports = authRouter;