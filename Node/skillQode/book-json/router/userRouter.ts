import {Request,Response,Router} from 'express'
import * as userController from '../controller/userController'
const userRouter:Router = Router();

userRouter.get("/",async(request:Request,response:Response)=>{
 await userController.getAllUser(request,response);
})

export default userRouter;