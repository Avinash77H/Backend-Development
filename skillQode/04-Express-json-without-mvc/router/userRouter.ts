import {Request,Response,Router} from 'express'
import path from 'path';
const jsonfile = require('jsonfile')
const userRouter:Router = Router();
import {IUser} from "../models/IUser"

userRouter.get("/",(request:Request,response:Response)=>{
  const usersJsonPath = path.join(__dirname,"..","db","users.json")
  jsonfile.readFile(usersJsonPath,  (err:string, obj:IUser) =>{
    if (err) console.error(err)
    response.json(obj);
  })
});

export default userRouter;  