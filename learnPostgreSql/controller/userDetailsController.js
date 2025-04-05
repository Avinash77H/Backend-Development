const userDetailsModel  = require('../model/userDetails.js');
const {UserModel} = require('../model/userModel.js');

const createUserDetails = async (request, response) => {
  try {
      const { userId, phone, city, gender } = request.body;

      const user = await userDetailsModel.create({ userId, phone, city, gender });

      if (!user) {
          return response.status(400).json("Invalid Request");
      }
      return response.status(200).json({ message: "User created successfuuly", data: user });
  }
  catch (error) {
      return response.status(500).json({ message: "Internal Server Error:" + error.message });
  }
}

const getUserDetails = async (request, response) => {
  try {
      const user = await UserModel.findAll({
          include: [
              {
                  model: userDetailsModel,
                  as:"details",
                  attributes: ["phone", "city", "gender"]
              }
          ]
      });
      return response.status(200).json({ data: user });
  } catch (error) {
      return response.status(500).json({ message: "Internal Server Error:" + error.message});
  }
}

module.exports = { createUserDetails, getUserDetails }