const express = require("express");
const profileRouter = express.Router();
const bcrypt = require('bcrypt');
const userAuth = require("../middleware/userAuth.js");
const { validateEditProfile } = require("../util/validation.js");

// get profile -> http://localhost:9999/profile/getprofile
profileRouter.get(
  "/profile/getprofile",
  userAuth,
  async (request, response) => {
    try {
      const user = request.user;
      if (!user) {
        throw new Error("Invalid User!");
      }
      response
        .status(200)
        .json({ message: "profile data fetched", data: user });
    } catch (error) {
      response.status(500).json({ error: "ERROR:" + error.message });
    }
  }
);

// edit profile -> http://localhost:9999/profile/editprofile
profileRouter.post(
  "/profile/editprofile",
  userAuth,
  async (request, response) => {
    try {
      const user = request.user;
      const editData = request.body;

      if(!validateEditProfile){
        throw new Error("Invalid Edit Request");
      }

      Object.keys(editData).forEach((key) => (user[key] = editData[key]));
      console.log("updatedData:", user);

      const data = await user.save();

      response
        .status(200)
        .json({ message: "profile updated Successfully", data: data });
    } catch (error) {
      response.status(500).json({ error: "ERROR:" + error.message });
    }
  }
);

// edit forgot password -> http://localhost:9999/profile/forgotpassword
profileRouter.post(
  "/profile/forgotpassword",
  userAuth,
  async (request, response) => {
    try {
      const user = request.user;
      const {password} = request.body;

    const newPassword = await bcrypt.hash(password,10);
    
    user.password = newPassword;
      

      const data = await user.save();

      response
        .status(200)
        .json({ message: "password updated Successfully"});
    } catch (error) {
      response.status(500).json({ error: "ERROR:" + error.message });
    }
  }
);

module.exports = profileRouter;
