const {Sequelize,DataTypes} = require('sequelize');
const {userSchema, UserModel} = require('../model/userModel.js');

const userDetailsModel = userSchema.define('userDetail',{
  userDetailsId:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  phone:{
    type:DataTypes.STRING,
    validate: {
      is: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im // simple phone regex
    }
  },
  city:{
    type:DataTypes.STRING,
  },
  gender:{
    type:DataTypes.ENUM('male','female','other')
  }
},{timestamps:true});

UserModel.hasOne(userDetailsModel,{foreignKey:"userId",as:"details"});
userDetailsModel.belongsTo(UserModel,{foreignKey:"userId",as:"user"});

module.exports = userDetailsModel;