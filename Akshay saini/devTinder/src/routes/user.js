const express = require('express');
const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js");
const User = require('../models/user.js')
const ConnectionRequestModel = require('../models/connectionRequest.js');
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"

// getAllPendingRequest: http://localhost:9999/user/requests/pending
// get all the pending connection request for the logged in user
userRouter.get("/user/requests/pending",userAuth,async(request,response)=>{
 try{
  const loginUser = request.user;

  const connectionRequest = await ConnectionRequestModel.find({
    toUserId:loginUser._id,
    status:"interested"
  }).populate("fromUserId",USER_SAFE_DATA)

  response.status(200).json({message:"fetch data successfully",data:connectionRequest});

 }catch(error){
  response.status(500).json({message:"ERROR:" + error.message});
 }
});

// getAllConnection : http://localhost:9999/user/connections
// get all the connection request for the logged in user
userRouter.get("/user/connections",userAuth,async(request,response)=>{
  try{
    const loggedUser = request.user;
    const connectionRequest = await ConnectionRequestModel.find({
      $or:[
        {toUserId:loggedUser._id,status:"accepted"},
        {fromUserId:loggedUser._id,status:"accepted"}
      ]
    }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);

    const data = connectionRequest.map((row)=>{
      if(row.fromUserId._id.toString() === loggedUser._id.toString()){
        return row.toUserId
      }else{
        return row.fromUserId
      }
    });

    response.status(200).json({message:"data fetched Successfully",data:data});

  }catch(error){
    response.status(500).json({error:"ERROR: "+ error.message});
  }
});

//feed api : http://localhost:9999/user/feed?page=1&limit=10
// get all user which not exists connect with logged user
userRouter.get("/user/feed",userAuth,async(request,response)=>{
  try{
    let loggedUser = request.user;
    let page = parseInt(request.query.page) || 1;
    let limit = parseInt(request.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    let skip = (page - 1) * limit;

    const getAllConnection = await ConnectionRequestModel.find({
      $or:[
        {fromUserId:loggedUser._id},
        {toUserId:loggedUser._id}
      ]
    }); 

    const hideUserFromFeed = new Set();
    getAllConnection.forEach((req)=>{
      hideUserFromFeed.add(req.fromUserId.toString()),
      hideUserFromFeed.add(req.toUserId.toString())
    });
    
    const feedData = await User.find({
      $and:[
        {_id:{$nin:Array.from(hideUserFromFeed)}},
        {_id:{$ne:loggedUser._id}}
      ]
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);
    

    response.status(200).json({message:"fetch data successfull",data:feedData});
  }catch(error){
    response.status(500).json({error:"ERROR: "+ error.message});
  }
});


module.exports = userRouter;