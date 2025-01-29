import {Request,Response,Router} from 'express'
import path from 'path';
const jsonfile = require('jsonfile');
import { IUser } from '../model/IUser';

export const userRouter:Router = Router();

userRouter.get('/',(request:Request,response:Response)=>{
  const userJsonPath = path.join(__dirname,"..","db","users.json");
  jsonfile.readFile(userJsonPath,(err:string,data:IUser)=>{
    if(err) console.log(err);
    response.json(data);
  })
});