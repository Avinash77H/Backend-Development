const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt= require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 30,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid email address:" + value);
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Enter a Strong Password:" + value)
      }
    }
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new Error("Gender is not valid");
      }
    }
  },
  photoUrl: {
    type: String,
    default:
      "https://p.kindpng.com/picc/s/252-2524695_dummy-profile-image-jpg-hd-png-download.png",
    validate(value){
     if(!validator.isURL(value)){
      throw new Error("Invalid photo url:" + value)
     }
    }
  },
  about: {
    type: String,
    default: "This is Default About of the user!",
  },
  skills: {
    type: [String],
  },
},{timestamps:true});

userSchema.index({firstName:1,lastName:1}); // compound index

userSchema.methods.getJWT = async function(){
  const user = this;
  const token = await jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn:'7d'});
  return token;
}

userSchema.methods.validatePassword = async function(passwordEnterdByUser){

  // const user = this;
  const hashPassword = this.password;
  const isValidPassword = await bcrypt.compare(passwordEnterdByUser,hashPassword)
  return isValidPassword;
}


// const User = mongoose.model("User",userSchema);

module.exports = mongoose.model("User", userSchema);
