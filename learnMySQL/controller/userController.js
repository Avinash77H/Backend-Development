const {UserModel} = require('../model/userModel.js');

const createUser = async()=>{
  try{
    const newUser = await UserModel.create({
      name:"priti hirapara",
      email:"priti@gmail.com"
    })
    console.log("newUser:",newUser.toJSON());
  }catch(error){
    console.error("Error creating user: ",error);
  }
}

const getUserDetails = async()=>{
  const detail = await UserModel.findAll();
  console.log("detail",detail);
}

module.exports = {createUser,getUserDetails};