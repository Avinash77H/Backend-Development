const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  fromUserId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true
  },
  toUserId:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User",
     required:true
  },
  status:{
    type:String,
    enum:{
      values:["ignored","interested","accepted","rejected"],
      message:`{Value} invalid type of status`,
      required:true
    }
  }
},{timestamps:true});

connectionSchema.index({fromUserId:1,toUserId:1}); // compound index

connectionSchema.pre("save",function(next){
  const connectionRequest = this;
  if(!connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("cannot send connection Request to yourself!");
  }
  next();
});

const ConnectionModel = mongoose.model("connections",connectionSchema);

module.exports = ConnectionModel;