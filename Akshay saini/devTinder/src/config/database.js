const mongoose = require('mongoose')

const connectDB = async()=>{
  const url = process.env.DB_CONNECTION_KEY;
  await mongoose.connect(url);
};

module.exports = connectDB;

