const {userSchema} = require('../model/userModel');

const connectDB = async() => {
    await userSchema.sync();
}

module.exports = connectDB;