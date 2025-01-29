import path from "path"
import { IBook } from "../model/IBook";
const jsonfile = require('jsonfile')

export class UserUtil{
  private static userJsonData = path.join(__dirname,"..","db","book.json");
  public static getAllUserFromDb():Promise<IBook[]>{
    return new Promise((response,reject)=>{
     jsonfile.readFile(this.userJsonData,(err:any,data:IBook[])=>{
      if(err){
        reject(err)
      }
      else{
        response(data);
      }
     })
    })
  }
}