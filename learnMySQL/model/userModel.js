const { Sequelize, DataTypes } = require("sequelize");

const userSchema = new Sequelize({
  database:"user",
  username:"root",
  password:"1512001@@",
  host:"localhost",
  dialect:"mysql",
  logging:false
});

const UserModel = userSchema.define("USER",{
  userId:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
  },

},{timestamps:true});

module.exports = {
  userSchema,UserModel
}