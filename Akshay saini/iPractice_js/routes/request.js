const express = require("express");
const userAuth = require("../middleware/userAuth.js");
const ConnectionModel = require("../model/connection.js");
const User = require("../model/user.js");

const requestRouter = express.Router();

// sendConnectionRequest -> http://localhost:9999/request/send/:status/:toUserId
requestRouter.patch(
  "/request/send/:status/:toUserId",
  userAuth,
  async (request, response) => {
    try {
      const fromUserId = request.user._id;
      const toUserId = request.params.toUserId;
      const status = request.params.status;

      const isExistUser = await User.findById(toUserId);

      if (!isExistUser) {
        return response.status(400).json({ message: "user not found" });
      }

      const allowedStatus = ["interested", "ignored"];

      const isValidStatus = allowedStatus.includes(status);

      if (!isValidStatus) {
        return response
          .status(400)
          .json({ message: "Invalid status type " + status });
      }

      const isExistConnection = await ConnectionModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (isExistConnection) {
        return response
          .status(400)
          .json({ message: "Connection request already exists !" });
      }

      const connectionRequest = new ConnectionModel({
        fromUserId,
        toUserId,
        status,
      });

      await connectionRequest.save();
      response.status(200).json({
        message: request.user.firstname + " send " + status + " request",
      });
    } catch (error) {
      response.status(500).json({ error: "ERROR:" + error.message });
    }
  }
);

// sendReviewRequest -> http://localhost:9999/request/review/:status/:requestId
requestRouter.patch(
  "/request/review/:status/:requestId",
  userAuth,
  async (request, response) => {
    try {
      const loggedUser = request.user;
      const { status, requestId } = request.params;

      const allowedStatus = ["accepted", "rejected"];

      const isValidStatus = allowedStatus.includes(status);

      if (!isValidStatus) {
        return response
          .status(400)
          .json({ message: "Invalid status type " + status });
      }

      const connectionRequest = await ConnectionModel.findOne({
        $and: [{ toUserId: loggedUser._id }, { status: "interested" }],
      });

      if (!connectionRequest) {
        return response
          .status(404)
          .json({ message: "connection request not found" });
      }

      connectionRequest.status = status;
      await connectionRequest.save();
      response.status(200).json({
        message: loggedUser.firstname +" " + status + " request",
      });
    } catch (error) {
      response.status(500).json({ error: "ERROR:" + error.message });
    }
  }
);



module.exports = requestRouter;
