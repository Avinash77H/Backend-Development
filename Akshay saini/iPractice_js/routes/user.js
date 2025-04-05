const express = require('express');
const userAuth = require('../middleware/userAuth');
const userRouter = express.Router();
const ConnectionModel = require('../model/connection.js');
const User = require("../model/user.js");
const USER_SAFE_DATA = "firstname lastname"

// getPendingRequest -> http://localhost:9999/user/pending
userRouter.get("/user/pending",userAuth,async(request,response)=>{
  try{

    const loggedUser = request.user;

    const connectionRequest = await ConnectionModel.find({
      $and:[
        {toUserId:loggedUser._id},
        {status:"interested"}
      ]
    }).populate("fromUserId","firstname lastname -_id");

  

    response.status(200).json({message:connectionRequest});
  }catch(error){
    response.status(500).json({error:"ERROR:" + error.message});
  }
});

// getPendingRequest -> http://localhost:9999/user/connection
userRouter.get("/user/connection",userAuth,async(request,response)=>{
  try{

    const loggedUser = request.user;

    const connectionRequest = await ConnectionModel.find({
      $and:[
        {$or:[{toUserId:loggedUser._id},{fromUserId:loggedUser._id}]},
        {status:"accepted"}
      ]
    }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);

    const data = connectionRequest.map((row)=>{
      if(row.fromUserId._id.toString() === loggedUser._id.toString()){
        return row.toUserId
      }else{
        return row.fromUserId
      }
  });

    response.status(200).json({message:data});
  }catch(error){
    response.status(500).json({error:"ERROR:" + error.message});
  }
});

// feed request -> http://localhost:9999/user/feed?page&limit
userRouter.get("/user/feed",userAuth,async(request,response)=>{
  try{
    const loggedUser = request.user;
    const page = parseInt(request.query.page ) || 1;
    let limit = parseInt(request.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    let skip = (page-1) * limit

    const getAllConnection = await ConnectionModel.find({
      $or:[
        {fromUserId:loggedUser._id},
        {toUserId:loggedUser._id}
      ]
    });
    // console.log("getAllConnection",getAllConnection);

    const hideUserFromFeed = new Set();

     getAllConnection.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });
    console.log("skip-> and limit -> ",skip,limit);
    const feedData = await User.find({
      $and:[
        {_id:{$nin:Array.from(hideUserFromFeed)}},
        {_id:{$ne:loggedUser._id}}
    ]
    }).select(USER_SAFE_DATA).skip(skip).limit(limit)
    console.log("feedData",feedData);
    response.status(200).json({data:feedData});

  }catch(error){
    response.status(500).json({error:"ERROR: "+ error.message});
  }
})

module.exports = userRouter;