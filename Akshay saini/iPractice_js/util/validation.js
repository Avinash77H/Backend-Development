const validator = require('validator');

const validateSignUp = (request)=>{
  const {firstname,lastname,email,password} = request.body;

  if(!firstname || !lastname){
    throw new Error("Name is Required!");
  }else if(!validator.isEmail(email)){
    throw new Error(" Invalid Email !");
  }else if(!validator.isStrongPassword(password)){
    throw new Error("Please enter a Strong password!");
  }
};

const validateEditProfile = (request)=>{

    const editData = request.body;
      
    const allowedEdit = ["firstname", "lastname"];

    const isValidEditRequest = Object.keys(editData).every((key) => (
     allowedEdit.includes(key)
    ));
    
    if (!isValidEditRequest) {
      return response.status(400).json({ message: "Invalid Update Request" });
    }
    return isValidEditRequest;
 
}
module.exports = {validateSignUp,validateEditProfile};
