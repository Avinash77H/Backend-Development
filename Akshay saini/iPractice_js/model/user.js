const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstname:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid Email!");
      }
    }
  },
  password:{
    type:String,
    required:true,
    validate(value){
      if(!validator.isStrongPassword(value,{
        minLength:8,
        minLowercase:1,
        minUppercase:1,
        minNumbers:1,
        minSymbols:1
      })){
        throw new Error("Password must be 8+ chars with 1 lowercase, 1 uppercase, 1 number, and 1 symbol");
      }
    }
  }
},{timestamps:true});



const UserModel = mongoose.model("User",userSchema);

module.exports = UserModel;
