const mongoose = require('mongoose');

const connectDb = async()=>{
  try{
   await mongoose.connect("mongodb+srv://admin:admin%401234@cluster0.5hrsm.mongodb.net/cuteDB");
  }catch(error){
    console.log("ERROR: "+ error);
  }
}

module.exports = connectDb;