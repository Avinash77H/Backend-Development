import express,{Application,Response,Request,Router} from 'express'
import request from 'http';

const userRouter:Router = Router();

// http://127.0.0.1:9999/api/users/home
userRouter.get("/home",(request:Request,response:Response)=>{
    response.json({
        msg:"Hello , welcome Home"
    })
})

// http://127.0.0.1:9999/api/users/insertUser
userRouter.post("/insertUser",(request:Request,response:Response)=>{
    response.json({
        msg:"Hello , Welcome insertUser"
    })
})

export default userRouter;