import { Router } from "express";

const userRouter = Router();

userRouter.get("/",(request,response)=>{
  response.status(200);
  response.json({msg:"Hello, Users "});
});

userRouter.post("/insertUser",(request,response)=>{
  response.status(200);
  response.json({msg:"User inserted"});
});

export default userRouter;