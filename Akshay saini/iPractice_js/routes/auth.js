const express = require("express");
const User = require("../model/user.js");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const {validateSignUp} = require("../util/validation.js");
const jwt = require("jsonwebtoken");

// sign up -> http://localhost:9999/auth/signup
authRouter.post("/auth/signup", async (request, response) => {
  try {
    const { firstname, lastname, email, password } = request.body;

    validateSignUp(request);

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstname,
      lastname,
      email,
      password: hashPassword,
    });

    await user.save();

    response.status(200).json({ message: "Register Successfully" });
  } catch (error) {
    response.status(500).json({ error: "Server Error: " + error.message });
  }
});

// login -> http://localhost:9999/auth/login
authRouter.post("/auth/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid user");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ _id: user._id }, "Avinash", { expiresIn: "7d" });
    response.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    response.status(200).json({ message: "Login Successfully" });
  } catch (error) {
    response.status(500).json({ error: "Server Error: " + error.message });
  }
});

// logout -> http://localhost:9999/auth/logout
authRouter.post("/auth/logout", async (request, response) => {
  try {
    response.cookie("token", null, { expires: new Date(Date.now()) });
    response.status(200).json({ message: "logout Successfully " });
  } catch (error) {
    response.status(500).json({ message: "ERROR:" + error.message });
  }
});

module.exports = authRouter;
