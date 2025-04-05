const {userSchema} = require('../model/userModel.js');

const connectDB = async()=>{
  
    await userSchema.sync();
 
}

module.exports = connectDB;