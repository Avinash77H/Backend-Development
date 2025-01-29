import {Request,Response,Router} from 'express'

import * as userController from "../controller/userController";

const userRouter:Router = Router();

/**
 * usage: 
 * url : http://127.0.0.1:9999/api/users
 * method : GET
 */

userRouter.get("/",async(request:Request,response:Response)=>{
  console.log("inside Router");
  await userController.getAllUsers(request,response);
});



export default userRouter;  