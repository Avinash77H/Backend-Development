const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js");
const ConnectionRequestModel = require('../models/connectionRequest.js');
const user = require('../models/user.js');

// sendConnectionRequest -> http://localhost:9999/request/send/:status/:toUserId
requestRouter.post("/request/send/:status/:toUserId",userAuth,async(request,response)=>{
  try{
    const fromUserId = request.user._id;
    const toUserId = request.params.toUserId;
    const status = request.params.status;

    const allowedStatus = ["interested","ignored"];
    if(!allowedStatus.includes(status)){
      return response.status(400).json({message:"Invalid Status type:" + status});
    }

    const toUser = await user.findById(toUserId);
    if(!toUser){
      return status(400).json({message:"user not found!"});
    }

     const existConnectionRequest = await ConnectionRequestModel.findOne({
      $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
      ]
     });

     if(existConnectionRequest){
      return response.status(400).json({message:"Connection Request Already Exists !!"})
     }

    const connectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status
    });

    const data = await connectionRequest.save();
    response.status(200).json({message:request.user.firstName +" " + status + " to " + toUser.firstName,data:data});
  }catch(error){
    response.status(500).json({error:"Internal Server Error:" + error});
  }
});

// reviewConnectionRequest -> http://localhost:9999/request/review/:status/:requestId
requestRouter.post("/request/review/:status/:requestId",userAuth,async(request,response)=>{
  try{
    const loginUser = request.user;
    const {status,requestId} = request.params;

    const allowedStatus = ["accepted","rejected"];
    if(!allowedStatus.includes(status)){
      return response.status(400).json({message:"Invalid status type " + status});
    };

    const connectionRequest = await ConnectionRequestModel.findOne({
      _id:requestId,
      toUserId: loginUser._id,
      status:"interested"
    });
    
    if(!connectionRequest){
      return response.status(404).json({message:"user not found"});
    }

    connectionRequest.status = status;

    await connectionRequest.save()

    response.status(200).json({message:loginUser.firstName +" " + status + " request",data:connectionRequest});

  }catch(error){
    response.status(500).json({error:"ERROR: " + error.message});
  }
});

module.exports = requestRouter;