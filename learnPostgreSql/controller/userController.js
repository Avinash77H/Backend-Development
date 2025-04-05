const { UserModel } = require("../model/userModel");

const CreateUser = async (request, response) => {
  try {
    const { name, email } = request.body;
    const user = await UserModel.create({ name, email });
    if (!user) {
      return response.status(400).json("Invalid Request");
    }
    return response
      .status(200)
      .json({ message: "User created successfuuly", data: user });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Internal Server Error:" + error.message });
  }
};

const ReadUser = async (request, response) => {
  try {
    const user = await UserModel.findAll();
    if (user.length === 0) {
      return response.status(404).json("User Not Found");
    }
    return response.status(200).json({ data: user });
  } catch (error) {
    return response.status(500).json({ message: "Internal Server Error" });
  }
};

const FindUserById = async (request, response) => {
  try {
    const { userId } = request.params;
    const user = await UserModel.findByPk(userId);
    if (!user) {
      return response.status(404).json({ message: "User not Found" });
    }
    return response.status(200).json({ data: user });
  } catch (error) {
    return response.status(500).json({ message: "Internal Server Error" });
  }
};

const UpdateUser = async (request, response) => {
  try {
    const { userId } = request.params;
    const { name, email } = request.body;
    const user = await UserModel.update({ name, email }, { where: { userId } });
    if (!user) {
      return response.status(400).json({ message: "Invalid Update Request" });
    }
    return response.status(200).json({ message: "User Updated successfully" });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Internal Server Error" + error.message });
  }
};

const DeleteUser = async (request, response) => {
  try {
    const { userId } = request.params;
    const user = await UserModel.destroy({ where: { userId } });
    if (!user) {
      return response.status(400).json({ message: "Invalid Delete Request" });
    }
    return response.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Internal Server Error:" + error.message });
  }
};

module.exports = { CreateUser, ReadUser, FindUserById, UpdateUser, DeleteUser };
