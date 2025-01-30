import  {Router} from 'express'
import * as userController from '../controller/userController.js'

const userRouter = Router();



userRouter.get("/user",async(request,response)=>{
   
    await userController.getAllUser(request,response);
   
})

export default userRouter;