const {Sequelize , DataTypes} = require('sequelize')

const userSchema = new Sequelize({
      username:"postgres",
      host:"localhost",
      database:"CRUD",
      password:"1512001@@",
      port:5432,
      dialect:"postgres",
      logging:false
})

const UserModel = userSchema.define('User',{
  userId:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
    validate:{
      isEmail:true
    }
  }
},{timestamps:true});

module.exports = {UserModel , userSchema};
