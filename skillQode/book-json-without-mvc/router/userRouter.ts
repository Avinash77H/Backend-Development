import {Request,Response,Router} from 'express'
import path from 'path';
const jsonfile = require('jsonfile')
import { IBook } from '../model/IBook';

const userRouter:Router = Router();

userRouter.get("/",(request:Request,response:Response)=>{
  const userJsonPath = path.join(__dirname,"..","db","book.json");
  jsonfile.readFile(userJsonPath,(err:any,data:IBook)=>{
   if(err){
    console.error(err)
   }
   response.json(data);
  })
})

export default userRouter;